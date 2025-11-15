import fetch from 'node-fetch';

let handler = async (m, { conn, text }) => {
if (!text) return conn.reply(m.chat, `${emoji} Please enter the name of the Pokémon you want to search for..`, m)
await m.react(rwait)
conn.reply(m.chat, `${emoji2} Searching *<${text}>*, Wait a moment...`, m)
const url = `https://some-random-api.com/pokemon/pokedex?pokemon=${encodeURIComponent(text)}`;
const response = await fetch(url);
const json = await response.json();
if (!response.ok) {
await m.react(error)
return conn.reply(m.chat, '⚠️ An error occurred while searching for the Pokemon.', m)}
const aipokedex = `${emoji} *Pokedex - Information on ${json.name}*\n\n☁️ *Name:* ${json.name}\n🔖 *ID:* ${json.id}\n💬 *Type:* ${json.type}\n💪 *Skills:* ${json.abilities}\n🎴 *Size:* ${json.height}\n⚖️ *Weight:* ${json.weight}\n\n📖 *Description:*\n${json.description}\n\n🔍 Find out more details about this Pokémon in the Pokedex!\n\n🔗 https://www.pokemon.com/us/pokedex/${json.name.toLowerCase()}`
conn.reply(m.chat, aipokedex, m)
await m.react(done) }

handler.help = ['pokedex *<pokemon>*']
handler.tags = ['fun']
handler.group = true;
handler.register = true
handler.command = ['pokedex']

export default handler