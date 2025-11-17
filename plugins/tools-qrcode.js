import fetch from 'node-fetch';

const handler = async (m, { args, usedPrefix, command, conn }) => {
  if (!args[0]) {
    return m.reply(`🍎 *Correct use of the command:*\n${usedPrefix + command} <text or URL>\n\n🧩 Example:\n${usedPrefix + command} https://wa.me`);
  }

  try {
    const texto = encodeURIComponent(args.join(" "));
    const qrURL = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${texto}`;

    await conn.sendMessage(m.chat, {
      image: { url: qrURL },
      caption: `✅ *QR code successfully generated*\n📎 *Text:* ${args.join(" ")}`
    }, { quoted: m });
  } catch (e) {
    console.error(e);
    m.reply('❌ An error occurred while generating the QR code..');
  }
};

handler.command = ['qrcode'];
handler.register = true;
export default handler;
