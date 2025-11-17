// Créditos: Dioneibi
import axios from 'axios';

let handler = async (m, { conn, command }) => {
  if (!db.data.chats[m.chat].nsfw && m.isGroup) {
    return conn.reply(m.chat, '🚫 *NSFW* content is disabled in this group.\n> An administrator can activate it with the command » *#nsfw on*.', m);
  }

  try {
    const res = await axios.get('https://delirius-apiofc.vercel.app/anime/hentaivid');
    const data = res.data;

    if (!Array.isArray(data) || data.length === 0) {
      return conn.reply(m.chat, '⚠️ The video could not be retrieved. Please try again later..\n🔧 *Reason:* Empty list or unexpected API format.', m);
    }

    const random = data[Math.floor(Math.random() * data.length)];
    const caption = `🔞 *HENTAI RANDOM VIDEO* 🔥

🎬 *Title:* ${random.title}
📁 *Category:* ${random.category}
📊 *Views:* ${random.views_count}
📤 *Shared:* ${random.share_count}
🌐 *Link:* ${random.link}

🔗 *Download video:* ${random.video_1}`;

    await conn.sendFile(m.chat, random.video_1, 'video.mp4', caption, m);
  } catch (err) {
    console.error('[❌ ERROR API]', err);
    let reason = err.response?.status
      ? `HTTP code: ${err.response.status} (${err.response.statusText})`
      : err.message;

    return conn.reply(m.chat, `❌ An error occurred while retrieving the video.\n🔧 *Reason:* ${reason}`, m);
  }
};

handler.command = ['hentaivideo', 'hentaivid'];
handler.tags = ['nsfw'];
handler.help = ['hentaivideo'];
handler.register = true;
handler.nsfw = true;
export default handler;