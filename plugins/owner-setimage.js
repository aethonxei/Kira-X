import Jimp from 'jimp';

let handler = async (m, { conn }) => {
  if (!m.quoted) return conn.reply(m.chat, `${emoji} Please reply to the image to change the profile picture..`, m);

  try {
    const media = await m.quoted.download();
    if (!media) return conn.reply(m.chat, `${emoji2} The image could not be obtained.`, m);

    const image = await Jimp.read(media);
    const buffer = await image.getBufferAsync(Jimp.MIME_JPEG);

    await conn.updateProfilePicture(conn.user.jid, buffer);
    return conn.reply(m.chat, `${emoji} Profile picture successfully changed.`, m);
  } catch (e) {
    console.error(e);
    return conn.reply(m.chat, `${msm} An error occurred while trying to change the profile picture.`, m);
  }
};

handler.help = ['setimage'];
handler.tags = ['owner'];
handler.command = ['setpfp', 'setimage'];
handler.rowner = true;

export default handler;