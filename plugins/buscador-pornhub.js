//Créditos del código DanielDiod 

import cheerio from 'cheerio';
import axios from 'axios';

let handler = async (m, { conn, args, command, usedPrefix }) => {
  if (!db.data.chats[m.chat].nsfw && m.isGroup) {
    return conn.reply(m.chat, `${emoji} *NSFW* content is disabled in this group.\n> An administrator can activate it with the command » *#nsfw on*`, m);
  } 

  if (!args[0]) {
    return conn.reply(m.chat, `${emoji} Please enter the search you wish to perform on Pornhub.\nExample: ${usedPrefix + command} Mia Khalifa`, m);
  }

  try {
    let searchResults = await searchPornhub(args[0]);
    let teks = searchResults.result.map((v, i) => 
      `「 *P O R N O H U B  - S E A R C H* 」
🎞️ *Title:* ${v.title}
🕒 *Duration:* ${v.duration}
👀 *Views:* ${v.views}
🔗 *Link:* ${v.url}
---------------------------------------------------\n`).join('\n\n');

    if (searchResults.result.length === 0) {
      teks = `${emoji2} No results were found...`;
    }

    conn.reply(m.chat, teks, m);
  } catch (e) {
    return conn.reply(m.chat, `${msm} An error occurred: ${e.message}`, m);
  }
};

handler.tags = ['+18']; 
handler.help = ['pornhubsearch']; 
handler.command = ['phsearch', 'pornhubsearch'];
export default handler;

async function searchPornhub(search) {
  try {
    const response = await axios.get(`https://www.pornhub.com/video/search?search=${search}`);
    const html = response.data;
    const $ = cheerio.load(html);
    const result = [];
    
    $('ul#videoSearchResult > li.pcVideoListItem').each(function(a, b) {
      const _title = $(b).find('a').attr('title');
      const _duration = $(b).find('var.duration').text().trim();
      const _views = $(b).find('var.views').text().trim();
      const _url = 'https://www.pornhub.com' + $(b).find('a').attr('href');
      const hasil = { title: _title, duration: _duration, views: _views, url: _url };
      result.push(hasil);
    });
    
    return { result };
  } catch (error) {
    console.error(`${msm} An error occurred while searching on Pornhub:`, error);
    return { result: [] };
  }
}
