const ro = 3000;
const cooldown = 2 * 60 * 60 * 1000;

const handler = async (m, { conn, usedPrefix, command }) => {
  const user = global.db.data.users[m.sender];
  if (!user) return conn.reply(m.chat, `${emoji2} *Your user is not registered in the database.*`, m);

  const now = Date.now();
  const last = user.lastrob || 0;

  if (now - last < cooldown) {
    const time = msToTime(last + cooldown - now);
    return conn.reply(m.chat, `${emoji3} You must wait ${time} to use *#robxp* again.`, m);
  }

  let who = null;
  if (m.isGroup) {
    who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : null;
  } else {
    who = m.chat;
  }

  if (!who) {
    return conn.reply(m.chat, `${emoji} You have to mention someone to try and steal XP from them.`, m);
  }

  if (!(who in global.db.data.users)) {
    return conn.reply(m.chat, `${emoji2} That user is not in the database.`, m);
  }

  if (who === m.sender) {
    return conn.reply(m.chat, `${emoji2} *You can't steal from yourself.*`, m);
  }

  const target = global.db.data.users[who];
  target.exp = Number.isFinite(target.exp) ? Math.max(0, target.exp) : 0;
  user.exp = Number.isFinite(user.exp) ? user.exp : 0;

  const rob = Math.floor(Math.random() * (ro - 200 + 1)) + 200;

  if (target.exp < 200) {
    return conn.reply(m.chat, `${emoji2} @${who.split('@')[0]} doesn't have at least *200 XP* to make it worth stealing.`, m, { mentions: [who] });
  }

  const finalRob = Math.min(rob, target.exp);

  user.exp += finalRob;
  target.exp -= finalRob;
  user.lastrob = now;

  await conn.reply(m.chat, `${emoji} You stole *${finalRob} XP* from @${who.split('@')[0]}`, m, { mentions: [who] });
};

handler.help = ['robxp'];
handler.tags = ['economy'];
handler.command = ['robxp', 'rxp'];
handler.group = true;
handler.register = true;

export default handler;

function msToTime(duration) {
  let seconds = Math.floor((duration / 1000) % 60);
  let minutes = Math.floor((duration / (1000 * 60)) % 60);
  let hours = Math.floor((duration / (1000 * 60 * 60)));

  hours = (hours < 10) ? '0' + hours : hours;
  minutes = (minutes < 10) ? '0' + minutes : minutes;
  seconds = (seconds < 10) ? '0' + seconds : seconds;

  return `${hours} Hour(s) ${minutes} Minute(s)`;
}
