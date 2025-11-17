import fs from 'fs'

async function handler(m, {usedPrefix}) {

const user = m.sender.split('@')[0]
if (fs.existsSync(`./${jadi}/` + user + '/creds.json')) {
let token = Buffer.from(fs.readFileSync(`./${jadi}/` + user + '/creds.json'), 'utf-8').toString('base64')    

await conn.reply(m.chat, `${emoji} The token allows you to log in to other bots; we recommend not sharing it with anyone.\n\n*Your token is:*`, m)
await conn.reply(m.chat, token, m)
} else {
await conn.reply(m.chat, `${emoji2} You don't have any active tokens, use #jadibot to create one.`, m)
}

}
handler.help = ['token']
handler.command = ['token']
handler.tags = ['serbot']
handler.private = true

export default handler 