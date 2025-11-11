import translate from '@vitalets/google-translate-api';
import fetch from 'node-fetch';

const newsletterJid = '120363420610572685@newsletter';
const newsletterName = '𖥔🍎ᩚ⋆｡˚ ꒰❄︎ ʸᵃᵍᵃᵐⁱ-ˡⁱᵍʰᵗ | ᴄʜᴀɴɴᴇʟ-ʙᴏᴛ ꒱࣭';

let handler = async (m, { conn, args, usedPrefix, command }) => {
  const contextInfo = {
    mentionedJid: [m.sender],
    isForwarded: true,
    forwardingScore: 999,
    forwardedNewsletterMessageInfo: {
      newsletterJid,
      newsletterName,
      serverMessageId: -1
    },
    externalAdReply: {
      title: botname,
      body: wm,
      thumbnail: icons,
      sourceUrl: redes,
      mediaType: 1,
      renderLargerThumbnail: false
    }
  };

  const prompt = args.join(' ');
  if (!prompt) {
    return conn.reply(
      m.chat,
      `🍎 *Tell me what image you want to create with text...* (◕‿◕✿)\n\n🌼 *Example:* \n\`${usedPrefix + command} A red dragon flying over snowy mountains\``,
      m,
      { contextInfo, quoted: m }
    );
  }

  try {
    // Traducir prompt a inglés
    const { text: translatedPrompt } = await translate(prompt, { to: 'en', autoCorrect: true });

    await conn.reply(m.chat, `🎨 *Creating an image from text...* ✨\n(⌒‿⌒) 〰️`, m, { contextInfo, quoted: m });

    const apiUrl = `https://api.vreden.my.id/api/artificial/aiease/text2img?prompt=${encodeURIComponent(translatedPrompt)}&style=19`;
    const res = await fetch(apiUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0'
      }
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`API responded with ${res.status}: ${errorText}`);
    }

    const json = await res.json();
    const images = json?.result;
    if (!images || images.length === 0) throw new Error('No images were received from the API.');

    // We took the first original image
    const imageUrl = images[0].origin;
    if (!imageUrl) throw new Error('Image URL not found.');

    // Download image with Referer header to avoid 404 (if necessary)
    const imageRes = await fetch(imageUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Referer': 'https://api.vreden.my.id/'
      }
    });

    if (!imageRes.ok) throw new Error(`The image could not be downloaded. (status ${imageRes.status})`);

    const buffer = await imageRes.buffer();

    // Send image with caption of the original prompt
    await conn.sendMessage(m.chat, {
      image: buffer,
      caption: `╭─❍𓂃⟡🍎⟡𓂃❍─╮  
🍎 *Image created from:*  
╰─────────────╯\n\n*${prompt}*`,
    }, { quoted: m, contextInfo });

  } catch (e) {
    console.error(e);
    conn.reply(m.chat, `😿 *An error occurred while creating the image....*\n\`\`\`${e.message}\`\`\``, m, { contextInfo, quoted: m });
  }
};

handler.help = ['text2img'].map(v => v + ' <texto>');
handler.tags = ['ai', 'image'];
handler.command = ['text2img', 'imagengen'];
handler.limit = true;
handler.coin = 3;
handler.register = true;

export default handler;

    
