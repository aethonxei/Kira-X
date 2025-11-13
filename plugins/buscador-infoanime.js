import fetch from 'node-fetch'

var handler = async (m, { conn, usedPrefix, command, text }) => {

if (!text) return conn.reply(m.chat, `${emoji} Enter the name of an anime\n\n> Example, ${usedPrefix + command} Roshidere`, m)
let res = await fetch('https://api.jikan.moe/v4/manga?q=' + text)
if (!res.ok) return conn.reply(m.chat, `${msm} A failure occurred.`, m)

let json = await res.json()
let { chapters, title_japanese, url, type, score, members, background, status, volumes, synopsis, favorites } = json.data[0]
let author = json.data[0].authors[0].name
let animeingfo = `✨ Title: ${title_japanese}
🎞️ Chapters: ${chapters}
💫 Type: ${type}
🗂 Status: ${status}
🗃 Volumes: ${volumes}
🌟 Favorites: ${favorites}
🧮 Score: ${score}
👥 Members: ${members}
🔗 Url: ${url}
👨‍🔬 Author: ${author}
📝 Background: ${background}
💬 Synopsis: ${synopsis}
 ` 
conn.sendFile(m.chat, json.data[0].images.jpg.image_url, 'anjime.jpg', '✨ * A N I M E - I N F O* ✨\n\n' + animeingfo, fkontak, m)

} 
handler.help = ['infoanime'] 
handler.tags = ['anime'] 
handler.group = true;
handler.register = true
handler.command = ['infoanime','animeinfo'] 

export default handler