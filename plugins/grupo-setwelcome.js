let handler = async (m, { conn, text, usedPrefix, command }) => {
  let chat = global.db.data.chats[m.chat];
  if (!chat) chat = global.db.data.chats[m.chat] = {};

  if (text) {
    chat.welcomeText = text;
    m.reply('🫟 The welcome message has been successfully configured for this group.');
  } else {
    let welcome = chat.welcomeText || 'There is no message configured.';
    m.reply(`✳️ The current welcome message for this group is:\n\n*${welcome}*\n\nTo change it, use: *${usedPrefix + command} <text>*\n\nYou can use the following variables in your message:\n- *@user*: Mention the new member.\n- *@subject*: Displays the group name.\n- *@desc*: Show the group description.`);
  }
};

handler.help = ['setwelcome <text>'];
handler.tags = ['group'];
handler.command = ['setwelcome'];
handler.admin = true;

export default handler;
