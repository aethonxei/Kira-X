/* Código hecho por I'm Fz `
 - https/Github.com/FzTeis
*/

import axios from 'axios';
import cheerio from 'cheerio';

async function getShortUrl(longUrl) {
    try {
        const response = await axios.get(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`);
        return response.data;
    } catch (error) {
        console.error('Error shortening the link:', error.message);
        return longUrl;
    }
}

async function getAnimeEpisodes(url) {
    try {
        const response = await axios.get(url);
        const html = response.data;
        const $ = cheerio.load(html);

        const script = $('script').filter((i, el) => {
            const text = $(el).text();
            return text.includes('var anime_info') && text.includes('var episodes');
        });

        if (script.length === 0) {
            throw new Error('The script containing the variables was not found..');
        }

        const scriptText = script.html();
        const animeInfoMatch = scriptText.match(/var anime_info = (\[.*?\]);/);
        const episodesMatch = scriptText.match(/var episodes = (\[.*?\]);/);

        if (!animeInfoMatch || !episodesMatch) {
            throw new Error('The variables anime_info or episodes were not found in the script..');
        }

        const animeInfo = JSON.parse(animeInfoMatch[1]);
        const episodes = JSON.parse(episodesMatch[1]);

        const animeId = animeInfo[1];

        const episodeUrls = episodes.reverse().map((episode, index) => ({
            [`Episode ${index + 1}`]: `https://tioanime.com/ver/${animeId}-${episode}`
        }));

        const nextEpisodeElement = $('span.next-episode span');
        const nextEpisode = nextEpisodeElement.text() || 'N/A';

        return {
            proximo_episodio: nextEpisode,
            episodios: episodeUrls
        };
    } catch (error) {
        console.error('Error retrieving episodes:', error.message);
        return { error: `Error processing request: ${error.message}` };
    }
}

let handler = async (m, { conn, command, args, text, usedPrefix }) => {
    if (!args[0]) {
        return conn.reply(m.chat, `${emoji} Please enter the anime link for more information.`, m);
    }

    let data = await getAnimeEpisodes(args[0]);
    if (data.error) {
        return conn.reply(m.chat, data.error, m);
    }

    let messageText = `• List of anime episodes:\n\n`;

    for (const episode of data.episodios) {
        const [key, url] = Object.entries(episode)[0];
        const shortUrl = await getShortUrl(url);
        messageText += `${key}:\n❥ Url: ${shortUrl}\n▬͞▭͞▬͞▭͞▬͞▭͞▬͞▭͞▬͞▭͞▬͞▭͞▬͞▭͞▬͞\n`;
    }

    messageText += `\nNext episode: ${data.proximo_episodio}`;

    await conn.sendMessage(m.chat, { text: messageText }, { quoted: m });
}

handler.help = ['animeinfo', 'animei'];
handler.command = ['animeinfo', 'animei'];
handler.tags = ['descargas'];
handler.premium = true;
handler.register = true;
handler.group = true;

export default handler;