import db from '../lib/database.js';
import MessageType from '@whiskeysockets/baileys';

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
        dmt = global.db.data.users[who].exp;
    } else {
        if (!txt) return m.reply(`${emoji2} Please enter the amount of experience (XP) you want to remove.`);
        if (isNaN(txt)) return m.reply(`${emoji} Only numbers are allowed.`);
        
        dmt = parseInt(txt);
    }
    
    let users = global.db.data.users;
    
    if (users[who].exp < dmt) {
        return m.reply(`${emoji2} The user doesn't have enough XP to remove it. ${users[who].exp} XP.`);
    }

    users[who].exp -= dmt;
    
    m.reply(`✨ *Removed:*
» ${dmt} \n@${who.split('@')[0]}, removed ${dmt} XP`, null, { mentions: [who] });
};

handler.help = ['removexp *<@user>*'];
handler.tags = ['owner'];
handler.command = ['removexp', 'removexp']; 
handler.rowner = true;

export default handler;
