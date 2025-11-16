import { readdirSync, unlinkSync, existsSync, promises as fs, rmSync } from 'fs'
import path from 'path'

var handler = async (m, { conn, usedPrefix }) => {

if (global.conn.user.jid !== conn.user.jid) {
return conn.reply(m.chat, `${emoji} Use this command directly on the Bot's main number.`, m)
}

let chatId = m.isGroup ? [m.chat, m.sender] : [m.sender]
let sessionPath = `./${Rubysessions}/`

try {

let files = await fs.readdir(sessionPath)
let filesDeleted = 0
for (let file of files) {
for (let id of chatId) {
if (file.includes(id.split('@')[0])) {
await fs.unlink(path.join(sessionPath, file))
filesDeleted++;
break
}}}

if (filesDeleted === 0) {
await conn.reply(m.chat, `${emoji} No file was found that includes the chat ID.`, m)
} else {
await conn.reply(m.chat, `${emoji} Removed ${filesDeleted} session files.`, m)
conn.reply(m.chat, `${emoji} Hello! Can you see me?`, m)
}
} catch (err) {
console.error('Error reading session folder or files:', err)
await conn.reply(m.chat, `${emoji} Hello, I'm ${botname} Follow the channel and support us please.\n\n> ${channel}`, m)
}

}
handler.help = ['ds', 'fixmsgespera']
handler.tags = ['info']
handler.command = ['fixmsgespera', 'ds']
handler.register = true

export default handler