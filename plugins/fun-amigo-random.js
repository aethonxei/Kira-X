let toM = a => '@' + a.split('@')[0]
function handler(m, { groupMetadata }) {
let ps = groupMetadata.participants.map(v => v.id)
let a = ps.getRandom()
let b
do b = ps.getRandom()
while (b === a)
m.reply(`${emoji} Let's make some friends.\n\n*Oye ${toM(a)} message me privately ${toM(b)} so they can play and become friends 🍎*\n\n*The best friendships begin with a game 😉.*`, null, {
mentions: [a, b]
})}
handler.help = ['friendship']
handler.tags = ['fun']
handler.command = ['friendrandom','friendship']
handler.group = true
handler.register = true

export default handler