let handler = async (m, { conn, participants, args }) => {
  let user = null;
  let deleteAll = false;

  if (args[0]) {
    if (args[0].toLowerCase() === 'all') {
      deleteAll = true;
    } else {
      user = args[0].replace(/[@+]/g, '') + '@s.whatsapp.net';
    }
  } else if (m.quoted) {
    user = m.quoted.sender;
  } else if (m.mentionedJid?.length) {
    user = m.mentionedJid[0];
  }

  const allMessages = Object.values(conn.chats[m.chat]?.messages || {})
    .filter(v => v.key?.id && !v.message?.protocolMessage) // valid
    .sort((a, b) => b.messageTimestamp.low - a.messageTimestamp.low)
    .slice(0, 100);

  if (deleteAll) {
    for (let msg of allMessages) {
      try {
        await conn.sendMessage(m.chat, { delete: msg.key });
        await new Promise(resolve => setTimeout(resolve, 150));
      } catch (e) {
        console.error('Error deleting (all):', e);
      }
    }
    return m.reply(`✅ The last ones were removed ${allMessages.length} messages from the group.`);
  }

  if (!user) {
    return m.reply('👤 Please Mention the user, reply to their message, or use "all".\n\nExample:\n.deletemsg @user\n.deletemsg 212xxxxxxx\n.deletemsg (responding)\n.deletemsg all');
  }

  if (!participants.some(p => p.id === user)) return m.reply('❌ The user is not in this group.');

  const userMessages = allMessages.filter(v => v.key?.participant === user);

  if (!userMessages.length) return m.reply('😿 I couldnt find any recent messages from that user.');

  for (let msg of userMessages) {
    try {
      await conn.sendMessage(m.chat, { delete: msg.key });
      await new Promise(resolve => setTimeout(resolve, 150));
    } catch (e) {
      console.error('Error deleting (user):', e);
    }
  }

  await m.reply(`✅ Removed ${userMessages.length} recent messages from @${user.split('@')[0]}.`, null, {
    mentions: [user]
  });
};

handler.help = ['deletemsg @user', 'deletemsg all'];
handler.tags = ['group'];
handler.command = ['deletemsg', 'del']; // <-- Here's the alias
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;
