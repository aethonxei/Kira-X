let handler = async (m, { conn, text, args, usedPrefix, command }) => {

if (!args[0]) throw `${emoji} Enter text to start the poll.\n\n>📌 Example : *${usedPrefix + command}* text|text2...`
if (!text.includes('|')) throw  `${emoji2} Separate the poll with *|* \n\n> 📌 Example : *${usedPrefix + command}* text|text2...`
let a = []
let b = text.split('|')
for (let c = 0; c < b.length; c++) {
a.push([b[c]])
                        }
                        return conn.sendPoll(m.chat, `${packname}`, a, m)
}
handler.help = ['survey <text|text2>']
handler.tags = ['grupo'] 
handler.command = ['poll', 'survey'] 
handler.group = true

export default handler