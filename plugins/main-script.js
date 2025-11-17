import moment from 'moment-timezone'
import fetch from 'node-fetch'

let handler = async (m, { conn, args }) => {
try {
let res = await fetch('https://api.github.com/repos/aethonxei/Kira-X')

if (!res.ok) throw new Error('Error retrieving data from repository')
let json = await res.json()

let txt = `*乂  S C R I P T  -  M A I N  乂*\n\n`
txt += `✩  *Name* : ${json.name}\n`
txt += `✩  *Visits* : ${json.watchers_count}\n`
txt += `✩  *Size* : ${(json.size / 1024).toFixed(2)} MB\n`
txt += `✩  *Updated* : ${moment(json.updated_at).format('DD/MM/YY - HH:mm:ss')}\n`
txt += `✩  *Url* : ${json.html_url}\n`
txt += `✩  *Forks* : ${json.forks_count}\n`
txt += `✩  *Stars* : ${json.stargazers_count}\n\n`
txt += `> *${dev}*`

await conn.sendMessage(m.chat, {text: txt, contextInfo: { forwardingScore: 999, isForwarded: true, forwardedNewsletterMessageInfo: { newsletterName: channelRD.name, newsletterJid: channelRD.id, }, externalAdReply: { title: packname, body: dev, thumbnailUrl: 'https://files.catbox.moe/gegwez.jpg', sourceUrl: redes, mediaType: 1, renderLargerThumbnail: true }}}, {quoted: m})

} catch {
await conn.reply(m.chat, `${msm} An error occurred.`, m)
await m.react(error)
}}

handler.help = ['script']
handler.tags = ['main']
handler.command = ['script', 'sc']
handler.register = true

export default handler