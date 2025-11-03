import { watchFile, unwatchFile } from 'fs' 
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import fs from 'fs'
import cheerio from 'cheerio'
import fetch from 'node-fetch'
import axios from 'axios'
import moment from 'moment-timezone' 

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

//BETA: If you wish to avoid typing the number that will be in the console, add the following:

// The only application for option 2 (contains a robot with an 8-digit text)
global.botNumber = '' //Example: 212605158422

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.owner = [
// <-- @s.whatsapp.net - Number -->
  ['212605158422', '⏤͟͞ू⃪ ፝͜⁞𝙖𝙚𝙩𝙝𝙤𝙣𝙭𝙚𝙞 ⌗⚙️࿐-ˢᵃˡⁱᵐ ִֶ ࣪˖ ִֶָ𖠌་༘', true],

// <-- @lid - Number -->
  ['200141197844495', 'Salim', true],
];

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.mods = []
global.suittag = ['212605158422']
global.prems = []

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.libreria = 'Baileys'
global.baileys = 'V 6.7.16' 
global.languaje = 'English'
global.vs = '2.2.0'
global.nameqr = 'Kira-X'
global.namebot = '꒰ 🍎 ꒱ؘ 𝙆𝙞𝙧𝙖-𝙓 ❄︎ ࿐ ࿔*:･ﾟ'
global.Rubysessions = 'KiraSessions'
global.jadi = 'KiraJadiBots' 
global.RubyJadibts = true

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.packname = '⏤̛̣̣̣̣̣̣̣̣̣̣̣͟͟͞͞⏤͟͟͞͞K̶i̶r̶a̶ 🂱'
global.botname = '🍎༆ ࣭𝖪𝗂𝗋𝖺-𝖷༆ ࣪ ❄︎'
global.wm = '‧˚꒰🍷꒱ ፝͜⁞𝘠𝘢𝘨𝘢𝘮𝘪 𝘓𝘪𝘨𝘩𝘵 ፝͜⁞ 𖤍'
global.author = 'Made By 𐔌𝖠𝖾𝗍𝗁𝗈𝗇 𝖷𝖾𝗂 ͡꒱ ۫'
global.dev = '⌬ 𝖬𝖺𝖽𝖾 𝖻𝗒: 𝖺𝖾𝗍𝗁𝗈𝗇𝗑𝖾𝗂 ⚙️💻 '
global.textbot = '⏤͟͞ू⃪ 𝒀𝒂𝒈𝒂𝒎𝒊-𝑳𝒊𝒈𝒉𝒕 𖤐 • 𝗣𝗼𝘄𝗲𝗿𝗲𝗱 𝗕𝘆 ᵃᵉᵗʰᵒⁿ´ˣᵉⁱ' 
global.etiqueta = 'ˑ 𓈒 𐔌 Ă̈ĕ̈t̆̈h̆̈ŏ̈n̆̈X̆̈ĕ̈ĭ̈ ͡꒱ ۫'

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.moneda = 'Zenis'
global.banner = 'https://files.catbox.moe/b93cts.jpg'
global.avatar = 'https://qu.ax/RYjEw.jpeg'

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.gp1 = 'https://chat.whatsapp.com/Hgl5fQI7UhtEj6Cr6Rpo5w?mode=ac_t'
global.comunidad1 = 'https://chat.whatsapp.com/K2CPrOTksiA36SW6k41yuR'
global.channel = 'https://whatsapp.com/channel/0029VbBQ1kG8PgsPtLAabC23'
global.channel2 = 'https://whatsapp.com/channel/0029VbBQ1kG8PgsPtLAabC23'
global.md = 'https://github.com/aethonxei/Kira-X'
global.correo = 'aethonxei@gmail.com'
global.cn ='https://whatsapp.com/channel/0029VbBQ1kG8PgsPtLAabC23';

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.catalogo = fs.readFileSync('./src/catalogo.jpg');
global.estilo = { key: {  fromMe: false, participant: `0@s.whatsapp.net`, ...(false ? { remoteJid: "5219992095479-1625305606@g.us" } : {}) }, message: { orderMessage: { itemCount : -999999, status: 1, surface : 1, message: packname, orderTitle: 'Bang', thumbnail: catalogo, sellerJid: '0@s.whatsapp.net'}}}
global.ch = {
ch1: '120363420610572685@newsletter',
}

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'settings.js'"))
  import(`${file}?update=${Date.now()}`)
})
