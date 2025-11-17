let cooldowns = {}

let handler = async (m, { conn, text, command }) => {
let users = global.db.data.users
let senderId = m.sender
let user = users[senderId]

let tiempoEspera = 5 * 60

if (cooldowns[m.sender] && Date.now() - cooldowns[m.sender] < tiempoEspera * 1000) {
let tiempoRestante = segundosAHMS(Math.ceil((cooldowns[m.sender] + tiempoEspera * 1000 - Date.now()) / 1000))
m.reply(`${emoji} You've already explored the forest recently.\n⏳ Wait *${tiempoRestante}* before you venture out again.`)
return
}

cooldowns[m.sender] = Date.now()

const eventos = [
{ nombre: '🌲 Treasure under the Sacred Tree', coin: 15000, exp: 120, health: 0, materials: { wood: 10, gem: 1 }, mensaje: `You discovered an ancient chest full of ${m.moneda} and materials!` },
{ nombre: '🐺 Hungry Wolf Attack', coin: -8000, exp: 40, health: -25, materials: null, mensaje: `You were attacked by a pack and escaped, losing valuable ${m.moneda}!` },
{ nombre: '🔮 Encounter with a Sorceress', coin: 8000, exp: 60, health: +10, materials: { gem: 2 }, mensaje: 'A sorceress blessed you with riches, experience, and gems..' },
{ nombre: '☠️ Goblin Death Trap', coin: -12000, exp: 20, health: -30, materials: null, mensaje: 'You fell into a trap and lost almost all your loot..' },
{ nombre: '🏹 Wandering Hunter', coin: 6000, exp: 50, health: 0, materials: { wood: 5 }, mensaje: 'A hunter gave you supplies and wood for helping him.' },
{ nombre: '💎 Gem Vein', coin: 5000, exp: 150, health: 0, materials: { gem: 5, stone: 10 }, mensaje: `You've struck gold!!` },
{ nombre: '🦴 Magic Bones', coin: 4000, exp: 40, health: +5, materials: { orc_bone: 1 }, mensaje: 'Ancient bones shone and granted you fortune.' },
{ nombre: '🕳️ Bottomless pit', coin: -10000, exp: 0, health: -40, materials: null, mensaje: 'You slipped and fell, losing a good part of your loot..' },
{ nombre: '🌿 Forest Healer', coin: 0, exp: 60, health: +30, materials: null, mensaje: 'A mysterious woman healed your wounds with natural magic..' },
{ nombre: '🪙 Street Vendor', coin: 10000, exp: 70, health: 0, materials: null, mensaje: 'You sold collected items and earned some good coins.' },
{ nombre: '🧌 Bridge Troll', coin: -6000, exp: 20, health: -15, materials: { orc_bone: 2 }, mensaje: 'The troll exacted his price... with blows, but he dropped some bones..' },
{ nombre: '🪵 Tranquil Grove', coin: 3000, exp: 40, health: +10, materials: { wood: 15 }, mensaje: 'You rested in a grove and gathered a lot of wood.' },
{ nombre: '🗺️ Map of a Lost Explorer', coin: 17000, exp: 90, health: 0, materials: null, mensaje: 'You found a secret map with a big reward.' },
]

let evento = eventos[Math.floor(Math.random() * eventos.length)]

users[senderId].coin += evento.coin
users[senderId].exp += evento.exp
users[senderId].health += evento.health

let mat_msg = '';
if (evento.materials) {
for (let mat in evento.materials) {
if (!user.materials[mat]) user.materials[mat] = 0;
user.materials[mat] += evento.materials[mat];
mat_msg += `\n│ ✦ Material: +${evento.materials[mat]} ${mat}`;
}
}

let img = 'https://files.catbox.moe/357gtl.jpg'
let info = `╭─「 *🌲 Exploring the Magic Forest* 」─
│ ✦ Mission: *${evento.nombre}*
│ ✦ Event: ${evento.mensaje}
│ ✦ Reward: ${evento.coin >= 0 ? `+¥${evento.coin.toLocaleString()} ${m.moneda}` : `-¥${Math.abs(evento.coin).toLocaleString()} ${m.moneda}`}
│ ✦ Exp: +${evento.exp} XP
│ ✦ Health: ${evento.health >= 0 ? `+${evento.health}` : `-${Math.abs(evento.health)}`} ❤️${mat_msg}
╰─────────────────────────`

await conn.sendFile(m.chat, img, 'exploracion.jpg', info, fkontak)
global.db.write()
}

handler.tags = ['rpg']
handler.help = ['explore']
handler.command = ['explore', 'forest']
handler.register = true
handler.group = true

export default handler

function segundosAHMS(segundos) {
let minutos = Math.floor(segundos / 60)
let segundosRestantes = segundos % 60
return `${minutos} minutes and ${segundosRestantes} seconds`
}