const handler = async (m, { conn, text, participants }) => {
  let user;

  // Get the user to promote
  if (m.mentionedJid && m.mentionedJid.length) {
    user = m.mentionedJid[0]; // use the first mentioned
  } else if (m.quoted?.sender) {
    user = m.quoted.sender;
  } else {
    throw '⚠️ You must mention a user or reply to their message to promote it.';
  }

  // Promote the user
  await conn.groupParticipantsUpdate(m.chat, [user], 'promote');
  conn.reply(m.chat, `✅ @${user.split('@')[0]} is now an administrator.`, m, {
    mentions: [user]
  });
};

handler.help = ['promote'];
handler.tags = ['grupo'];
handler.command = ['promote', 'prom', 'promover'];
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;
