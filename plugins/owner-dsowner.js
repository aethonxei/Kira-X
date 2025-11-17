/* Codigo hecho por @Fabri115 y mejorado por BrunoSobrino */

import { readdirSync, unlinkSync, existsSync, promises as fs, rmSync } from 'fs'
import path from 'path'

var handler = async (m, { conn, usedPrefix }) => {

if (global.conn.user.jid !== conn.user.jid) {
return conn.reply(m.chat, `${emoji} Use this command directly on the Bot's main number..`, m)
}
await conn.reply(m.chat, `${emoji2} Starting process of deleting all session files, except the creds.json file..`, m)
m.react(rwait)

let sessionPath = `./${Rubysessions}/`

try {

if (!existsSync(sessionPath)) {
return await conn.reply(m.chat, `${emoji} The folder is empty.`, m)
}
let files = await fs.readdir(sessionPath)
let filesDeleted = 0
for (const file of files) {
if (file !== 'creds.json') {
await fs.unlink(path.join(sessionPath, file))
filesDeleted++;
}
}
if (filesDeleted === 0) {
await conn.reply(m.chat, `${emoji2} The folder is empty.`, m)
} else {
m.react(done)
await conn.reply(m.chat, `${emoji} Removed ${filesDeleted} session files, except for the creds.json file.`, m)
conn.reply(m.chat, `${emoji} *Hello! Can you see me?*`, m)

}
} catch (err) {
console.error('Error reading session folder or files:', err);
await conn.reply(m.chat, `${msm} A failure occurred.`, m)
}

}
handler.help = ['dsowner']
handler.tags = ['owner']
handler.command = ['delai', 'dsowner', 'clearallsession']
handler.rowner = true;

export default handler
