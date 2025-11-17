let cooldowns = {}

let handler = async (m, { conn, text, command, usedPrefix }) => {
  let users = global.db.data.users[m.sender]
  const tiempoEspera = 10

  if (cooldowns[m.sender] && Date.now() - cooldowns[m.sender] < tiempoEspera * 1000) {
    let tiempoRestante = segundosAHMS(Math.ceil((cooldowns[m.sender] + tiempoEspera * 1000 - Date.now()) / 1000))
    return conn.reply(m.chat, `《✧》You recently made a bet..\n⏱ Wait *${tiempoRestante}* before trying again.`, m)
  }

  cooldowns[m.sender] = Date.now()

  if (!text) {
    return conn.reply(m.chat, `《✧》You must specify *black* or *red*\n> Example » *${usedPrefix + command} 25000 red*`, m)
  }

  let args = text.trim().split(" ")
  if (args.length !== 2) {
    return conn.reply(m.chat, `《✧》You must bet a valid amount.\n> Example » *${usedPrefix + command} 25000 red*`, m)
  }

  let coin = parseInt(args[0])
  let color = args[1].toLowerCase()

  if (isNaN(coin) || coin <= 0) {
    return conn.reply(m.chat, `《✧》You must bet a valid amount.\n> Example » *${usedPrefix + command} 25000 red*`, m)
  }

  if (!(color === 'black' || color === 'red')) {
    return conn.reply(m.chat, `《✧》You must specify *black* or *red**\n> Example » *${usedPrefix + command} 25000 red*`, m)
  }

  if (coin > users.coin) {
    return conn.reply(m.chat, `《✧》You don't have enough. *${m.moneda}* to bet that amount.`, m)
  }

  await conn.reply(m.chat, `🎲 You bet *¥${coin.toLocaleString()} ${m.moneda}* to the color *${color}*.\n⏳ Wait 10 seconds for the result...`, m)

  setTimeout(() => {
    const resultado = Math.random() < 0.50 ? color : (color === 'red' ? 'black' : 'red')
    const hasGanado = resultado === color

    if (hasGanado) {
      users.coin += coin * 2
      conn.reply(m.chat, `「✿」The roulette wheel landed on *${resultado}* 🎉\n> You won! *¥${coin.toLocaleString()} ${m.moneda}*! Your bet was also returned.`, m)
    } else {
      users.coin -= coin
      conn.reply(m.chat, `「✿」The roulette wheel landed on *${resultado}* 😿\n> You lost *¥${coin.toLocaleString()} ${m.moneda}*. Good luck next time!!`, m)
    }
  }, 10000)
}

handler.tags = ['economy']
handler.help = ['roulette *<amount> <color>*']
handler.command = ['rlt', 'roulette', 'rt']
handler.register = true
handler.group = true

export default handler

function segundosAHMS(segundos) {
  let minutos = Math.floor(segundos / 60)
  let segundosRestantes = segundos % 60
  return `${minutos}m ${segundosRestantes}s`
}