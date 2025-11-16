const handler = async (m, {conn, participants, groupMetadata}) => {
  const pp = await conn.profilePictureUrl(m.chat, 'image').catch((_) => null) || `${icono}`;
  const {antiLink, detect, welcome, modoadmin, antiPrivate, autoRechazar, nsfw, autoAceptar, restrict, antiSpam, reaction, antiviewonce, antiTraba, antiToxic} = global.db.data.chats[m.chat];
  const groupAdmins = participants.filter((p) => p.admin);
  const listAdmin = groupAdmins.map((v, i) => `${i + 1}. @${v.id.split('@')[0]}`).join('\n');
  const owner = groupMetadata.owner || groupAdmins.find((p) => p.admin === 'superadmin')?.id || m.chat.split`-`[0] + '@s.whatsapp.net';
  const text = `*✧･ﾟ GROUP INFO ﾟ･✧*
❀ *ID:*
→ ${groupMetadata.id}
⚘ *Name:*
→ ${groupMetadata.subject}
✦ *Description:*
→ ${groupMetadata.desc?.toString() || 'No Description'}
❖ *Members:*
→ ${participants.length} Participantes
✰ *Group Creator:*
→ @${owner.split('@')[0]}
✥ *Administrators:*
${listAdmin}

˚₊· ͟͟͞͞➳❥ *CONFIGURATION*

◈ *Welcome:* ${welcome ? '✅' : ''}
◈ *Detect:* ${detect ? '✅' : '❌'}  
◈ *:* ${antiLink ? '✅' : '❌'} 
◈ *Autoaccept:* ${autoAceptar ? '✅' : '❌'} 
◈ *Autodecline:* ${autoRechazar ? '✅' : '❌'} 
◈ *Nfsw:* ${nsfw ? '✅' : '❌'} 
◈ *Antiprivate:* ${antiPrivate ? '✅' : '❌'} 
◈ *Modeadmin:* ${modoadmin ? '✅' : '❌'} 
◈ *Antivw:* ${antiviewonce ? '✅' : '❌'} 
◈ *Reaction* ${reaction ? "✅️" : "❌️"}
◈ *Antispam:* ${antiSpam ? '✅' : '❌'} 
◈ *Restrict:* ${restrict ? '✅' : '❌'} 
◈ *:* ${antiToxic ? '✅' : '❌'} 
◈ *Antitrava:* ${antiTraba ? '✅' : '❌'} 
`.trim();
  conn.sendFile(m.chat, pp, 'img.jpg', text, m, false, {mentions: [...groupAdmins.map((v) => v.id), owner]});
};
handler.help = ['groupinfo'];
handler.tags = ['group'];
handler.command = ['gcinfo', 'gp', 'groupinfo'];
handler.register = true
handler.group = true;

export default handler;