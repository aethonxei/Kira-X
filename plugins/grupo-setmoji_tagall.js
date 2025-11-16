
let handler = async (m, { conn, text, isRowner }) => {

  if (!text) {
    return m.reply(`${emoji} You must provide a valid emoji after the command. Example: #setemoji ${emoji2}`);
  }

  const emoji = text.trim();

  if (!isEmoji(emoji)) {
    return m.reply(`${emoji} The text provided is not a valid emoji. Please ensure it is a real emoji..`);
  }

  try {
    global.db.data.chats[m.chat].customEmoji = emoji;

    m.reply(`${emoji2} The group emoji has been successfully updated to: ${emoji}`);
  } catch (error) {
    console.error(error);
    m.reply(`${msm} There was an error while trying to change the emoji.`);
  }
};

const isEmoji = (text) => {
  const emojiRegex =
    /(?:\p{Emoji_Presentation}|\p{Extended_Pictographic}|\p{Emoji})/gu;
  return emojiRegex.test(text) && text.length <= 2;
};

handler.help = ['setemoji *<emoji>*'];
handler.tags = ['group'];
handler.command = ['setemoji', 'setemo'];
handler.admin = true;
handler.group = true;

export default handler;