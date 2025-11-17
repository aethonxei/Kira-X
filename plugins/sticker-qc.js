/* Code Made By aethonxei */

import { sticker } from '../lib/sticker.js';
import axios from 'axios';

const handler = async (m, { conn, args, usedPrefix, command }) => {
    let text;
    // ✅ 1. If args exist, join them as text
    if (args.length >= 1) {
        text = args.join(" ");
    } 
    // ✅ 2. If replying to a text message, use that text
    else if (m.quoted && m.quoted.text) {
        text = m.quoted.text;
    } 
    // ✅ 3. If no text, show usage tip
    else {
        return conn.reply(m.chat, `📌 You forgot to add text or reply to a message.`, m);
    }

    // ✅ Get sender & owners
    const senderNum = m.sender.split('@')[0];
    const owners = global.owner.map(([num]) => num.replace(/[^0-9]/g, ''));
    const isOwner = owners.includes(senderNum);

    // ✅ If not owner, check if message mentions one of the owners
    if (!isOwner) {
        const textLower = text.toLowerCase();
        const mentioned = m.mentionedJid?.map(jid => jid.split('@')[0]) || [];

        const mentionsOwner = owners.some(owner =>
            textLower.includes(owner) ||
            textLower.includes(`@${owner}`) ||
            mentioned.includes(owner)
        );

        if (mentionsOwner) {
            return conn.reply(m.chat,
                `🍎 *hahahaha~... mentioning my creator?*\n😤 *How dare you, peasant...*\n💢 *But I can’t betray my creator...*\n😈 *...unless you want me to write your name in my notebook~* 📓`,
                m
            );
        }
    }

    // ✅ Determine who is being quoted
    let who;
    if (m.quoted) {
        // If replying to someone’s message
        who = m.quoted.sender;
    } else if (m.mentionedJid && m.mentionedJid[0]) {
        // If tagging someone
        who = m.mentionedJid[0];
    } else {
        // Default: sender themselves
        who = m.sender;
    }

    // ✅ Remove mention tag from text if present
    const mentionRegex = new RegExp(`@${who.split('@')[0].replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*`, 'g');
    const messageText = text.replace(mentionRegex, '').trim();

    if (messageText.length > 40) return conn.reply(m.chat, `📌 The text cannot be more than 40 characters.`, m);

    // ✅ Get name & profile picture
    const pp = await conn.profilePictureUrl(who).catch(() => 'https://telegra.ph/file/24fa902ead26340f3df2c.png');
    const name = await conn.getName(who);

    // ✅ Quote object for API
    const obj = {
        "type": "quote",
        "format": "png",
        "backgroundColor": "#000000",
        "width": 512,
        "height": 768,
        "scale": 2,
        "messages": [{
            "entities": [],
            "avatar": true,
            "from": {
                "id": 1,
                "name": `${name}`,
                "photo": { "url": `${pp}` }
            },
            "text": messageText || m.quoted?.text || '...',
            "replyMessage": {}
        }]
    };

    // ✅ Request the quote image
    const json = await axios.post('https://bot.lyo.su/quote/generate', obj, { headers: { 'Content-Type': 'application/json' } });
    const buffer = Buffer.from(json.data.result.image, 'base64');

    // ✅ Sticker pack info
    const userId = m.sender;
    const userData = global.db.data.users[userId] || {};
    const pack1 = userData.text1 || global.packsticker;
    const pack2 = userData.text2 || global.packsticker2;

    const stiker = await sticker(buffer, false, pack1, pack2);
    if (stiker) return conn.sendFile(m.chat, stiker, 'quote.webp', '', m);
};

handler.help = ['qc'];
handler.tags = ['sticker'];
handler.group = true;
handler.register = true;
handler.command = ['qc'];

export default handler;
