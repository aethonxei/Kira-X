const handler = async (m, {conn}) => {
  global.prefix = new RegExp('^[' + (opts['prefix'] || '‎xzXZ/i!#$%+£¢€¥^°=¶∆×÷π√✓©®:;?&.\\-').replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') + ']');
  //await m.reply(`✅️ *Prefijo Restablecido Con Éxito!*`);
  conn.fakeReply(m.chat, `${emoji} *Prefix Successfully Restored!*`, '0@s.whatsapp.net', '✨ PREFIX RESTORED ✨')
};
handler.help = ['resetprefix'];
handler.tags = ['owner'];
handler.command = ['resetprefix'];
handler.rowner = true;

export default handler;