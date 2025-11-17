let cooldowns = {};

let handler = async (m, { conn, usedPrefix, command }) => {
  let users = global.db.data.users;
  let senderId = m.sender;

  let tiempoEspera = 8 * 60;

  if (cooldowns[m.sender] && Date.now() - cooldowns[m.sender] < tiempoEspera * 1000) {
    let tiempoRestante = segundosAHMS(Math.ceil((cooldowns[m.sender] + tiempoEspera * 1000 - Date.now()) / 1000));
    return conn.reply(m.chat, `⏱️ You've already explored the dungeon recently. Wait ⏳ *${tiempoRestante}* before you venture out again.`, m);
  }

  cooldowns[m.sender] = Date.now();

  if (!users[senderId]) {
    users[senderId] = { health: 100, coin: 0, exp: 0 };
  }

  const eventos = [
    { nombre: 'Dungeons of the Fallen', tipo: 'victory', coin: randomNumber(150, 300), exp: randomNumber(50, 100), health: 0, mensaje: `🏆 You've defeated the guardian! Upon opening its chest, you found a lot of ${m.moneda}.` },
    { nombre: 'Chamber of Specters', tipo: 'defeat', coin: randomNumber(-70, -40), exp: randomNumber(10, 20), health: randomNumber(-15, -5), mensaje: `⚠️ A specter has ensnared you in its web of shadows. You lost some ${m.moneda} while you manage to escape.` },
    { nombre: 'Crypt of Oblivion', tipo: 'victory', coin: randomNumber(250, 400), exp: randomNumber(100, 150), health: 0, mensaje: `💎 You venture inside and discover an ancient treasure trove filled with gems and ${m.moneda}.` },
    { nombre: 'Maze Trap', tipo: 'trap', coin: 0, exp: randomNumber(5, 10), health: 0, mensaje: `🚧 You triggered a hidden trap. Fortunately, you escaped unharmed, but you gained nothing..` },
    { nombre: 'Chamber of Demons', tipo: 'defeat', coin: randomNumber(-150, -80), exp: randomNumber(20, 40), health: randomNumber(-30, -20), mensaje: `🐉 A ferocious demon ambushes you in the darkness. You manage to escape, but not without losing some. ${m.moneda} and health.` },
    { nombre: 'Sanctuary of Light', tipo: 'victory', coin: randomNumber(100, 200), exp: randomNumber(30, 60), health: 0, mensaje: `🎆 You find a chest full of riches that shine brightly.` },
    { nombre: 'Labyrinth of the Lost', tipo: 'trap', coin: 0, exp: randomNumber(5, 15), health: 0, mensaje: `🌀 You enter a confusing labyrinth. You manage to escape, but you receive no rewards..` },
    { nombre: 'Ruins of the Fallen', tipo: 'victory', coin: randomNumber(150, 300), exp: randomNumber(70, 120), health: 0, mensaje: `🏺 You discover ancient artifacts that shine with a mysterious charm and reward you..` },
    { nombre: 'Dragon Lair', tipo: 'defeat', coin: randomNumber(-200, -100), exp: randomNumber(20, 40), health: randomNumber(-30, -20), mensaje: `🔥 A dragon breathes fire at you. You manage to escape, but lose some wealth and health..` },
    { nombre: 'Dungeon Sage', tipo: 'victory', coin: randomNumber(50, 100), exp: randomNumber(30, 50), health: 0, mensaje: `👴 You encounter a wise man who shares stories and rewards you for your attention..` },
  ];

  let evento = eventos[Math.floor(Math.random() * eventos.length)];

  if (evento.tipo === 'victory') {
    users[senderId].coin += evento.coin;
    users[senderId].exp += evento.exp;
    users[senderId].health += evento.health;
  } else if (evento.tipo === 'defeat') {
    users[senderId].coin += evento.coin;
    users[senderId].exp += evento.exp;
    users[senderId].health += evento.health;
  } else if (evento.tipo === 'trap') {
    users[senderId].exp += evento.exp;
  }

  let img = 'https://qu.ax/jbnNz.jpg';
  let info = `╭━〔 Ancient Dungeons 〕\n` +
             `┃Mission: *${evento.nombre}*\n` +
             `┃Event: ${evento.mensaje}\n` +
             `┃Reward: ${evento.coin > 0 ? '+' : '-'}${Math.abs(evento.coin)} *${m.moneda}* & +${evento.exp} *XP*.\n` +
             `┃Your health ${evento.health < 0 ? 'it went down: ' + Math.abs(evento.health) : 'it remained the same.'}\n` +
             `╰━━━━━━━━━━━━⬣`;

 await conn.sendFile(m.chat, 'https://files.catbox.moe/gegwez.jpg', 'mazmorras.jpg', info, m);



  global.db.write();
};

handler.tags = ['rpg'];
handler.help = ['explore'];
handler.command = ['dungeon', 'dungeon', 'cave'];
handler.register = true;
handler.group = true;

export default handler;

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function segundosAHMS(segundos) {
  let minutos = Math.floor(segundos / 60);
  let segundosRestantes = segundos % 60;
  return `${minutos} minutes and ${segundosRestantes} seconds`;
}