const handler = async (m, {conn, usedPrefix, text, command}) => {
  let hash = text;
  if (m.quoted && m.quoted.fileSha256) hash = m.quoted.fileSha256.toString('hex');
  if (!hash) throw `${emoji} You can only assign text or commands to stickers or images; to get the assigned code, use the command: ${usedPrefix}listcmd`;
  const sticker = global.db.data.sticker;
  if (sticker[hash] && sticker[hash].locked) throw `${emoji} Only the *owner* can perform the deletion.`;
  delete sticker[hash];
  m.reply(`${emoji} The text/command assigned to the sticker/image was successfully removed from the database.`);
};
handler.command = ['delcmd'];
handler.rowner = true;

export default handler;