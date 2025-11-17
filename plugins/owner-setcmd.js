let handler = async (m, { text, usedPrefix, command }) => {
global.db.data.sticker = global.db.data.sticker || {}
if (!m.quoted) return conn.reply(m.chat, `${emoji} Respond to a sticker to add a command.`, m)
if (!m.quoted.fileSha256) return conn.reply(m.chat, `${emoji} Respond to a sticker to add a command.`, m)
if (!text) return conn.reply(m.chat, `${emoji2} Enter the command name.`, m)
try {
let sticker = global.db.data.sticker
let hash = m.quoted.fileSha256.toString('base64')
if (sticker[hash] && sticker[hash].locked) return conn.reply(m.chat, `${emoji2} You do not have permission to change this Sticker command..`, m)
sticker[hash] = {
text,
mentionedJid: m.mentionedJid,
creator: m.sender,
at: + new Date,
locked: false,
}
await conn.reply(m.chat, `${emoji} Command saved successfully.`, m)
await m.react('✅')
} catch {
await m.react('✖️')
}}
handler.help = ['cmd'].map(v => 'set' + v + ' *<text>*')
handler.tags = ['owner']
handler.command = ['setcmd', 'addcmd', 'cmdadd', 'cmdset']
handler.owner = true

export default handler