import db from '../lib/database.js';
import MessageType from '@whiskeysockets/baileys';

let impts = 0;

let handler = async (m, { conn, text }) => {
    let who;
    if (m.isGroup) {
        if (m.mentionedJid.length > 0) {
            who = m.mentionedJid[0];
        } else {
            const quoted = m.quoted ? m.quoted.sender : null;
            who = quoted ? quoted : m.chat;
        }
    } else {
        who = m.chat;
    }

    if (!who) return m.reply(`${emoji} Please mention the user or quote a message.`);

    let txt = text.replace('@' + who.split`@`[0], '').trim();
    let dmt;

    if (txt.toLowerCase() === 'all') {
        dmt = global.db.data.users[who].coin;
    } else {
        if (!txt) return m.reply(`${emoji} Please enter the amount you want to remove.`);
        if (isNaN(txt)) return m.reply(`${emoji2} only numbers.`);

        dmt = parseInt(txt);
    }

    let users = global.db.data.users;

    if (users[who].coin < dmt) {
        return m.reply(`${emoji2} The user does not have enough coins to remove. ${users[who].coin} ${m.moneda}.`);
    }

    users[who].coin -= dmt;

    m.reply(`💸 *Removed:*
» ${dmt} \n@${who.split('@')[0]}, removed ${dmt} 💸`, null, { mentions: [who] });
};

handler.help = ['removecoin *<@user>*', 'removecoin all'];
handler.tags = ['owner'];
handler.command = ['removercoin', 'removecoin', 'removecoins']; 
handler.rowner = true;

export default handler;