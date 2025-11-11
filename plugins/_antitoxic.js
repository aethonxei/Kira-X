const toxicRegex = /gore|bloody|gruesome|kill|murder|rape|rapist|abuse|suicide|selfharm|
bitch|slut|whore|prostitute|hooker|hoe|thot|fuck|fucker|fucking|motherfucker|
shit|bullshit|crap|damn|goddamn|asshole|dumbass|jackass|jerk|idiot|moron|stupid|
retard|retarded|loser|dumb|ugly|fatass|fat|skinny|uglyass|pig|cow|
pussy|cunt|cock|dick|penis|balls|nuts|tits|boobs|boobies|vagina|pussyhole|
cum|semen|sperm|ejaculate|orgasm|masturbate|jerkoff|handjob|blowjob|suckdick|
suckmydick|suck|suckit|sucker|choke|deepthroat|
gay|fag|faggot|lesbian|tranny|queer|homo|
bastard|sonofabitch|sonofa|pieceofshit|
hell|screw|screwyou|kill|die|dieyourself|dropdead|
drug|drugs|weed|cocaine|heroin|meth|crack|pill|overdose|
pervert|perverted|sex|sexual|porn|porno|pornhub|nude|nudes|
stfu|gtfo|fml|wtf|omfg|
idiot|stupid|fool|imbecile|jerk|weirdo|
dirty|gross|disgusting|trash|garbage|filthy|
broke|useless|failure|pathetic|
coward|chicken|scaredycat|crybaby|
lazy|loser|worthless|nobody|/i

let handler = m => m
handler.before = async function (m, { conn, isAdmin, isBotAdmin, isOwner }) { 
if (m.isBaileys && m.fromMe)
return !0
if (!m.isGroup)
return !1
  let user = global.db.data.users[m.sender]
  let chat = global.db.data.chats[m.chat]
  let bot = global.db.data.settings[this.user.jid] || {}
  let img = 'https://qu.ax/XAWON.jpg'
 const isToxic = toxicRegex.exec(m.text)

if (isToxic && chat.antiToxic && !isOwner && !isAdmin) {
user.warn += 1
if (!(user.warn >= 3)) await m.reply(`${user.warn == 1 ? `*@${m.sender.split`@`[0]}*` : `*@${m.sender.split`@`[0]}*`}, Have: (${isToxic}) warnings... you have: *${user.warn}/3*\n\nof warnings.`, false, { mentions: [m.sender] })}

if (user.warn >= 3) {
user.warn = 0
await m.reply(`'𝙎𝙚𝙧𝙖𝙨 𝙚𝙡𝙞𝙢𝙞𝙣𝙖𝙙𝙤  \n*@${m.sender.split`@`[0]}*`, false, { mentions: [m.sender] })
user.banned = true
await this.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
//await this.updateBlockStatus(m.sender, 'block')
}
return !1
}
export default handler