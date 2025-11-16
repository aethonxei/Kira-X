let handler = async (m, { conn, usedPrefix, command }) => {

  if (!m.mentionedJid[0] && !m.quoted) return m.reply(`✳️ Tag the user. Example :\n\n*${usedPrefix + command}* @tag`)
  let user = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender
  if (conn.user.jid.includes(user)) return m.reply(`✳️ I cannot demote myself.`)

  await conn.groupParticipantsUpdate(m.chat, [user], 'demote')
  m.reply(`✅ User successfully demoted from administrator`)

}

handler.help = ['demote @user']
handler.tags = ['group']
handler.command = ['demote', 'dem']
handler.admin = true
handler.group = true
handler.botAdmin = true

export default handler