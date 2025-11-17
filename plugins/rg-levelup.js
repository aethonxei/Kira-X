import { canLevelUp, xpRange } from '../lib/levelling.js';
import db from '../lib/database.js';
import fetch from 'node-fetch';

let handler = async (m, { conn }) => {
    let mentionedUser = m.mentionedJid[0];
    let citedMessage = m.quoted ? m.quoted.sender : null;
    let who = mentionedUser || citedMessage || m.sender; 
    let name = await conn.getName(who) || 'User';
    let user = global.db.data.users[who];

    if (!user) {
        await conn.sendMessage(m.chat, { text: "❌ No user data was found." }, { quoted: m });
        return;
    }

    let { min, xp } = xpRange(user.level, global.multiplier);

    let before = user.level * 1;
    while (canLevelUp(user.level, user.exp, global.multiplier)) user.level++;

    if (before !== user.level) {
       
        let avatar = await conn.profilePictureUrl(who, 'image').catch(_ => 'https://files.catbox.moe/fr0li2.jpeg');
        let background = encodeURIComponent('https://files.catbox.moe/gegwez.jpg');
        let avatarURL = encodeURIComponent(avatar);
        let fromLevel = before;
        let toLevel = user.level;
        let apiURL = `https://api.siputzx.my.id/api/canvas/level-up?backgroundURL=${background}&avatarURL=${avatarURL}&fromLevel=${fromLevel}&toLevel=${toLevel}&name=${encodeURIComponent(name)}`;

        
        await conn.sendFile(m.chat, apiURL, 'levelup.jpg', `
ᥫ᭡ Congratulations, @${who.split('@')[0]}!

✦ You've leveled up:
➜ *${fromLevel}* ➔ *${toLevel}* 〔 ${user.role} 〕

🗓️ *Date:* ${new Date().toLocaleString('es-DO')}
> *Keep interacting to level up.*
        `.trim(), m, false, { mentions: [who] });
    } else {
        // Show progress if you don't level up
        let users = Object.entries(global.db.data.users).map(([key, value]) => {
            return { ...value, jid: key };
        });

        let sortedLevel = users.sort((a, b) => (b.level || 0) - (a.level || 0));
        let rank = sortedLevel.findIndex(u => u.jid === who) + 1;

        let txt = `*「✿」User* ◢ ${name} ◤\n\n`;
        txt += `✦ Level » *${user.level}*\n`;
        txt += `✰ Experience » *${user.exp}*\n`;
        txt += `❖ Range » ${user.role}\n`;
        txt += `➨ Progress » *${user.exp - min} => ${xp}* _(${Math.floor(((user.exp - min) / xp) * 100)}%)_\n`;
        txt += `# Position » *${rank}* of *${sortedLevel.length}*\n`;
        txt += `❒ Total Commands » *${user.commands || 0}*`;

        await conn.sendMessage(m.chat, { text: txt }, { quoted: m });
    }
};

handler.help = ['levelup', 'lvl @user'];
handler.tags = ['rpg'];
handler.command = ['nivel', 'lvl', 'level', 'levelup'];
handler.register = true;
handler.group = true;

export default handler;
