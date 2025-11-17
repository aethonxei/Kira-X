let handler = async (m, { conn }) => {
  const dangerousExtensions = ['.apk', '.exe', '.bat', '.scr', '.js', '.vbs', '.cmd', '.ps1', '.reg'];
  const suspiciousPatterns = [
    /bit\.ly|tinyurl\.com|mega\.nz|mediafire\.com|drive\.google\.com/i,
    /hack|crack|keygen|nitro|premium|gratis|free/i,
    /\.(apk|exe|bat|scr|js|vbs|cmd|ps1|reg)$/i
  ];

  const messages = Object.values(conn.chats[m.chat]?.messages || {})
    .filter(v => {
      const text = v.message?.conversation || 
                   v.message?.extendedTextMessage?.text || 
                   v.message?.documentMessage?.fileName || 
                   '';
      
      const hasDangerousExt = v.message?.documentMessage &&
        dangerousExtensions.some(ext => v.message.documentMessage.fileName?.toLowerCase().endsWith(ext));

      const matchesSuspiciousPattern = suspiciousPatterns.some(regex => regex.test(text));

      return hasDangerousExt || matchesSuspiciousPattern;
    })
    .sort((a, b) => b.messageTimestamp.low - a.messageTimestamp.low)
    .slice(0, 100);

  if (!messages.length) return m.reply('🔍 I didnt find any suspicious or potentially dangerous messages..');

  for (let msg of messages) {
    try {
      await conn.sendMessage(m.chat, { delete: msg.key });
      await new Promise(resolve => setTimeout(resolve, 150));
    } catch (e) {
      console.error('Error deleting:', e);
    }
  }

  await m.reply(`🛡️ Removed ${messages.length} suspicious messages that could contain viruses.`);
};

handler.help = ['antivirus'];
handler.tags = ['grupo'];
handler.command = ['antivirus'];
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;
