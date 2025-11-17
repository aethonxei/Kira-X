const baseCoinReward = 20000;

let handler = async (m, { conn }) => {
  let user = global.db.data.users[m.sender] || {};
  user.monthly = user.monthly || 0;

  const cooldown = 604800000 * 4; // 4 semanas
  let timeRemaining = user.monthly + cooldown - new Date();

  if (timeRemaining > 0) {
    return m.reply(`${emoji3} ✿ Have you already claimed your monthly reward?* ✿\n⏳ Come back in *${msToTime(timeRemaining)}*`);
  }

  let coinReward = pickRandom([20000, 25000, 30000, 35000, 40000]);
  let expReward = pickRandom([4000, 5000, 6000, 7000, 8000]);
  let diamondReward = pickRandom([5, 6, 7, 8, 9, 10]);

  user.coin = (user.coin || 0) + coinReward;
  user.exp = (user.exp || 0) + expReward;
  user.diamonds = (user.diamonds || 0) + diamondReward;

  user.monthly = Date.now();

  let mensaje = `
╭───────「  🎁 𝐌𝐎𝐍𝐓𝐇𝐋𝐘 – 𝐁𝐎𝐍𝐔𝐒 🎁 」───────
│
│ ✿ 𝙔𝙤𝙪 𝙝𝙖𝙫𝙚 𝙘𝙡𝙖𝙞𝙢𝙚𝙙 𝙮𝙤𝙪𝙧 𝙈𝙊𝙉𝙏𝙃𝙇𝙔 𝙂𝙄𝙁𝙏!!
│
│ 💸 ${m.moneda} : *+¥${coinReward.toLocaleString()}*
│ ✨ Experience : *+${expReward} XP*
│ 💎 Diamonds : *+${diamondReward}*
╰─────────────────────────────

⏳ You can claim it again within *4 weeks*
`.trim();

  m.reply(mensaje);
}

handler.help = ['monthly'];
handler.tags = ['rpg'];
handler.command = ['monthly', 'monthly'];
handler.group = true;
handler.register = true;

export default handler;

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function msToTime(duration) {
  const days = Math.floor(duration / (1000 * 60 * 60 * 24));
  const hours = Math.floor((duration % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
  return `${days} days, ${hours} hours, ${minutes} minutes`;
}