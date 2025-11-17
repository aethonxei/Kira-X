import pkg from '@whiskeysockets/baileys'
import fs from 'fs'
import fetch from 'node-fetch'
import axios from 'axios'
import moment from 'moment-timezone'
const { generateWAMessageFromContent, prepareWAMessageMedia, proto } = pkg

var handler = m => m

handler.all = async function (m) {

global.getBuffer = async function getBuffer(url, options) {
  try {
    options ? options : {}
    var res = await axios({
      method: "get",
      url,
      headers: {
        'DNT': 1,
        'User-Agent': 'GoogleBot',
        'Upgrade-Insecure-Request': 1
      },
      ...options,
      responseType: 'arraybuffer'
    })
    return res.data
  } catch (e) {
    console.log(`Error : ${e}`)
  }
}

// List of icons
const iconUrls = [
  "https://files.catbox.moe/gyzo3k.jpg", "https://files.catbox.moe/ldst8t.jpg",
"https://files.catbox.moe/syveyk.jpg", "https://files.catbox.moe/ig9yor.jpg",
"https://files.catbox.moe/g5ra10.jpg", "https://files.catbox.moe/yda728.jpg",
"https://files.catbox.moe/0gcj61.jpg", "https://files.catbox.moe/ps353p.jpg",
"https://files.catbox.moe/ziokg0.jpg", "https://files.catbox.moe/ysk425.jpg",
"https://files.catbox.moe/3rzlik.jpg", "https://files.catbox.moe/orv87x.jpg",
"https://files.catbox.moe/lbm3ck.jpg", "https://files.catbox.moe/28ywmu.jpg",
"https://files.catbox.moe/6kspzo.jpg", "https://files.catbox.moe/ob7s2b.jpg",
"https://files.catbox.moe/ktuqxw.jpg", "https://files.catbox.moe/oln714.jpg",
"https://files.catbox.moe/al4hrv.jpg", "https://files.catbox.moe/90q5et.jpg",
"https://files.catbox.moe/f5ju8r.jpg", "https://files.catbox.moe/jojtgm.jpg",
"https://files.catbox.moe/0gcj61.jpg", "https://files.catbox.moe/g7xqk0.jpg",
"https://files.catbox.moe/xbrbn9.jpg", "https://files.catbox.moe/ohotst.jpg",
"https://files.catbox.moe/xbtpc0.jpg", "https://files.catbox.moe/h04t1m.jpg",
"https://files.catbox.moe/6kspzo.jpg", "https://files.catbox.moe/9y2iyf.jpg",
"https://files.catbox.moe/1xeebm.jpg"
]

// Function to choose and download a random icon
function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}

const iconUrl = pickRandom(iconUrls)
global.icono = await getBuffer(iconUrl)

global.fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }

//creador y otros
global.creador = 'Wa.me/212605158422'
global.ofcbot = `${conn.user.jid.split('@')[0]}`
global.asistencia = 'Wa.me/212605158422'
global.namechannel = '⏤͟͞ू⃪፝͜⁞⟡『 𝐓͢ᴇ𝙖፝ᴍ⃨ 𝘾𝒉꯭𝐚𝑛𝑛𝒆𝑙: 𝑲𝒊𝒓𝒂-𝑿 』࿐⟡'
global.namechannel2 = '⟡『 𝐓𝐞𝐚𝐦 𝐂𝐡𝐚𝐧𝐧𝐞𝐥: 𝑲𝒊𝒓𝒂-𝑿 』⟡'
global.namegrupo = '⏤͟͞ू⃪ 𝑲𝒊𝒓𝒂-𝑿 ⌬⃝𓆩⚘𓆪 𝑺𝒖𝒑𝒑𝒐𝒓𝒕'
global.namecomu = '⏤͟͞ू⃪ 𝑲𝒊𝒓𝒂-𝑿 ✦⃝𖤐 𝑪𝒐𝒎𝒎𝒖𝒏𝒊𝒕𝒚'
global.listo = '🍎 *Here you go ฅ^•ﻌ•^ฅ*'
global.fotoperfil = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://files.catbox.moe/mq2yh8.jpg')

