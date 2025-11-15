import fetch from 'node-fetch';

var handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) {
    return conn.reply(
      m.chat,
      `${emoji} 𝙿𝚕𝚎𝚊𝚜𝚎, 𝚎𝚗𝚝𝚎𝚛 𝚊 𝚃𝚒𝚔𝚃𝚘𝚔 𝚕𝚒𝚗𝚔.\n\n📌 *Example:* ${usedPrefix + command} https://vm.tiktok.com/...`,
      m
    );
  }

  try {
    await conn.reply(m.chat, `${emoji} 𝙷𝚘𝚕𝚍 𝚘𝚗 𝚊 𝚖𝚘𝚖𝚎𝚗𝚝, 𝚏𝚎𝚝𝚌𝚑𝚒𝚗𝚐 𝚝𝚑𝚎 𝚟𝚒𝚍𝚎𝚘...`, m);

    const tiktokData = await tiktokdl(args[0]);
    const result = tiktokData?.data;

    if (!result?.play) {
      return conn.reply(m.chat, "❌ 𝙴𝚛𝚛𝚘𝚛: 𝙲𝚘𝚞𝚕𝚍 𝚗𝚘𝚝 𝚏𝚎𝚝𝚌𝚑 𝚝𝚑𝚎 𝚟𝚒𝚍𝚎𝚘.", m);
    }

    const caption = `
  *T I K T O K  -  D O W N L O A D*

\`${result.title || 'Untitled'}\`

01:43 ━━━━●───── 04:40
⇆ㅤ ◁ㅤ ❚❚ ㅤ▷ ㅤ ↻
               ılıılıılıılıılıılı
𝚅𝙾𝙻𝚄𝙼𝙴 : ▮▮▮▮▮▮▮▮▮▮

❐  *Author* : ${result.author?.nickname || 'Unknown'}
❐  *Duration* : ${result.duration || 0} seconds
❐  *Views* : ${result.play_count || 0}
❐  *Likes* : ${result.digg_count || 0}
❐  *Comments* : ${result.comment_count || 0}
❐  *Shared* : ${result.share_count || 0}
❐  *Published* : ${formatDate(result.create_time)}
❐  *Downloads* : ${result.download_count || 0}
`.trim();

    await conn.sendFile(m.chat, result.play, 'tiktok.mp4', caption, m);
    await m.react('✅');
  } catch (error) {
    console.error(error);
    return conn.reply(m.chat, `❌ 𝙳𝚘𝚠𝚗𝚕𝚘𝚊𝚍 𝙴𝚛𝚛𝚘𝚛: ${error.message}`, m);
  }
};

handler.help = ['tiktok', 'tt'].map(v => v + ' *<link>*');
handler.tags = ['descargas'];
handler.command = ['tiktok', 'tt', 'tik', 'tiktokdl', 'ttdl'];
handler.group = true;
handler.register = true;
handler.coin = 2;
handler.limit = true;

export default handler;

async function tiktokdl(url) {
  const api = `https://www.tikwm.com/api/?url=${url}&hd=1`;
  const res = await fetch(api);
  const json = await res.json();
  return json;
}

function formatDate(timestamp) {
  const date = new Date(timestamp * 1000);
  return date.toLocaleString('ar-MA', { timeZone: 'Africa/Casablanca' });
}
