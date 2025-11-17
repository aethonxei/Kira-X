let cooldowns = {};

let handler = async (m, { conn }) => {
  let users = global.db.data.users;
  let senderId = m.sender;

  let tiempoEspera = 10 * 60;

  if (cooldowns[senderId] && Date.now() - cooldowns[senderId] < tiempoEspera * 1000) {
    let tiempoRestante = segundosAHMS(Math.ceil((cooldowns[senderId] + tiempoEspera * 1000 - Date.now()) / 1000));
    return conn.reply(m.chat, `⏱️ You've hunted recently. Wait ⏳ *${tiempoRestante}* before trying again.`, m);
  }

  cooldowns[senderId] = Date.now();

  if (!users[senderId]) {
    users[senderId] = { health: 100, coin: 0, exp: 0 };
  }

  const eventos = [
    { nombre: 'Battle against the Goblins', tipo: 'victory', coin: randomNumber(20, 40), exp: randomNumber(10, 20), health: 0, mensaje: `🏆 You have defeated the Goblins! As they fell, they dropped a lot of ${m.moneda}.` },
    { nombre: 'Encounter with the Orc', tipo: 'defeat', coin: randomNumber(-30, -10), exp: randomNumber(5, 10), health: randomNumber(-15, -5), mensaje: `⚠️ An Orc attacked you and you lost health and coins in the fight.` },
    { nombre: 'Dragons Challenge', tipo: 'victory', coin: randomNumber(100, 150), exp: randomNumber(50, 80), health: 0, mensaje: `🔥 You have defeated the Dragon! You find an ancient treasure full of ${m.moneda}.` },
    { nombre: 'Confrontation with the Skeleton', tipo: 'defeat', coin: randomNumber(-20, -10), exp: randomNumber(5, 10), health: randomNumber(-10, -5), mensaje: `💀 You have fallen to a Skeleton. The battle was intense and you lost some ${m.moneda}.` },
    { nombre: 'Battle against the Manticore', tipo: 'victory', coin: randomNumber(80, 120), exp: randomNumber(40, 60), health: 0, mensaje: `🦁 You have defeated the Manticore. Its fur shimmered as it fell, revealing a hidden treasure of ${m.moneda}.` },
    { nombre: 'Confrontation with the Troll', tipo: 'defeat', coin: randomNumber(-50, -20), exp: randomNumber(10, 20), health: randomNumber(-20, -10), mensaje: `🧌 A troll attacked you. You lost health and some ${m.coin} in the fight.` },
    { nombre: 'Duel with the Werewolf', tipo: 'victory', coin: randomNumber(60, 100), exp: randomNumber(30, 50), health: 0, mensaje: `🐺 You defeated a Werewolf in a fierce battle. You won a loot of ${m.moneda}.` },
    { nombre: 'Confrontation with the Minotaur', tipo: 'defeat', coin: randomNumber(-40, -15), exp: randomNumber(10, 20), health: randomNumber(-15, -5), mensaje: `🪓 The Minotaur has attacked you. You have suffered damage and lost some ${m.moneda}.` },
    { nombre: 'Battle against the Ghost', tipo: 'victory', coin: randomNumber(30, 50), exp: randomNumber(20, 40), health: 0, mensaje: `👻 You have managed to defeat the Ghost that haunted the village. You receive ${m.moneda} as a reward.` },
    { nombre: 'Fight against the Ice Dragon', tipo: 'defeat', coin: randomNumber(-60, -20), exp: randomNumber(15, 30), health: randomNumber(-25, -10), mensaje: `❄️ The Ice Dragon has frozen you. You have lost health and some ${m.moneda}.` },
    { nombre: 'Fight the Hydra', tipo: 'victory', coin: randomNumber(90, 130), exp: randomNumber(50, 80), health: 0, mensaje: `🐉 You have defeated the Hydra and found a treasure of ${m.moneda}.` },
    { nombre: 'Challenge of the Fallen Knight', tipo: 'defeat', coin: randomNumber(-30, -10), exp: randomNumber(5, 10), health: randomNumber(-15, -5), mensaje: `⚔️ You have been defeated by the Fallen Knight. You have lost health and coins.` },
    { nombre: 'Encounter with the Witch', tipo: 'troll', coin: 0, exp: randomNumber(20, 40), health: randomNumber(-10, -5), mensaje: `🧙 You encountered a witch who cast a spell on you. You gain experience..` },
    { nombre: 'Bandits Ambush', tipo: 'troll', coin: 0, exp: randomNumber(15, 30), health: randomNumber(-5, -3), mensaje: `🗡️ You were ambushed by bandits. Although you managed to escape, you've lost some health..` },
    { nombre: 'Giant Snake Hunt', tipo: 'victory', coin: randomNumber(50, 80), exp: randomNumber(30, 50), health: 0, mensaje: `🐍 You have hunted the Giant Snake. Its skin is valuable, and you obtain ${m.moneda}.` },
  ];

  let evento = eventos[Math.floor(Math.random() * eventos.length)];

  if (evento.tipo === 'victory') {
    users[senderId].coin += evento.coin;
    users[senderId].exp += evento.exp;
    users[senderId].health += evento.health;
  } else if (evento.tipo === 'defeat') {
    users[senderId].coin += evento.coin;
    users[senderId].exp += evento.exp;
    users[senderId].health -= evento.health;
  } else if (evento.tipo === 'troll') {
    users[senderId].exp += evento.exp;
    users[senderId].health -= evento.health;
  }

  let img = 'https://qu.ax/bbfSN.jpg';
  let info = `╭━〔 Adventurers' Guild 〕\n` +
             `┃Mission: *${evento.nombre}*\n` +
             `┃Event: ${evento.mensaje}\n` +
             `┃Reward: ${evento.coin > 0 ? '+' : '-'}${Math.abs(evento.coin)} ${m.moneda} and +${evento.exp} XP.\n` +
             `┃Your health ${users[senderId].health < 0 ? 'it went down: ' + Math.abs(users[senderId].health) : 'it remained the same.'}\n` +
             `╰━━━━━━━━━━━━⬣`;

  await conn.sendFile(m.chat, img, 'gremio.jpg', info, fkontak);

  await global.db.write();
};

handler.tags = ['rpg'];
handler.help = ['gremio'];
handler.command = ['gremio', 'mision'];
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