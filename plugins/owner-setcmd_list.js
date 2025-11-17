const handler = async (m, {conn}) => {
  conn.reply(m.chat, `
*< List of Assigned Commands / Texts >*

${Object.entries(global.db.data.sticker).map(([key, value], index) => `*${index + 1}.-*\n*Code:* ${value.locked ? `*(Blocked)* ${key}` : key}\n*Command/Text* ${value.text}`).join('\n\n')}
`.trim(), null, {mentions: Object.values(global.db.data.sticker).map((x) => x.mentionedJid).reduce((a, b) => [...a, ...b], [])});
};
handler.command = ['listcmd', 'cmdlist'];
handler.rowner = true;

export default handler;