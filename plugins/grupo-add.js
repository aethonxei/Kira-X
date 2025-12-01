const { proto } = (await import('@whiskeysockets/baileys')).default;

let handler = async (m, { conn, participants, text, usedPrefix, command }) => {
  if (!m.isGroup) return;
  

  if (!text) {
    return m.reply(`${emoji} Please enter the number of the person you want to invite.\n\n*Example:*\n*${usedPrefix + command} 212605158422*`);
  }

  const number = text.replace(/[^0-9]/g, '');
  if (isNaN(number)) {
    return m.reply('❌ The number entered is invalid. Please ensure you include the country code without the "+" symbol.');
  }
  
  const userJid = `${number}@s.whatsapp.net`;

  try {
    const [result] = await conn.onWhatsApp(userJid);
    if (!result || !result.exists) {
      return m.reply(`❌ The number *${number}* is not valid or does not have a WhatsApp account.`);
    }

    const userExists = participants.some(p => p.id === userJid);
    if (userExists) {
      return m.reply('✅ The user you are trying to invite is already in the group.');
    }

    const groupMetadata = await conn.groupMetadata(m.chat);
    const groupName = groupMetadata.subject;
    const inviteCode = await conn.groupInviteCode(m.chat);
    const inviteUrl = 'https://chat.whatsapp.com/' + inviteCode;

    const messageText = `👋 Hi! You've been invited to join the WhatsApp group "${groupName}".\n\nClick on the following link to join:\n\n${inviteUrl}`;

    await conn.sendMessage(userJid, { text: messageText });

    m.reply(`✅ Done! The invitation link has been sent to @${number}.`, null, { mentions: [userJid] });

  } catch (e) {
    console.error("Error sending invitation:", e);
    m.reply(`❌ An error occurred while sending the invitation..\n\n*Error details:*\n${e.message || e}`);
  }
};

handler.help = ['invite <number>', 'add <number>'];
handler.tags = ['group'];
handler.command = ['add', 'agregar', 'añadir', 'invi', 'invite'];

handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;
