const handler = async (m, {conn, text, usedPrefix, command}) => {
  let who;
  if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false;
  else who = m.chat;
  const user = global.db.data.users[who];
  if (!who) throw `${emoji} please @tag the user if you want to remove them from premium..`;
  if (!user) throw `${emoji4} The user is not in my database.`;
  if (user.premiumTime = 0) throw `${emoji2} The user is not a premium user. 👑`;
  const txt = text.replace('@' + who.split`@`[0], '').trim();

  user.premiumTime = 0;

  user.premium = false;

  const textdelprem = `@${who.split`@`[0]} is no longer a premium user. 👑`;
  m.reply(textdelprem, null, {mentions: conn.parseMention(textdelprem)});
};
handler.help = ['delprem <@user>'];
handler.tags = ['owner'];
handler.command = ['remove', 'delpremium']
handler.group = true;
handler.rowner = true;

export default handler;
