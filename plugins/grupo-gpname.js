import Presence from '@whiskeysockets/baileys';
const handler = async (m, {conn, args, text}) => {
  if (!text) throw `${emoji} Please enter the new name you would like to give the group.`;
  try {
    const text = args.join` `;
    if (!args || !args[0]) {
    } else {
      conn.groupUpdateSubject(m.chat, text);
    }
  } catch (e) {
    throw `${msm} An error occurred.`;
  }
};
handler.help = ['gruponame <text>'];
handler.tags = ['grupo'];
handler.command = ['gpname', 'groupname']
handler.group = true;
handler.admin = true;

export default handler;