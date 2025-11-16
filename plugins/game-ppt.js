const handler = async (m, {conn, text, command, usedPrefix, args}) => {
// let pp = 'https://www.bighero6challenge.com/images/thumbs/Piedra,-papel-o-tijera-0003318_1584.jpeg'
  const pp = 'https://telegra.ph/file/c7924bf0e0d839290cc51.jpg';

  // 60000 = 1 minute // 30000 = 30 seconds // 15000 = 15 seconds // 10000 = 10 seconds
  const time = global.db.data.users[m.sender].wait + 10000;
  if (new Date - global.db.data.users[m.sender].wait < 10000) throw `${emoji} You'll have to wait ${Math.floor((time - new Date()) / 1000)} seconds before being able to play again.`;

  if (!args[0]) return conn.reply(m.chat, `*ROCK 🗿, PAPER 📄 or SCISSORS ✂️*\n\n*—◉ You can use these commands:*\n*◉ ${usedPrefix + command} rock*\n*◉ ${usedPrefix + command} paper*\n*◉ ${usedPrefix + command} scissors*`, m);
 
  let astro = Math.random();
  if (astro < 0.34) {
    astro = 'rock';
  } else if (astro > 0.34 && astro < 0.67) {
    astro = 'scissors';
  } else {
    astro = 'paper';
  }
  const textm = text.toLowerCase();
  if (textm == astro) {
    global.db.data.users[m.sender].exp += 500;
    m.reply(`*${emoji2} Draw!*\n\n*👉🏻 You: ${textm}*\n*👉🏻 The Bot: ${astro}*\n*🎁 +500 XP Reward*`);
  } else if (text == 'paper') {
    if (astro == 'rock') {
      global.db.data.users[m.sender].exp += 1000;
      m.reply(`*${emoji} You win! 🎉*\n\n*👉🏻 You: ${textm}*\n*👉🏻 El Bot: ${astro}*\n*🎁 Premio +1000 XP*`);
    } else {
      global.db.data.users[m.sender].exp -= 300;
      m.reply(`*💀 You lose! ❌*\n\n*👉🏻 You: ${textm}*\n*👉🏻 The Bot: ${astro}*\n*❌ Reward -300 XP*`);
    }
  } else if (text == 'scissors') {
    if (astro == 'paper') {
      global.db.data.users[m.sender].exp += 1000;
      m.reply(`*${emoji} You win! 🎉*\n\n*👉🏻 You: ${textm}*\n*👉🏻 The Bot: ${astro}*\n*🎁 +1000 XP Award*`);
    } else {
      global.db.data.users[m.sender].exp -= 300;
      m.reply(`*☠️ You lose! ❌*\n\n*👉🏻 You: ${textm}*\n*👉🏻 The Bot: ${astro}*\n*❌ Reward -300 XP*`);
    }
  } else if (textm == 'scissors') {
    if (astro == 'paper') {
      global.db.data.users[m.sender].exp += 1000;
      m.reply(`*${emoji} You win! 🎉*\n\n*👉🏻 You: ${textm}*\n*👉🏻 The Bot: ${astro}*\n*🎁 +1000 XP Award*`);
    } else {
      global.db.data.users[m.sender].exp -= 300;
      m.reply(`*☠️ You lose! ❌*\n\n*👉🏻 You: ${textm}*\n*👉🏻 The Bot: ${astro}*\n*❌ Reward -300 XP*`);
    }
  } else if (textm == 'paper') {
    if (astro == 'rock') {
      global.db.data.users[m.sender].exp += 1000;
      m.reply(`*${emoji} You win! 🎉*\n\n*👉🏻 You: ${textm}*\n*👉🏻 The Bot: ${astro}*\n*🎁 +1000 XP Award*`);
    } else {
      global.db.data.users[m.sender].exp -= 300;
      m.reply(`*☠️ You lose! ❌*\n\n*👉🏻 You: ${textm}*\n*👉🏻 The Bot: ${astro}*\n*❌ Reward -300 XP*`);
    }
  } else if (textm == 'rock') {
    if (astro == 'scissors') {
      global.db.data.users[m.sender].exp += 1000;
      m.reply(`*${emoji} You win! 🎉*\n\n*👉🏻 You: ${textm}*\n*👉🏻 The Bot: ${astro}*\n*🎁 +1000 XP Award*`);
    } else {
      global.db.data.users[m.sender].exp -= 300;
      m.reply(`*${emoji} You lose! ❌*\n\n*👉🏻 You: ${textm}*\n*👉🏻 The Bot: ${astro}*\n*❌ Reward -300 XP*`);
    }
  }
  global.db.data.users[m.sender].wait = new Date * 1;
};
handler.help = ['rps'];
handler.tags = ['games'];
handler.command = ['rps'];
handler.group = true;
handler.register = true;

export default handler;