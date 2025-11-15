let handler = async (m, { args, text, usedPrefix, command }) => {
  if (!text) return m.reply(`🔮 *Use the command like this:*\n${usedPrefix}${command} Will I become a millionaire??\n\nAsk a question and I'll answer with yes or no..`)

  const pregunta = text.toLowerCase()
  let respuesta = Math.random() < 0.5 ? 'No' : 'Yeah'

  if (pregunta.includes('gay') || pregunta.includes('homo') || pregunta.includes('bisexual')) {
    respuesta = 'Yeah'
  } else if (pregunta.includes('hetero') || pregunta.includes('heterosexual')) {
    respuesta = 'No'
  }

  await m.reply(`🎱 *Ask:* ${text}\n🔮 *Answer:* ${respuesta}`)
}

handler.help = ['8ball <ask>']
handler.tags = ['fun']
handler.command = ['8ball']

export default handler
