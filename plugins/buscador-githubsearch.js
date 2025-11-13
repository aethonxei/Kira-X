// 𝗚𝗶𝘁𝗵𝘂𝗯 𝗦𝗲𝗮𝗿𝗰𝗵

import fetch from 'node-fetch';

let handler = async(m, { conn, text, usedPrefix, command }) => {

if (!text) return conn.reply(m.chat, `${emoji} Please enter a GitHub repository name.`, m);

try {
let api = `https://dark-core-api.vercel.app/api/search/github?key=api&text=${text}`;

let response = await fetch(api);
let json = await response.json();
let result = json.results[0];

let txt = `🍎 *Name:* ${result.name}\n👑 *Owner:* ${result.creator}\n🌟 *Stars:* ${result.stars}\n🔖 *Forks:* ${result.forks}\n📜 *Description:* ${result.description}\n📆 *Created:* ${result.createdAt}\n🔗 *Link:* ${result.cloneUrl}`;

let img = 'https://files.catbox.moe/oc4myc.png';

conn.sendMessage(m.chat, { image: { url: img }, caption: txt }, { quoted: fkontak });

} catch (error) {
console.error(error)
m.reply(`Error: ${error.message}`);
m.react('✖️');
 }
};

handler.command = ['githubsearch', 'gbsearch'];

export default handler;