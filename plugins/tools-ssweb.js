import fetch from 'node-fetch'

let handler = async (m, { conn, command, args }) => {
if (!args[0]) return conn.reply(m.chat, `${emoji} Please enter a page link.`, m)
try {
await m.react(rwait)
conn.reply(m.chat, `${emoji2} Looking for your information....`, m)
let ss = await (await fetch(`https://image.thum.io/get/fullpage/${args[0]}`)).buffer()
conn.sendFile(m.chat, ss, 'error.png', args[0], fkontak)
await m.react(done)
} catch {
return conn.reply(m.chat, `${msm} An error occurred.`, m)
await m.react(error)}}

handler.help = ['ssweb', 'ss']
handler.tags = ['tools']
handler.command = ['ssweb', 'ss']

export default handler
