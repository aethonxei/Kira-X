const handler = async (m, {conn, text, usedPrefix, command}) => {
  if (!text) throw `${emoji} No prefix found, please enter a prefix.\n> *Example: ${usedPrefix + command} !*`;
  global.prefix = new RegExp('^[' + (text || global.opts['prefix'] || '‎xzXZ/i!#$%+£¢€¥^°=¶∆×÷π√✓©®:;?&.\\-').replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') + ']');
 // await m.reply(`*✅️ Prefijo Actualizado Con Éxito, Prefijo Actual: ${text}*`);
  conn.fakeReply(m.chat, `${done} *Prefix Successfully Updated, Current Prefix: ${text}*`, '0@s.whatsapp.net', '✨ NEW PREFIX ✨')
};
handler.help = ['prefix'].map((v) => v + ' [prefix]');
handler.tags = ['owner'];
handler.command = ['prefix'];
handler.rowner = true;

export default handler;