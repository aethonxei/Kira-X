let handler = async (m, { conn, text }) => {
  if (!m.isGroup) throw 'This command can only be used in groups.'

  if (!text) throw 'You must enter the number of the bot you wish to set as the main one.'

  let botJid = text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'

  if (!global.db.data.chats[m.chat]) global.db.data.chats[m.chat] = {}

  if (global.db.data.chats[m.chat].primaryBot === botJid) {
    return conn.reply(m.chat, `✧ @${botJid.split`@`[0]} is already the primary bot of this group.`, m, { mentions: [botJid] });
  }

  global.db.data.chats[m.chat].primaryBot = botJid

  let response = `✐ Done! It has been set to *@${botJid.split('@')[0]}* as the only bot that will respond in this group.

> From now on, all commands will be executed by it.

> *Note:* If you want all bots to respond again, an administrator can use the command \`resetbot\` (without prefix).`;

    await conn.sendMessage(m.chat, { 
        text: response, 
        mentions: [botJid] 
    }, { quoted: m });
}

handler.help = ['setprimary <number>']
handler.tags = ['owner', 'group']
handler.command = ['setprimary']
handler.admin = true
handler.group = true

export default handler