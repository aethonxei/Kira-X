import fetch from 'node-fetch';
import axios from 'axios';
import cheerio from 'cheerio';

const handler = async (m, { conn, args, command, usedPrefix }) => {
    if (!db.data.chats[m.chat].nsfw && m.isGroup) {
    return m.reply(`${emoji} *NSFW* content is disabled in this group.\n> An administrator can activate it with the command » *#nsfw on*`);
    }
    if (!args[0]) {
        return conn.reply(m.chat, `${emoji} Please enter the search you wish to perform on Xvideos.\nExample: ${usedPrefix + command} Mia Malkova.`, m);
    }

    try {
        const results = await xvideosSearch(args.join(' '));
        if (results.length === 0) {
            return conn.reply(m.chat, `${emoji2} No results were found for: *${args.join(' ')}*`, m);
        }

        let responseMessage = `${emoji} *Search results for:* *${args.join(' ')}*\n\n`;
        results.forEach((video, index) => {
            responseMessage += `☁️ *Title:* ${video.title}\n`;
            responseMessage += `🕒 *Duration:* ${video.duration}\n`;
            responseMessage += `🎞️ *Quality:* ${video.quality || 'Not available'}\n`;
            responseMessage += `🔗 *Link:* ${video.url}\n\n`;
        });

        conn.reply(m.chat, responseMessage, m);
    } catch (e) {
        console.error(e);
        return conn.reply(m.chat, `${msm} An error occurred while searching for videos. Please try again later.`, m);
    }
};

handler.command = ['xvideossearch', 'xvsearch'];
handler.register = true;
handler.group = false;

export default handler;

async function xvideosSearch(query) {
    return new Promise(async (resolve, reject) => {
        try {
            const url = `https://www.xvideos.com/?k=${encodeURIComponent(query)}`;
            const response = await axios.get(url);
            const $ = cheerio.load(response.data);

            const results = [];
            $("div.mozaique > div").each((index, element) => {
                const title = $(element).find("p.title a").attr("title");
                const videoUrl = "https://www.xvideos.com" + $(element).find("p.title a").attr("href");
                const duration = $(element).find("span.duration").text().trim();
                const quality = $(element).find("span.video-hd-mark").text().trim();

                results.push({ title, url: videoUrl, duration, quality });
            });

            resolve(results);
        } catch (error) {
            reject(error);
        }
    });
}
