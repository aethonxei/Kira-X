import { sticker } from '../lib/sticker.js';
import axios from 'axios';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const fetchSticker = async (text, attempt = 1) => {
    try {
        const response = await axios.get(`https://kepolu-brat.hf.space/brat`, {
            params: { q: text },
            responseType: 'arraybuffer',
        });
        return response.data;
    } catch (error) {
        if (error.response?.status === 429 && attempt <= 3) {
            const retryAfter = error.response.headers['retry-after'] || 5;
            await delay(retryAfter * 1000);
            return fetchSticker(text, attempt + 1);
        }
        throw error;
    }
};

let handler = async (m, { conn, text }) => {
    if (!text) {
        return conn.sendMessage(m.chat, {
            text: `${emoji} Please enter the text to create a sticker.`,
        }, { quoted: m });
    }

    try {
        const buffer = await fetchSticker(text);
        let userId = m.sender;
        let packstickers = global.db.data.users[userId] || {};
        let texto1 = packstickers.text1 || global.packsticker;
        let texto2 = packstickers.text2 || global.packsticker2;
        
        let stiker = await sticker(buffer, false, texto1, texto2);
        
        if (stiker) {
            return conn.sendFile(m.chat, stiker, 'sticker.webp', '', m);
        } else {
            throw new Error("The sticker could not be generated..");
        }
    } catch (error) {
        console.error(error);
        return conn.sendMessage(m.chat, {
            text: `${msm} An error occurred: ${error.message}`,
        }, { quoted: m });
    }
};

handler.command = ['brat'];
handler.tags = ['sticker'];
handler.help = ['brat *<text>*'];

export default handler;