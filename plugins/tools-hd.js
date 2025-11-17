import fetch from "node-fetch";
import crypto from "crypto";
import { FormData, Blob } from "formdata-node";
import { fileTypeFromBuffer } from "file-type";

const APIs = {
  siputzx: { 
    url: "https://api.siputzx.my.id", 
    key: null 
  }
};

const handler = async (m, { conn }) => {
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || '';

  if (!mime || !/image\/(png|jpe?g)/.test(mime)) {
    return conn.reply(m.chat, `❌ Please reply with a valid image (png or jpg).`, m);
  }

  await m.react("⏳");

  try {
    let media = await q.download();

    if (!media) throw new Error("The image could not be downloaded..");

    let link = await catbox(media);

    if (!link || !link.startsWith("http")) {
      throw new Error("Error while uploading image to Catbox.");
    }

    let upscaleApi = `${APIs.siputzx.url}/api/iloveimg/upscale?image=${encodeURIComponent(link)}&scale=4`;
    let res = await fetch(upscaleApi);
    
    if (!res.ok) {
      throw new Error(`API error: ${res.status} ${res.statusText}`);
    }
    
    let data = await res.json();

    if (!data.status || !data.result) {
      throw new Error(data.message || "The upscale API did not return a valid result.");
    }

    await conn.reply(m.chat, `✨ *Processing your HD image...*`, m);

    await conn.sendMessage(m.chat, {
      image: { url: data.result },
      caption: `✅ *Image successfully enhanced* \n\n🔗 *HD Link:* ${data.result}`
    }, { quoted: m });

    await m.react("✅");

  } catch (e) {
    console.error(e);
    await m.react("❌");
    return conn.reply(m.chat, `❌ *Image processing error:*\n\`\`\`${e.message}\`\`\``, m);
  }
};

handler.help = ['hd', 'upscale'];
handler.tags = ['herramientas'];
handler.command = ['hd', 'upscale', 'mejorarimagen']; 
handler.register = true;
handler.limit = true;

export default handler;

async function catbox(content) {
  const { ext, mime } = (await fileTypeFromBuffer(content)) || {};
  const blob = new Blob([content.toArrayBuffer()], { type: mime });
  const formData = new FormData();
  const randomBytes = crypto.randomBytes(5).toString("hex");
  formData.append("reqtype", "fileupload");
  formData.append("fileToUpload", blob, randomBytes + "." + ext);

  const response = await fetch("https://catbox.moe/user/api.php", {
    method: "POST",
    body: formData,
    headers: {
      "User-Agent":
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36",
    },
  });

  return await response.text();
}