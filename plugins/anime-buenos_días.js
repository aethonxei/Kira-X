//Codígo creado por Destroy wa.me/584120346669

import fs from 'fs';
import path from 'path';

let handler = async (m, { conn }) => {
    m.react('☀️');

    const messages = [
        "Good morning! 🌞 I hope your day is full of joy and bright opportunities.",
        "Good morning! 🔆 May this new day bring you smiles and unforgettable moments.",
        "Good morning! 🌤️ I hope you find beauty in every little detail today.",
        "Good morning! ✨ May this day be full of inspiration and may every step bring you closer to your dreams.",
        "Good morning! 🌅 I hope today is a day full of light and love.",
        "Good morning! 🌄 May today be full of joy and opportunities to grow."
    ];

    let randomMessage = messages[Math.floor(Math.random() * messages.length)];

    if (m.isGroup) {
        let videos = [
            'https://qu.ax/ZVcM.mp4', 
            'https://qu.ax/tCblW.mp4', 
            'https://qu.ax/kGzZr.mp4',
            'https://qu.ax/iioMV.mp4',
            'https://qu.ax/JgSvx.mp4',
            'https://qu.ax/dvrKi.mp4',
            'https://qu.ax/TZuhK.mp4'
        ];

        const video = videos[Math.floor(Math.random() * videos.length)];

        conn.sendMessage(m.chat, { video: { url: video }, gifPlayback: true, caption: randomMessage }, { quoted: m });
    }
}

handler.help = ['dias/days'];
handler.tags = ['grupo'];
handler.command = ['dias', 'dia', 'days'];
handler.group = true;

export default handler;
