import { addExif } from '../lib/sticker.js';
import { sticker } from '../lib/sticker.js';
import fetch from 'node-fetch';
import axios from 'axios';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!m.quoted) return m.reply(`${emoji} Please respond to a sticker with the command *${usedPrefix + command}* followed by the new name.\nExample: *${usedPrefix + command} New Name*`);

  const sticker = await m.quoted.download();
  if (!sticker) return m.reply(`${emoji2} The sticker could not be downloaded..`);

  const textoParts = text.split(/[\u2022|]/).map(part => part.trim());
  const userId = m.sender;
  let packstickers = global.db.data.users[userId] || {};
  let texto1 = textoParts[0] || packstickers.text1 || global.packsticker;
  let texto2 = textoParts[1] || packstickers.text2 || global.packsticker2;

  const exif = await addExif(sticker, texto1, texto2);

  await conn.sendMessage(m.chat, { sticker: exif }, { quoted: m });
};

handler.help = ['wm'];
handler.tags = ['tools'];
handler.command = ['take', 'steal', 'wm'];
handler.register = true;

export default handler;
