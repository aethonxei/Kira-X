import axios from 'axios';
const { generateWAMessageContent, generateWAMessageFromContent, proto } = (await import('@whiskeysockets/baileys')).default;

const handler = async (m, { conn, args, usedPrefix, command }) => {
  const emoji = '📌';

  if (!args[0]) return m.reply(`${emoji} Enter a valid *Pinterest* link.\nExample: ${usedPrefix + command} https://www.pinterest.com/pin/862439397377053654`);

  await m.react('⏳');
  try {
    const url = args[0];
    const res = await axios.get(`https://api.siputzx.my.id/api/d/pinterest?url=${encodeURIComponent(url)}`);
    const json = res.data;

    if (!json.status || !json.data?.url) {
      return m.reply(`${emoji} The video could not be retrieved. Please ensure the link is valid..`);
    }

    await conn.sendMessage(m.chat, {
      video: { url: json.data.url },
      caption: `${emoji} *Video downloaded from Pinterest*\n📎 ID: ${json.data.id}\n🕒 Date: ${json.data.created_at}`
    }, { quoted: m });

    await m.react('✅');
  } catch (e) {
    console.error(e);
    await m.reply('❌ An error occurred while trying to download the Pinterest video..');
  }
};

handler.command = ['pinvideo', 'pindl', 'pinterestdl'];
handler.register = true;
handler.help = ['pinvideo <url>'];
handler.tags = ['descargas'];

export default handler;
