const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let handler = async (m, { conn, text, usedPrefix, command }) => {
  const args = text.split('|').map(v => v.trim());

  if (args.length < 3) {
    return m.reply(`${emoji} You must enter the group link, the message, and the amount of spam separated by "|".*\n\nExample:\n${usedPrefix + command} https://chat.whatsapp.com/SSSS | Hello, how are you? | 5`);
  }

  const [groupLink, message, countStr] = args;
  const count = parseInt(countStr, 10);

  if (!groupLink.includes('chat.whatsapp.com')) {
    return m.reply(`${emoji2} Please provide a valid group link.`);
  }
  if (isNaN(count) || count <= 0) {
    return m.reply(`${emoji2} Specify a valid number of messages (greater than 0).`);
  }

  try {
    const code = groupLink.split('chat.whatsapp.com/')[1];
    const groupId = await conn.groupAcceptInvite(code);

    m.reply(`${done} Successfully joined the group. Starting spam of ${count} messages...`);

    for (let i = 0; i < count; i++) {
      await conn.sendMessage(groupId, { text: message });
      await delay(1000); 
    }

    m.reply(`${done} Spam completed. Leaving group...`);
    await conn.groupLeave(groupId);
  } catch (error) {
    console.error(error);
    m.reply(`${msm} Error attempting to perform the operation: ${error.message}`);
  }
};

handler.help = ['spam2'];
handler.tags = ['owner'];
handler.command = ['spam2'];
handler.owner = true;
export default handler;