import { makeWASocket } from '@whiskeysockets/baileys';

let handler = async (m, { conn, usedPrefix, command }) => {
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || q.mediaType || '';

  if (/image/.test(mime)) {
    let img = await q.download();
    if (!img) return m.reply(`${emoji} You forgot the profile picture for the group.`);

    try {
      await conn.updateProfilePicture(m.chat, img);
      m.reply(`${emoji} Perfect.`);
      m.react(done)
    } catch (e) {
      m.reply(`︎${msm} An error occurred: ${e.message}`);
    }
  } else {
    return m.reply(`${emoji} You forgot the image to change the group's profile.`);
  }
};

handler.command = ['gpbanner', 'groupimg'];
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;