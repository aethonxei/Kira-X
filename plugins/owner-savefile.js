import fs from 'fs'
let handler = async (m, { text, usedPrefix, command }) => {
if (!text) return m.reply(`${emoji} Enter the path and file name next to the command.`)
try {
if (!m.quoted.text) return m.reply(`${emoji2} Reply to the message.`)
let path = `${text}.js`
await fs.writeFileSync(path, m.quoted.text)
m.reply(`${emoji} Saved in *${path}*.`)
} catch {
await m.reply(`Reply to the message.`)
}}
handler.tags = ['owner']
handler.help = ["savefile <route/name>"]
handler.command = ["savefile", "savejs", "savecmd"]
handler.rowner = true

export default handler