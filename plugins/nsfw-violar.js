//Codígo creado por Destroy wa.me/584120346669

import fs from 'fs';
import path from 'path';

let handler = async (m, { conn, usedPrefix }) => {
if (!db.data.chats[m.chat].nsfw && m.isGroup) {
    return m.reply(`${emoji} *NSFW* content is disabled in this group.\n> An administrator can activate it with the command » *#nsfw on*`);
    }

    let who;
    if (m.mentionedJid.length > 0) {
        who = m.mentionedJid[0];
    } else if (m.quoted) {
        who = m.quoted.sender;
    } else {
        who = m.sender;
    }

    let name = conn.getName(who);
    let name2 = conn.getName(m.sender);
    m.react('🥵');

    let str;
    if (m.mentionedJid.length > 0) {
        str = `\`${name2}\` *You just raped that little whore.* \`${name || who}\` *While I was telling you, "Put it in me hard, harder, what a delicious cock"...*
*We have to sweat together again!!.*`;
    } else if (m.quoted) {
        str = `\`${name2}\` *You raped that ill-bred whore of* \`${name || who}\` *While I was telling you, "Put it in me hard, harder, what a delicious cock"...*
*We have to sweat together again!!.*`;
    } else {
        str = `\`${name2}\` *raped a random person from the group because they're a whore.*`.trim();
    }
    
    if (m.isGroup) {
        let pp = 'https://files.catbox.moe/cnmn0x.jpg'; 
        let pp2 = 'https://files.catbox.moe/xph5x5.mp4'; 
        let pp3 = 'https://files.catbox.moe/4ffxj8.mp4';
        let pp4 = 'https://files.catbox.moe/f6ovgb.mp4';
        let pp5 = 'https://qu.ax/XmLe.mp4';
        let pp6 = 'https://qu.ax/yiMt.mp4';
        let pp7 = 'https://qu.ax/cdKQ.mp4';
        
        const videos = [pp, pp2, pp3, pp4, pp5, pp6, pp7];
        const video = videos[Math.floor(Math.random() * videos.length)];

        let mentions = [who];
        conn.sendMessage(m.chat, { video: { url: video }, gifPlayback: true, caption: str, mentions }, { quoted: m });
    }
}

handler.help = ['violate/rape @tag'];
handler.tags = ['nsfw'];
handler.command = ['violate', 'rape'];
handler.group = true;

export default handler;
