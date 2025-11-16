let handler = async (m, { conn, isROwner }) => {
    if (!isROwner && m.sender !== conn.user.jid) {
        throw `This command can only be used by the creator or the bot itself..`;
    }


    let chat = global.db.data.chats[m.chat];
    if (!chat || !chat.bannedBots) {
        return m.reply('This bot is not banned in this chat.');
    }

    const botJid = conn.user.jid;

    if (!chat.bannedBots.includes(botJid)) {
        return m.reply('This chat is not banned from the bot.');
    }

    chat.bannedBots = chat.bannedBots.filter(jid => jid !== botJid);

    m.reply(`✅ *Chat Unbanned*\n\nThis bot (${conn.user.name || 'This bot'}) will respond to commands in this chat again from now on.`);
};

handler.help = ['unbanchat'];
handler.tags = ['owner'];
handler.command = ['unbanchat', 'desbanearchat'];
handler.group = true;

export default handler;