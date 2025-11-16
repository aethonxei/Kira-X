let handler = async (m, { conn, text, usedPrefix, command }) => {
  let chat = global.db.data.chats[m.chat];
  if (!chat) chat = global.db.data.chats[m.chat] = {};

  if (text) {
    chat.byeText = text;
    m.reply('${emoji2} The farewell message has been successfully configured for this group.');
  } else {
    let bye = chat.byeText || 'There is no message configured.';
    m.reply(`✳️ The current farewell message from this group is:\n\n*${bye}*\n\nTo change it, use: *${usedPrefix + command} <text>*\n\nYou can use the following variables in your message:\n- *@user*: Mention the member who left.\n- *@subject*: Displays the group name.`);
  }
};

handler.help = ['setbye <text>'];
handler.tags = ['group'];
handler.command = ['setbye'];
handler.admin = true;

export default handler;
