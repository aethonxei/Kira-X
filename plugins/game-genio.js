let handler = async (m, { conn, text }) => {
  if (!text) return conn.reply(m.chat, `${emoji} Please ask a question.`, m)

  const respuestas = [
   'Yes.',
'It’s better if I don’t tell you now.',
'Yes, definitely.',
'You should trust it.',
'My sources say no.',
'Don’t count on it.',
'I can’t predict it now.',
'Very doubtful.',
'The outlook isn’t good.',
'Focus and ask again.',
'In my opinion, yes.',
'It is true.',
'Probably.',
'Everything points to yes.',
'My answer is no.',
'Definitely not.',
'Ask again later.',
'I’m not sure, try again.',
'Of course.',
'The signs point to yes.',
'Maybe.',
'I highly doubt it.',
'I don’t see it happening.',
'It could be, but don’t rely on it.',
'Count on it.',
'I couldn’t tell you.',
'Trust your intuition.',
'It seems yes, but with caution.',
'My sensors say yes.',
'I can’t answer that.',
'Absolutely.',
'Only time will tell.',
'No doubt about it.',
'It’s not the right time to know.',
'Highly likely.',
'Don’t get your hopes up.',
'Definitely yes.',
'It’s unclear right now.',
'It depends on how you look at it.',
'I prefer not to answer.', 
  ]

  const imagenes = [
    'https://qu.ax/QHgWZ.jpg',
  ]

  const respuesta = respuestas[Math.floor(Math.random() * respuestas.length)]
  const imagen = imagenes[Math.floor(Math.random() * imagenes.length)]

  conn.sendMessage(m.chat, { image: { url: imagen }, caption: `🔮 *${respuesta}*` }, { quoted: m })
}

handler.tags = ['fun']
handler.help = ['8ball *<pregunta>*']
handler.command = ['akinator', 'genio']

export default handler
