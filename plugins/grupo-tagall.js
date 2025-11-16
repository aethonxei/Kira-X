const handler = async (m, { isOwner, isAdmin, conn, text, participants, args, command, usedPrefix }) => {
  if (usedPrefix == 'a' || usedPrefix == 'A') return;

  const botname = global.botname || 'Ruby';
  
  m.react('✅');

  if (!(isAdmin || isOwner)) {
    global.dfail('admin', m, conn);
    throw false;
  }

  const mensaje = args.join` ` || 'Attention all';

  const titulo = `*─ᐅ「 𝗚𝗘𝗡𝗘𝗥𝗔𝗟 𝗠𝗘𝗡𝗧𝗜𝗢𝗡 」*`;

  let texto = `${titulo}\n\n`;
  texto += `*Message:* \`${mensaje}\`\n\n`;

  texto += `╭─「 *Invoking the group* 」\n`;

  for (const member of participants) {
    texto += `│ ${emoji} @${member.id.split('@')[0]}\n`;
  }

  texto += `╰─「 ${botname} 」`;

  conn.sendMessage(m.chat, { text: texto, mentions: participants.map((a) => a.id) });
};

handler.help = ['tagall *<optional message>*'];
handler.tags = ['group'];
handler.command = ['all', 'everyone', 'tagall'];
handler.admin = true;
handler.group = true;

export default handler;