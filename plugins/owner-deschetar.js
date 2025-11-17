let handler = async (m, { conn, text }) => {
    let who;

    if (m.isGroup) {
        if (m.mentionedJid.length > 0) {
            who = m.mentionedJid[0];
        } else if (m.replyMessage && m.replyMessage.sender) {
            who = m.replyMessage.sender;
        } else if (text) {
            who = text.trim();
            if (!who.endsWith('@s.whatsapp.net')) {
                who = `${who}@s.whatsapp.net`;
            }
        } else {
            who = m.sender;
        }
    } else {
        if (text) {
            who = text.trim();
            if (!who.endsWith('@s.whatsapp.net')) {
                who = `${who}@s.whatsapp.net`;
            }
        } else {
            who = m.sender;
        }
    }

    console.log(`User processed: ${who}`); // For debugging

    if (!global.db) global.db = {};
    if (!global.db.data) global.db.data = {};
    if (!global.db.data.users) global.db.data.users = {};

    let users = global.db.data.users;

    if (!users[who]) throw `${emoji2} The user has no data to unchain.`;

    users[who].coin = 0;
    users[who].exp = 0;
    users[who].level = 0;

    await global.db.write();

    for (let subbot of global.conns) {
        try {
            if (subbot.user) {
                await subbot.sendMessage(m.chat, { text: `/uncheat ${who.split`@`[0]}` });
            }
        } catch (error) {
            console.log(`${msm} Error unchecking the user: ${error.message}`);
        }
    }

    await m.reply(
        `☁️ *User successfully uncheated!*\n\n` +
        `👤 User: @${who.split`@`[0]}\n` +
        `💸 ${m.moneda}: *0*\n` +
        `✨ Experience: *0*\n` +
        `🌟 Level: *0*`,
        null,
        { mentions: [who] }
    );
};

handler.help = ['uncheat *@user*', 'uncheatt *<número>*'];
handler.tags = ['owner'];
handler.command = ['uncheat'];
handler.register = true;
handler.rowner = true;

export default handler;