import db from '../lib/database.js'

let handler = async (m, { args }) => {
  let user = global.db.data.users[m.sender]
  let emoji = '🏦', emoji2 = '❌'

  if (!args[0]) return m.reply(`${emoji} Enter the amount of *${m.moneda}* that you want to deposit.`)

  if (args[0] === 'all') {
    let total = user.coin || 0
    if (total === 0) return m.reply(`${emoji2} You have nothing in your wallet to deposit.`)
    user.coin = 0
    user.bank += total
    return m.reply(`✿ You deposited *¥${total.toLocaleString()} ${m.moneda}* at the bank, they won't be able to steal it from you anymore.`)
  }

  if (isNaN(args[0]) || parseInt(args[0]) <= 0)
    return m.reply(`${emoji2} You must enter a valid amount to deposit.\n\n> Example 1: *#d 25000*\n> Example 2: *#d all*`)

  let cantidad = parseInt(args[0])
  if ((user.coin || 0) < cantidad)
    return m.reply(`${emoji2} You only have *¥${(user.coin || 0).toLocaleString()} ${m.moneda}* in your wallet.`)

  user.coin -= cantidad
  user.bank += cantidad

  return m.reply(`✿ You deposited *¥${cantidad.toLocaleString()} ${m.moneda}* at the bank, they won't be able to steal it from you anymore.`)
}

handler.help = ['deposit']
handler.tags = ['rpg']
handler.command = ['deposit', 'deposit', 'd', 'aguardar']
handler.group = true
handler.register = true

export default handler