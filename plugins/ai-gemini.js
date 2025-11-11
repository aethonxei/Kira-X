import fetch from 'node-fetch'

var handler = async (m, { text, usedPrefix, command, conn }) => {
if (!text) return conn.reply(m.chat, `(｡•ᴗ•) ᥱᥒ𝗍ᥱr ᥲ 𝗍ᥱx𝗍 ᥒᥱx𝗍 𝗍᥆ 𝗍hᥱ ᥴ᥆m᥆mᥲᥒd ⍴ᥲr𝗍 𝗌᥆ 𝗍hᥲ𝗍 gᥱ́mіᥒіs ᥴᥲᥒ rᥱs⍴᥆ᥒd 𝗍᥆ 𝗂𝗍`, m)

try {
await m.react('🕒')
conn.sendPresenceUpdate('composing', m.chat)

var apii = await fetch(`https://ruby-core.vercel.app/api/ai/geminis?text=${encodeURIComponent(text)}`)
var res = await apii.json()

if (!res.status || !res.result || !res.result.response) {
return conn.reply(m.chat, `❌ Gemini was unable to get an answer for "${text}".`, m)
}

await m.reply(`${res.result.response}`)
} catch (e) {
await m.react('❌')
await conn.reply(m.chat, `⚠︎ Gemini cannot answer that question.\n\nError: ${e}`, m)
}
}

handler.command = ['gemini']
handler.help = ['gemini <text>']
handler.tags = ['ai']
handler.group = true
handler.rowner = true

export default handler