//Ids channel
global.canalIdM = ["120363420610572685@newsletter", "120363420610572685@newsletter"]
global.canalNombreM = ["⏤͟͞ू⃪፝͜⁞⟡『 𝐓͢ᴇ𝙖፝ᴍ⃨ 𝘾𝒉꯭𝐚𝑛𝑛𝒆𝑙: 𝑲𝒊𝒓𝒂-𝑿 』࿐⟡", "⟡『 𝐓𝐞𝐚𝐦 𝐂𝐡𝐚𝐧𝐧𝐞𝐥: 𝑲𝒊𝒓𝒂-𝑿 』⟡"]
global.channelRD = await getRandomChannel()

//fechas
global.d = new Date(new Date + 3600000)
global.locale = 'en'
global.dia = d.toLocaleDateString(locale, {weekday: 'long'})
global.fecha = d.toLocaleDateString('en', {day: 'numeric', month: 'numeric', year: 'numeric'})
global.mes = d.toLocaleDateString('en', {month: 'long'})
global.año = d.toLocaleDateString('en', {year: 'numeric'})
global.tiempo = d.toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true})

//Commando Reactions
global.rwait = '🕒'
global.done = '✔️'
global.error = '✖️'
global.msm = '⚠️︎'

//Kira-X-Bot Emojis
global.emoji = '🍎'
global.emoji2 = '⚰️'
global.emoji3 = '❄️'
global.emoji4 = '🪽'
global.emoji5 = '📓'
global.emojis = [emoji, emoji2, emoji3, emoji4].getRandom()

//Wait
global.wait = '⚘𖠵⃕❖𖥔 𝑳𝒐𝒂𝒅𝒊𝒏𝒈...ꪶꪾ❍̵̤̂ꫂ\n❝ 𝑊𝑎𝑖𝑡 𝑎 𝑚𝑜𝑚𝑒𝑛𝑡.. ❞';

//Links
var canal = 'https://whatsapp.com/channel/0029VbBQ1kG8PgsPtLAabC23'
let canal2 = 'https://whatsapp.com/channel/0029VbBQ1kG8PgsPtLAabC23'
var git = 'https://github.com/aethonxei'
var github = 'https://github.com/aethonxei/Kira-X' 
let correo = 'aethonxei@gmail.com'
global.redes = [canal, canal2, git, github, correo].getRandom()

//Random image
let category = "imagen"
const db = './src/database/db.json'
const db_ = JSON.parse(fs.readFileSync(db))
const random = Math.floor(Math.random() * db_.links[category].length)
const randomlink = db_.links[category][random]
const response = await fetch(randomlink)
const rimg = await response.buffer()
global.icons = rimg

// Greetings per hour
var ase = new Date(); var hour = ase.getHours();
switch(hour){
  case 0: case 1: case 2: hour = 'Good Night 🌃'; break;
  case 3: case 4: case 5: case 6: case 8: case 9: hour = 'Good Early Morning 🌄'; break;
  case 7: hour = 'Good Morning 🌅'; break;
  case 10: case 11: case 12: case 13: hour = 'Have a great day 🌤'; break;
  case 14: case 15: case 16: case 17: hour = 'Good Afternoon 🌆'; break;
  default: hour = 'Good Night 🌃'
}
global.saludo = hour

//tags
global.nombre = m.pushName || 'Anonymous'
global.taguser = '@' + m.sender.split("@")[0]
var more = String.fromCharCode(8206)
global.readMore = more.repeat(850)

global.packsticker = `°.⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸.°\nᰔᩚ User: ${nombre}\n❀ Bot: ${botname}\n✦ Date: ${fecha}\nⴵ Hour: ${tiempo}`;

// rcanaɭ with icon as buffer
global.rcanal = {
  contextInfo: {
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: channelRD.id,
      serverMessageId: 100,
      newsletterName: channelRD.name,
    },
    externalAdReply: {
      showAdAttribution: true,
      title: botname,
      body: dev,
      mediaUrl: null,
      description: null,
      previewType: "PHOTO",
      thumbnail: global.icono,
      sourceUrl: global.redes,
      mediaType: 1,
      renderLargerThumbnail: false
    },
  }
}

}

export default handler

async function getRandomChannel() {
  let randomIndex = Math.floor(Math.random() * canalIdM.length)
  let id = canalIdM[randomIndex]
  let name = canalNombreM[randomIndex]
  return { id, name }
}