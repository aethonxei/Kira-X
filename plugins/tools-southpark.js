//li7wak

import fetch from 'node-fetch';

let handler = async(m, { conn, text, usedPrefix, command }) => {

if (!text) return m.reply(m.chat, `${emoji} Please enter the name of a country.`, m);

try {
let api = `https://delirius-apiofc.vercel.app/tools/flaginfo?query=${text}`;

let response = await fetch(api);
let json = await response.json();
let datas = json.data;

let park = `🍭 *Information from:* ${text}\n\n🍬 *Official Name:* ${datas.officialName}\n🍰 *Organization:* ${datas.memberOf}\n🔖 *Capital:* ${datas.capitalCity}\n🗺️ *Continent:* ${datas.continent}\n👥 *Population:* ${datas.population}\n💬 *Prefix:* ${datas.callingCode}\n💸 *Currency:* ${datas.currency}\n📜 *Description:* ${datas.description}`;

let img = datas.image;

conn.sendMessage(m.chat, { image: { url: img }, caption: park }, { quoted: fkontak });

} catch (e) {
m.reply(`${msm} An error occurred: ${e.message}`);
m.react('✖️');
  }
};

handler.command = ['paisinfo', 'flag'];

export default handler;
