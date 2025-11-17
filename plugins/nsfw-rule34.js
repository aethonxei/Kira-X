import fetch from 'node-fetch';
const handler = async (m, { conn, args, usedPrefix }) => {
    if (!db.data.chats[m.chat].nsfw && m.isGroup) {
    return m.reply(`${emoji} *NSFW* content is disabled in this group.\n> An administrator can activate it with the command » *#nsfw on*`);
    }
    if (!args[0]) {
      await conn.reply(m.chat, `${emoji} Please enter a tag to perform the search.`, m);
        return;
    }
    const tag = args[0];
    const url = `https://rule34.xxx/index.php?page=dapi&s=post&q=index&json=1&tags=${tag}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (!data || data.length === 0) {
            await conn.reply(m.chat, `${emoji2} There were no results for *${tag}*`, m);
            return;
        }
        const randomIndex = Math.floor(Math.random() * data.length);
        const randomImage = data[randomIndex];
        const imageUrl = randomImage.file_url;
        await conn.sendMessage(m.chat, { image: { url: imageUrl }, caption: `${emoji} Results for » *${tag}*`, mentions: [m.sender] });
    } catch (error) {
        console.error(error);
        await m.reply(`${emoji} An error occurred.`);
    }
};
handler.help = ['r34 <tag>', 'rule34 <tag>'];
handler.command = ['r34', 'rule34'];
handler.tags = ['nsfw'];

export default handler;
