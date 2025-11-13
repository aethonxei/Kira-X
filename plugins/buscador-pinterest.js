import axios from 'axios'

let handler = async (m, { conn, text, usedPrefix }) => {
if (!text) return m.reply(`(*∩_∩*) Please enter what you want to search for or what you’re interested in. 🌸`)

try {
await m.react('🕒')

const res = await axios.get(`https://ruby-core.vercel.app/api/search/pinterest?q=${encodeURIComponent(text)}`)
const data = res.data

if (!data.status || !data.results || data.results.length === 0) {
return conn.reply(m.chat, `❀ ✧ No results were found for «${text}» ❧ ❀`, m)
}

const medias = data.results.slice(0, 10).map(img => ({
type: 'image',
data: { url: img.image_large_url, title: img.title }
}))

for (let i = 0; i < medias.length; i++) {
await conn.sendMessage(m.chat, {
image: { url: medias[i].data.url },
caption: i === 0
? `(*ˊᗜˋ*) pinterest ᥊ search\n\n✧ 📌 𝗍𝗂𝗍𝗅𝖾 » «${text}»\n✐ 💎 𝗋𝖾𝗌𝗎𝗅𝗍𝗌 » ${medias.length} 𝗂𝗆𝖺𝗀𝖾𝗌 𝖿𝗈𝗎𝗇𝖽`
: `✧ ${medias[i].data.title || 'Untitled'}`
}, { quoted: m })
}

await m.react('✔️')
} catch (e) {
await m.react('✖️')
conn.reply(m.chat, `⚠︎ ❀ An error has occurred ❀\n> Use *${usedPrefix}report* to inform him.\n\n${e}`, m)
}
}

handler.help = ['pinterest <texto>']
handler.command = ['pinterest', 'pin']
handler.tags = ["descargas"]
handler.group = true

export default handler
