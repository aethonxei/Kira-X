import { canLevelUp, xpRange } from '../lib/levelling.js';
import { levelup } from '../lib/canvas.js';
import { roles } from './role.js'; // ✅ move import here (not inside function)
import moment from 'moment-timezone';

let handler = m => m;
handler.before = async function (m, { conn, usedPrefix }) {

    if (!db.data.chats[m.chat].autolevelup) return;
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
    let perfil = await conn.profilePictureUrl(who, 'image').catch(_ => 'https://files.catbox.moe/mq2yh8.jpg');
    let userName = m.pushName || 'Anonymous';
    let user = global.db.data.users[m.sender];
    let chat = global.db.data.chats[m.chat];
    
    if (!chat.autolevelup) return;

    let before = user.level * 1;
    
    while (canLevelUp(user.level, user.exp, global.multiplier)) 
        user.level++;

    // 🌙 Role promotion check (Death Note)
    let oldRole = user.role;
    let newRole = (Object.entries(roles)
      .sort((a, b) => b[1] - a[1])
      .find(([, minLevel]) => user.level >= minLevel) || Object.entries(roles)[0])[0];

    if (newRole !== oldRole) {
      user.role = newRole;
      await conn.sendMessage(m.chat, {
        text: `⚰️ *Another soul judged...*\nYou have risen to *${newRole}*.\n🩸 Keep climbing, ${userName || 'disciple of Kira'}...`
      });
    }

    if (before !== user.level) {
        m.reply(`*✿ CONGRATULATIONS ! ✿*\n\n✰ Previous Level » *${before}*\n✰ Current Level » *${user.level}*\n✦ Date » *${moment.tz('Africa/Casablanca').format('DD/MM/YY')}*\n\n> *\`You have reached a new level!\`*`);

        let especial = 'coin';
        let especial2 = 'exp';
        let especialCant = Math.floor(Math.random() * (9 - 6 + 1)) + 6;
        let especialCant2 = Math.floor(Math.random() * (10 - 6 + 1)) + 6;

        if (user.level % 5 === 0) {
            user[especial] += especialCant;
            user[especial2] += especialCant2;
        }
    }
};

export default handler;