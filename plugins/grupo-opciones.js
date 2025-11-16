const handler = async (m, { conn }) => {
  const chat = global.db.data.chats[m.chat] || {};
  const metadata = await conn.groupMetadata(m.chat).catch(_ => null) || {};
  const groupName = metadata.subject || 'This Group';

  const status = (option) => option ? '✅' : '❌';

  const primaryBot = chat.botPrimario ? `@${chat.botPrimario.split('@')[0]}` : 'Without establishing';

  const avatar = "https://files.catbox.moe/tc438t.jpg";

  const text = `╭━━━[ *CONFIGURATION* ]━━━⬣
┃
┃ ✨ Group: *${groupName}*
┃ 🤖 Primary Bot: *${primaryBot}*
┃
┠───═[ *SECURITY* ]═───⬣
┃
┃ ${status(chat.antiLink)} ◈ Antilink
┃ ${status(chat.antiLink2)} ◈ Antilink2
┃ ${status(chat.antiBot)} ◈ Antibot
┃ ${status(chat.antiBot2)} ◈ Antisubbots
┃ ${status(chat.antitoxic)} ◈ Antitoxic
┃ ${status(chat.antitraba)} ◈ Antitrava
┃ ${status(chat.antifake)} ◈ Antifake
┃
┠───═[ *AUTOMATION* ]═───⬣
┃
┃ ${status(chat.welcome)} ◈ Welcome
┃ ${status(chat.detect)} ◈ detect
┃ ${status(chat.autolevelup)} ◈ autolevelup
┃ ${status(chat.autoresponder)} ◈ autoresponder
┃ ${status(chat.reaction)} ◈ reaction
┃
┠───═[ *MANAGEMENT AND CONTENT* ]═───⬣
┃
┃ ${status(chat.modoadmin)} ◈ modeadmin
┃ ${status(chat.autoAceptar)} ◈ autoAccept
┃ ${status(chat.autoRechazar)} ◈ autoReject
┃ ${status(chat.nsfw)} ◈ nsfw
┃
╰━━━━━━━━━━━━━━━━━━⬣

> *Activate or deactivate an option with, for example: #antilink*`.trim();

  await conn.sendMessage(m.chat, {
    text,
    contextInfo: {
      mentionedJid: [chat.botPrimario],
      externalAdReply: {
        title: `❖ ${groupName} ❖`,
        body: '(◍•ᴗ•◍) 𝙶𝚁𝙾𝚄𝙿 𝙲𝙾𝙽𝙵𝙸𝙶𝚄𝚁𝙰𝚃𝙸𝙾𝙽',
        thumbnailUrl: avatar,
        mediaType: 1,
        showAdAttribution: true,
        renderLargerThumbnail: true
      }
    }
  }, { quoted: m });
};

handler.help = ['groupconfiguration'];
handler.tags = ['grupo'];
handler.command = ['config', 'opciones', 'nable'];
handler.register = true;
handler.group = true;

export default handler;