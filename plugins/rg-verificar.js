import db from '../lib/database.js'
import fs from 'fs'
import PhoneNumber from 'awesome-phonenumber'
import { createHash } from 'crypto'  
import fetch from 'node-fetch'

let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i

let handler = async function (m, { conn, text, usedPrefix, command }) {
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let mentionedJid = [who]
let pp = await conn.profilePictureUrl(who, 'image').catch((_) => 'https://files.catbox.moe/mq2yh8.jpg')
let user = global.db.data.users[m.sender]
let name2 = conn.getName(m.sender)

if (user.registered === true) 
return m.reply(`『✦』You are already registered.\n\n*Do you want to register again??*\n\nUse this command to delete your registry entry:\n*${usedPrefix}unreg*`)

if (!Reg.test(text)) 
return m.reply(`『✦』Incorrect format.\n\nUse: *${usedPrefix + command} name.age*\nExample: *${usedPrefix + command} ${name2}.20*`)

let [_, name, splitter, age] = text.match(Reg)
if (!name) return m.reply(`『✦』The name cannot be empty..`)
if (!age) return m.reply(`『✦』Age cannot be empty.`)
if (name.length >= 100) return m.reply(`『✦』The name is too long.`)

age = parseInt(age)
if (age > 1000) return m.reply(`『✦』Wow, grandpa wants to play with the bot.`)
if (age < 5) return m.reply(`『✦』There's a baby trying to use the bot lol.`)

user.name = name + '✓'.trim()
user.age = age
user.regTime = + new Date      
user.registered = true

let recompensa = {
money: 40,
estrellas: 10,
exp: 300,
joincount: 20
}
user.coin += recompensa.money
user.exp += recompensa.exp
user.joincount += recompensa.joincount

if (global.db && global.db.write) {
await global.db.write()
}

let sn = createHash('md5').update(m.sender).digest('hex').slice(0, 20)

let regbot = `
꒰͡ ׄ𖹭⃨᤻ ͡꒱ֽ𖹭⃨᤻ ͡꒱ֽ ׄ  𝙎𝙐𝘾𝘾𝙀𝙎𝙎𝙁𝙐𝙇 𝙍𝙀𝙂𝙄𝙎𝙏𝙍𝘼𝙏𝙄𝙊𝙉! ꒰͡ ׄ𖹭⃨᤻ ͡꒱ֽ𖹭⃨᤻ ͡꒱ֽ ׄ
         ◟︶࿙𝆊࿚ׁׁׂׂׂׂׂ𝆊࣪࣪࿙࿚ׂ︶◞ 𖣁  ◟︶࿙𝆊࿚ׁׁׂׂׂׂׂ𝆊࣪࣪࿙࿚ׂ︶◞

╭─┄• ⋆˚ᨶ႒ᩚ U̶s̶e̶r̶ D̶a̶t̶a̶ ᨶ႒ᩚ
│✐ *𝑵𝑨𝑴𝑬:* ${name} 
│✐ *𝑨𝑮𝑬:* ${age} years old
╰─┄•·.·꒷︶꒷꒥꒷‧₊˚૮꒰˵•ᵜ•˵꒱ა‧₊˚꒷︶꒷꒥꒷·.·
 
 ·˚ ༘₊· ͟͟͞͞꒰➳ ࣪ ˖ ࣪ R̸ec̸o̸m̸m̸e̸n̸d̸a̸t̸i̸o̸n̸s̸̸! ᰔ ִ ׄ
> ❛  💵 ── *Money:* +${recompensa.money}
> ❛  🌟 ── *Stars:* +${recompensa.estrellas}
> ❛  📈 ── *EXP:* +${recompensa.exp}
> ❛  🎟️ ── *Tokens:* +${recompensa.joincount}

> Thanks for joining! Now you're ready to shine!.  
> Use *${usedPrefix}menu* to discover all my commands.
`.trim()

await m.react('📩')

await conn.sendMessage(m.chat, {
text: regbot,
contextInfo: {
externalAdReply: {
title: '❑ 𝙑𝙀𝙍𝙄𝙁𝙄𝘾𝘼𝙏𝙄𝙊𝙉 ✅',
body: 'Registration completed',
thumbnailUrl: pp,
mediaType: 1,
renderLargerThumbnail: true
}
}
}, { quoted: m })
}; 

handler.help = ['reg']
handler.tags = ['rg']
handler.command = ['verify', 'verificar', 'reg', 'register', 'registrar'] 

export default handler