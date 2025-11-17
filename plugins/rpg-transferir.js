async function handler(m, { conn, args, usedPrefix, command, participants }) {
  let who;
  if (m.isGroup) {
    who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false;
  } else {
    who = m.chat;
  }

  if (!who) {
    return m.reply(`${emoji} Tag or reply to the message of the user you want to transfer.`);
  }

  let senderJid = m.sender;
  if (m.sender.endsWith('@lid') && m.isGroup) {
    const pInfo = participants.find(p => p.lid === m.sender);
    if (pInfo && pInfo.id) senderJid = pInfo.id; 
  }

  let targetJid = who;
  if (who.endsWith('@lid') && m.isGroup) {
    const pInfo = participants.find(p => p.lid === who);
    if (pInfo && pInfo.id) targetJid = pInfo.id; 
  }

  const amountText = args.find(arg => !arg.startsWith('@') && isNumber(arg));
  if (!amountText) {
    return m.reply(`(๑•̌ . •̑๑)ˀ̣ˀ̣  You must specify the amount of ${m.moneda} you want to transfer.\n> *example:* ${usedPrefix + command} 1000 @user`);
  }

  const count = Math.min(Number.MAX_SAFE_INTEGER, Math.max(1, parseInt(amountText)));
  
  const user = global.db.data.users[senderJid];
  const type = 'coin';
  const bankType = 'bank';

  if (user[bankType] < count) {
    return m.reply(`⚠️ You don't have enough ${m.moneda} in your balance to make the transfer.`);
  }

  if (!(targetJid in global.db.data.users)) {
    return m.reply(`❌ The user is not in my database/data..`);
  }

  if (targetJid === senderJid) {
    return m.reply(`❌ You cant transfer it to yourself..`);
  }

  user[bankType] -= count;
  global.db.data.users[targetJid][type] += count;

  const mentionText = `@${who.split('@')[0]}`;
  m.reply(`✅ Transfer completed.!\n\n› sent *${count.toLocaleString()} ${m.moneda}* to ${mentionText}.\n› you now have *${user[bankType].toLocaleString()} ${m.moneda}* in your bank.`, null, { mentions: [who] });
}

handler.help = ['pay <amount> @user'];
handler.tags = ['rpg'];
handler.command = ['pay', 'transfer', 'give'];
handler.group = true;
handler.register = true;
export default handler;
function isNumber(x) {
  if (typeof x === 'string') { x = x.trim(); }
  return !isNaN(x) && x !== '';
}