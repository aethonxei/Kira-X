import fs from 'fs'

let handler = async (m, { conn, text, usedPrefix, command }) => {
await m.reply(`${emoji} Sending database of ${packname}...`)
try {
await m.react(rwait)
let d = new Date
let date = d.toLocaleDateString('en', { day: 'numeric', month: 'long', year: 'numeric' })
let database = await fs.readFileSync(`./src/database/database.json`)
let creds = await fs.readFileSync(`./RubySessions/creds.json`)
await conn.reply(m.chat, `*• Date:* ${date}`, m)
await conn.sendMessage(m.sender, {document: database, mimetype: 'application/json', fileName: `database.json`}, { quoted: fkontak })
await m.react(done)
await conn.sendMessage(m.sender, {document: creds, mimetype: 'application/json', fileName: `creds.json`}, { quoted: fkontak })
await m.react(done)
} catch {
await m.react(error)
conn.reply(m.chat, `${msm} An error occurred.`, m)}}

handler.help = ['copia']
handler.tags = ['owner']
handler.command = ['backup', 'respaldo', 'copia']
handler.rowner = true

export default handler
