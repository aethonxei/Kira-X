let handler = async (m, { conn }) => {
  let user = global.db.data.users[m.sender];

  const tiempoMs = 86400000; 
  const tiempoActual = Date.now();
  const diferencia = tiempoActual - (user.lastclaim || 0);

  if (diferencia < tiempoMs) {
    let restante = msToTime((user.lastclaim + tiempoMs) - tiempoActual);
    return conn.reply(m.chat, `🍎 𝑌𝑜𝑢’𝑣𝑒 𝑎𝑙𝑟𝑒𝑎𝑑𝑦 𝑐𝑙𝑎𝑖𝑚𝑒𝑑 𝑦𝑜𝑢𝑟 𝑟𝑒𝑤𝑎𝑟𝑑.\n\n⌛ 𝑅𝑒𝑡𝑢𝑟𝑛 𝑖𝑛 *${restante}* 𝑡𝑜 𝑛𝑜𝑡 𝑙𝑜𝑠𝑒 𝑦𝑜𝑢𝑟 𝑠𝑡𝑟𝑒𝑎𝑘.`, m);
  }

  if (diferencia > tiempoMs * 2) {
    user.dailyStreak = 1;
  } else {
    user.dailyStreak = (user.dailyStreak || 0) + 1;
  }

  let streak = user.dailyStreak;
  let reward = 30000 + (streak * 5000);
  let diamantes = Math.floor(5 + streak);
  let exp = Math.floor(200 + streak * 20);

  user.coin += reward;
  user.diamond += diamantes;
  user.exp += exp;
  user.lastclaim = tiempoActual;

  conn.reply(m.chat, `「✿」You have claimed your daily reward of *¥${reward.toLocaleString()} ${m.moneda}*! (Day *${streak}*)\n` +
    `> Day *${streak + 1}* » *+¥${(reward + 5000).toLocaleString()}* 🍀\n\n` +
    `✨ EXP: *+${exp}*\n💎 Diamonds: *+${diamantes}*\n💰 ${m.moneda}: *+${reward}*`, m);
}

handler.help = ['daily', 'diario'];
handler.tags = ['rpg'];
handler.command = ['daily', 'diario'];
handler.group = true;
handler.register = true;

export default handler;

function msToTime(duration) {
  let hours = Math.floor(duration / (1000 * 60 * 60));
  let minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));

  return `${hours} hour(s) and ${minutes} minute(s)`;
}