import { WAMessageStubType } from '@whiskeysockets/baileys';
import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, command, text }) => {
    if (!db.data.chats[m.chat].welcome && m.isGroup) {
    return m.reply(`${emoji} To use this command, you must activate Welcomes with *#welcome*`);
    }
    let chat = global.db.data.chats[m.chat];
    
    let mentions = text.trim();
    let who = mentions ? conn.parseMention(mentions) : [];
    if (!text) return conn.reply(m.chat, `${emoji} Mention the user with @ to simulate a welcome message.`, m);

    let taguser = `@${who[0].split('@')[0]}`;
    let groupMetadata = await conn.groupMetadata(m.chat);
    let defaultImage = 'https://files.catbox.moe/mq2yh8.jpg';

    let img;
    try {
        let pp = await conn.profilePictureUrl(who[0], 'image');
        img = await (await fetch(pp)).buffer();
    } catch {
        img = await (await fetch(defaultImage)).buffer();
    }

    let bienvenida = `❀ *Welcome* to ${groupMetadata.subject}\n ✰ ${taguser}\n${global.welcom1}\n •(=^●ω●^=)• Enjoy your time in the group!\n> ✐ You can use *#help* to see the list of commands.`;
    await conn.sendMessage(m.chat, { image: img, caption: bienvenida, mentions: who });
};

handler.help = ['testwelcome @user'];
handler.tags = ['group'];
handler.command = ['testwelcome'];
handler.admin = true;
handler.group = true;

export default handler;