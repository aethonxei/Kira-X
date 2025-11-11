//Codígo creado por Destroy wa.me/584120346669

import fs from 'fs';
import path from 'path';

let handler = async (m, { conn }) => {
    m.react('🌕');
    
    const messages = [
        "Good night! 🌜 I hope you have a restful sleep and dream beautiful things.",
        "Good night! 🌟 May the tranquility of the night envelop you and prepare you for a new day.",
        "Good night! 🌌 Remember that every star in the sky is a dream waiting to come true.",
        "Good night! 🌙 Leave today's worries behind and embrace the peace of the night.",
        "Good night! 🌠 I hope your dreams are as bright as the stars that light up the sky.",
        "Good night! 💤 May you find serenity in the silence of the night and wake up refreshed.."
    ];

    let randomMessage = messages[Math.floor(Math.random() * messages.length)];

    if (m.isGroup) {
        const videos = [
            'https://files.catbox.moe/0n2bf5.mp4',
            'https://files.catbox.moe/zua131.mp4',
            'https://files.catbox.moe/0im4vk.mp4',
            'https://files.catbox.moe/9cm0x9.mp4',
            'https://files.catbox.moe/7kxjhv.mp4',
            'https://files.catbox.moe/id09sr.mp4',
            'https://files.catbox.moe/3kyhf0.mp4',
            'https://files.catbox.moe/4qokmi.mp4'
        ];
     
        const video = videos[Math.floor(Math.random() * videos.length)];

        conn.sendMessage(m.chat, { video: { url: video }, gifPlayback: true, caption: randomMessage }, { quoted: m });
    }
}

handler.help = ['nights/noches'];
handler.tags = ['grupo'];
handler.command = ['nights', 'gn', 'goodnight'];
handler.group = true;

export default handler;
