import db from '../lib/database.js';
import MessageType from '@whiskeysockets/baileys';

let pajak = 0;

const handler = async (m, { conn, text }) => {
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

    const txt = text.replace('@' + who.split`@`[0], '').trim();
    if (!txt) return m.reply(`${emoji} Enter the amount of experience (XP) you wish to add.`);
    if (isNaN(txt)) return m.reply(`${emoji2} Only numbers are allowed.`);
    
    const xp = parseInt(txt);
    let exp = xp;
    const pjk = Math.ceil(xp * pajak);
    exp += pjk;
    
    if (exp < 1) return m.reply(`${emoji} The minimum experience (XP) to add is *1*.`);
    
    const users = global.db.data.users;
    users[who].exp += xp;
    
    m.reply(`✨ XP Added: *${xp}* \n@${who.split('@')[0]}, you received ${xp} XP`, null, { mentions: [who] });
};

handler.command = ['addxp', 'addexp'];
handler.rowner = true;

export default handler;
