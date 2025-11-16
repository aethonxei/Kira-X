const handler = async (m, { conn, args, participants, command }) => {
  const prefix = args[0]
  if (!prefix || !prefix.startsWith('+')) {
    return m.reply(`⚠️ You must specify a valid prefix.\nExample: *.${command} +52*`)
  }

  const botNumber = conn.user.id.split(':')[0]

  const groupMetadata = await conn.groupMetadata(m.chat)
  const admins = groupMetadata.participants.filter(p => p.admin).map(p => p.id)

  const matching = participants.filter(p => 
    p.id.startsWith(prefix.replace('+', '')) &&
    p.id !== botNumber &&
    !admins.includes(p.id)
  )

  if (command === 'listnum' || command === 'listanum') {
    if (matching.length === 0) return m.reply(`🤖 No users were found with the prefix ${prefix}`)

    const lista = matching.map((p, i) => `${i + 1}. wa.me/${p.id.split('@')[0]}`).join('\n')
    return m.reply(`🔎 List of users with the prefix ${prefix}:\n\n${lista}`)
  }

  if (command === 'kicknum') {
    if (matching.length === 0) return m.reply(`🤖 No users were found to kick with the prefix ${prefix}`)

    for (let p of matching) {
      await conn.groupParticipantsUpdate(m.chat, [p.id], 'remove').catch(_ => null)
    }
    return m.reply(`✅ Removed ${matching.length} user(s) with the prefix ${prefix}`)
  }
}

handler.command = ['kicknum', 'listnum', 'listanum']
handler.group = true
handler.botAdmin = true // You can remove this line if you don't want validation

export default handler
