/*
《✧》DERECHOS RESERVADOS POR EL AUTOR《✧》
- GabrielVz (@glytglobal)
*/

import fetch from 'node-fetch'

let handler = async (m, { text, usedPrefix, command }) => {

if (!text) return conn.reply(m.chat, `${emoji} Write the scraper's name.\nExample: ${usedPrefix + command} yt-search`, m)

try {

await m.react(rwait)
conn.reply(m.chat, `${emoji2} Looking for the scraper....`, m)

let res = await fetch(`http://registry.npmjs.com/-/v1/search?text=${text}`)
let { objects } = await res.json()

if (!objects.length) return conn.reply(m.chat, `${emoji2} No results were found for: ${text}`, m)

let txt = objects.map(({ package: pkg }) => {
return `《✧》 Scraper  -  Search 《✧》

✦ Name: ${pkg.name}
✦ Version: V${pkg.version}
✦ Link: ${pkg.links.npm}
✦ Description: ${pkg.description}
\n\n----------`
}).join`\n\n`

await conn.reply(m.chat, txt, m, fake)
await m.react(done)
} catch {
await conn.reply(m.chat, `${msm} An error occurred.`, m)
await m.react(error)
}}

handler.help = ['npmjs']
handler.tags = ['buscador']
handler.command = ['npmjs']
handler.register = true
handler.coin = 1

export default handler