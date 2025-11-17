import { tmpdir } from 'os'
import path from 'path'
import {
  readdirSync,
  statSync,
  unlinkSync,
  existsSync,
  readFileSync,
  watch
} from 'fs'

let handler = async (m, { conn, usedPrefix: _p, __dirname, args, text }) => {
    if (!text) return conn.reply(m.chat, `${emoji} Enter the path and name of the file you want to delete.`, m)
    
    const file = text.trim()
    if (!existsSync(file)) return conn.reply(m.chat, `${emoji2} File not found.`, m)
    
    unlinkSync(file)
    conn.reply(m.chat, `${done} The file *${file}* has been successfully removed.`, m)
}
handler.tags = ['owner']
handler.help = ['deletefile']
handler.command = ['deletefile']
handler.rowner = true

export default handler