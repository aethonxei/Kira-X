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
    if (!txt) return m.reply(`${emoji} Please enter the amount you wish to add.`);
    if (isNaN(txt)) return m.reply(`${emoji2} numbers only.`);

    let dmt = parseInt(txt);
    let coin = dmt;
    let pjk = Math.ceil(dmt * impts);
    coin += pjk;

    if (coin < 1) return m.reply(`${emoji2} The minimum is *1*`);

    let users = global.db.data.users;
    users[who].coin += dmt;

    m.reply(`💸 *Added:*
» ${dmt} \n@${who.split('@')[0]}, you received ${dmt} 💸`, null, { mentions: [who] });
};

handler.help = ['addcoins *<@user>*'];
handler.tags = ['owner'];
handler.command = ['añadircoin', 'addcoin', 'addcoins']; 
handler.rowner = true;

export default handler;