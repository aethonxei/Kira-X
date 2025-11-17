let handler = async(m, { conn, command, text }) => {
  if (!text) return m.reply(`${emoji} Please enter the reason for the meeting.`)
  if (text.length < 10) return m.reply(`${emoji2} Please enter at least 10 characters.`)
  
  let texto = `${emoji2} The Owner @${m.sender.split`@`[0]} started a meeting. Join the staff group as soon as possible.f...\n*➪ Reason: ${text}*`
  m.reply(`${emoji} Sending meeting message to all owners.`)
  
  let mentions = [m.sender]
  
  for (let [jid] of global.owner.filter(([number, _, isDeveloper]) => isDeveloper && number)) {
    let data = (await conn.onWhatsApp(jid))[0] || {}
    if (data.exists) {
      await conn.sendMessage(data.jid, { text: texto, mentions })
    }
  }
}

handler.tags = ['owner']
handler.command = handler.help = ['reunion', 'meeting']
handler.rowner = true

export default handler