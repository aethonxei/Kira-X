const handler = async (m, { conn, text, usedPrefix, command }) => {
  let who;
  if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false;
  else who = m.chat;

  const textpremERROR = `🎟️ Enter the @tag of the user you want to add as premium.`;
  if (!who) return m.reply(textpremERROR, null, { mentions: conn.parseMention(textpremERROR) });

  const user = global.db.data.users[who];
  if (!user) return m.reply(`⚠️ That user is not in my database.`);

  const txt = text.replace('@' + who.split`@`[0], '').trim();
  const name = await conn.getName(who);

  const horas = 60 * 60 * 1000 * txt;
  const dias = 24 * horas;
  const semanas = 7 * dias;
  const meses = 30 * dias;
  const now = Date.now();

  if (command === 'addprem' || command === 'userpremium') {
    user.premiumTime = now < user.premiumTime ? user.premiumTime + horas : now + horas;
    user.premium = true;
    m.reply(`🎟️ *Premium User!*\n\n✨ User: ${name}\n🕐 Time: ${txt} hour(s)`, null, { mentions: [who] });
  }

  if (command === 'addprem2' || command === 'userpremium2') {
    user.premiumTime = now < user.premiumTime ? user.premiumTime + dias : now + dias;
    user.premium = true;
    m.reply(`🎟️ *Premium User!*\n\n✨ User: ${name}\n🕐 Time: ${txt} day(s)`, null, { mentions: [who] });
  }

  if (command === 'addprem3' || command === 'userpremium3') {
    user.premiumTime = now < user.premiumTime ? user.premiumTime + semanas : now + semanas;
    user.premium = true;
    const restante = await formatTime(user.premiumTime - now);
    m.reply(`🎟️ *Premium User!*\n\n✨ User: ${name}\n🕐 Time: ${txt} week(s)\n📉 Remaining: ${restante}`, null, { mentions: [who] });
  }

  if (command === 'addprem4' || command === 'userpremium4') {
    user.premiumTime = now < user.premiumTime ? user.premiumTime + meses : now + meses;
    user.premium = true;
    const restante = await formatTime(user.premiumTime - now);
    m.reply(`🎟️ *Premium User!*\n\n✨ User: ${name}\n🕐 Time: ${txt} month(s)\n📉 Restante: ${restante}`, null, { mentions: [who] });
  }
};

handler.help = ['addprem [@user] <tiempo>'];
handler.tags = ['owner'];
handler.command = ['addprem', 'userpremium', 'addprem2', 'userpremium2', 'addprem3', 'userpremium3', 'addprem4', 'userpremium4'];
handler.group = true;
handler.rowner = true;

export default handler;

async function formatTime(ms) {
  let seconds = Math.floor(ms / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  seconds %= 60;
  minutes %= 60;
  hours %= 24;
  let timeString = '';
  if (days) timeString += `${days} day${days > 1 ? 's' : ''} `;
  if (hours) timeString += `${hours} hour${hours > 1 ? 's' : ''} `;
  if (minutes) timeString += `${minutes} minute${minutes > 1 ? 's' : ''} `;
  if (seconds) timeString += `${seconds} second${seconds > 1 ? 's' : ''} `;
  return timeString.trim();
}