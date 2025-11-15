var handler = async (m, { conn, text, usedPrefix, command }) => {

if (!text) return conn.reply(m.chat, `${emoji} Please enter your question text.`, m)

await m.react('❔')
await delay(1000 * 1)
await m.react('❓')
await delay(1000 * 1)
await m.react('❔')
await delay(1000 * 1)

await conn.reply(m.chat, + dev + `\n\n•*Ask:* ` + text + `\n• *Answer:* ` + res, m)

}
handler.help = ['ask']
handler.tags = ['fun']
handler.command = ['ask','questions']
handler.group = true
handler.register = true

export default handler

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

let res = ['Yes', 'Maybe', 'Possibly', 'Probably not', 'No', 'Impossible', 'Why are you asking these questions', 'Thats why Im leaving you', 'Why do you want to know', 'I wont tell you the answer'].getRandom()