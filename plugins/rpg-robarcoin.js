const handler = async (m, { conn, usedPrefix, command, participants }) => {
  try {
    const cooldown = 2 * 60 * 60 * 1000;
    const now = Date.now(); 

    let senderJid = m.sender;
    if (m.sender.endsWith('@lid') && m.isGroup) {
        const pInfo = participants.find(p => p.lid === m.sender);
        if (pInfo && pInfo.id) senderJid = pInfo.id; 
    }

    const user = global.db?.data?.users?.[senderJid];
    if (!user) return conn.reply(m.chat, `${emoji2} *Your user is not registered in the database.*`, m);

    let target = null;
    if (m.isGroup) {
      target = (m.mentionedJid && m.mentionedJid.length > 0) ? m.mentionedJid[0] : (m.quoted && m.quoted.sender ? m.quoted.sender : null);
    } else {
      target = m.chat;
    }

    if (!target) {
      return conn.reply(m.chat, `${emoji2} *You must mention someone to try to steal from them..*`, m);
    }

    let targetJid = target;
    if (target.endsWith('@lid') && m.isGroup) {
        const pInfo = participants.find(p => p.lid === target);
        if (pInfo && pInfo.id) targetJid = pInfo.id; 
    }

    if (targetJid === senderJid) {
      return conn.reply(m.chat, `${emoji2} *You can't steal from yourself.*`, m);
    }

    if (!global.db?.data?.users?.[targetJid]) {
      return conn.reply(m.chat, `${emoji2} *That user is not registered in the database.*`, m);
    }

    const targetUser = global.db.data.users[targetJid];

    targetUser.coin = Number.isFinite(targetUser.coin) ? Math.max(0, Number(targetUser.coin)) : 0;
    user.coin = Number.isFinite(user.coin) ? Number(user.coin) : 0;

    if (user.lastrob2 && (now - Number(user.lastrob2) < cooldown)) {
      const remaining = Number(user.lastrob2) + cooldown - now;
      const time = msToTime(remaining);
      return conn.reply(m.chat, `${emoji3} ✿ You already tried a robbery!! ✿\n⏳ Come back in *${time}* to do it again.`, m);
    }

    const MIN_ROB = 1000;
    const MAX_ROB = 20000;
    const robAmount = Math.floor(Math.random() * (MAX_ROB - MIN_ROB + 1)) + MIN_ROB;

    if (targetUser.coin < MIN_ROB) {
      return conn.reply(m.chat, `${emoji2} @${target.split("@")[0]} *does not have at least ¥${MIN_ROB.toLocaleString()} ${m.moneda} outside the bank so it's worth trying.*`, m, { mentions: [target] });
    }

    const finalRob = Math.min(robAmount, targetUser.coin);

    targetUser.coin = Math.max(0, targetUser.coin - finalRob);
    user.coin = (user.coin || 0) + finalRob;
    user.lastrob2 = now;

    const frases = [
      `✿ Successful robbery! ✿\nYou have robbed @${target.split("@")[0]} and you took *¥${finalRob.toLocaleString()} ${m.moneda}* 💸`,
      `✿ Your operation was silent and efficient....\nYou stole. *¥${finalRob.toLocaleString()} ${m.moneda}* from @${target.split("@")[0]}!`,
      `✿ You put it on your hood and, without being seen, you stole *¥${finalRob.toLocaleString()} ${m.moneda}* a @${target.split("@")[0]} 😈`,
      `✿ 🏃 You escaped through the dark alleys after stealing *¥${finalRob.toLocaleString()} ${m.moneda}* from @${target.split("@")[0]}`
    ];
    
    await conn.reply(m.chat, pickRandom(frases), m, { mentions: [target] });
  } catch (err) {
    console.error('Error in rob command:', err);
    return conn.reply(m.chat, `${emoji2} An error occurred while trying to execute the command. Please try again later.`, m);
  }
};

handler.help = ['rob'];
handler.tags = ['rpg'];
handler.command = ['robar', 'steal', 'rob'];
handler.group = true;
handler.register = true;
export default handler;
function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}
function msToTime(duration) {
  const totalSeconds = Math.max(0, Math.floor(duration / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  return `${hours} Hour(s) ${minutes} Minute(s)`;
}