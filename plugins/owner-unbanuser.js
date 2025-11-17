const handler = async (m, { conn, args, text, usedPrefix, command }) => {
    let user;
    let db = global.db.data.users;
    if (m.quoted) {
        user = m.quoted.sender;
    } else if (args.length >= 1) {
        user = args[0].replace('@', '') + '@s.whatsapp.net';
    } else {
        await conn.reply(m.chat, `🚩 Tag or reply to the message of the user you want to unban., Example:\n> → *${usedPrefix}unbanuser <@tag>*`, m);
        return;
    }
    if (db[user]) {
        db[user].banned = false;
        db[user].banRazon = '';
        const nametag = await conn.getName(user);
        const nn = conn.getName(m.sender);
        await conn.reply(m.chat, `✅️ The user *${nametag}* has been unbanned.`, m, { mentionedJid: [user] });
        conn.reply('212605158422@s.whatsapp.net', `🚩 The user *${nametag}* has been unbanned by *${nn}*`, m, rcanal, );
    } else {
        await conn.reply(m.chat, `🚩 The user is not registered.`, m);
    }
};
handler.help = ['unbanuser <@tag>'];
handler.command = ['unbanuser'];
handler.tags = ['mods'];
handler.mods = true;
handler.group = true;
export default handler;