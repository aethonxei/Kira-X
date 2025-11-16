let handler = async (m, { conn, isROwner }) => {
    if (!isROwner && m.sender !== conn.user.jid) {
        throw `This command can only be used by the creator or by the bot itself.`;
    }

    if (!m.isGroup) throw `This command can only be used in groups.`;

    let chat = global.db.data.chats[m.chat];
    if (!chat) chat = global.db.data.chats[m.chat] = {};
    
    const botJid = conn.user.jid;

    if (!chat.bannedBots) chat.bannedBots = [];

    if (chat.bannedBots.includes(botJid)) {
        return m.reply('This chat is already banned by the bot.');
    }

    chat.bannedBots.push(botJid);
    m.reply(`✅ *Banned Chat*\n\nFrom now on, this bot (${conn.user.name || 'This bot'}) will stop responding to any commands in this chat.\n\nTo unban it, the owner must use the command #unbanchat.`);
};

handler.help = ['banchat'];
handler.tags = ['owner'];
handler.command = ['banchat'];
handler.group = true;

export default handler;