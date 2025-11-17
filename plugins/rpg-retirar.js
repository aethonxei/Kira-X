import db from '../lib/database.js'

let handler = async (m, { args }) => {
let user = global.db.data.users[m.sender]
if (!args[0]) return m.reply(`${emoji} Enter the amount of *${m.moneda}* that you wish to withdraw.`)
if (args[0] == 'all') {
let count = parseInt(user.bank)
user.bank -= count * 1
user.coin += count * 1
await m.reply(`${emoji} You withdrew *${count} ${m.moneda}* From the bank, now you can use it but they can also steal it from you.`)
return !0
}
if (!Number(args[0])) return m.reply(`${emoji2} You must withdraw a valid amount.\n > Example 1 » *#withdraw 25000*\n> Example 2 » *#withdraw all*`)
let count = parseInt(args[0])
if (!user.bank) return m.reply(`${emoji2} You don't have enough. *${m.moneda}* at the Bank.`)
if (user.bank < count) return m.reply(`${emoji2} You only have *${user.bank} ${m.moneda}* at the Bank.`)
user.bank -= count * 1
user.coin += count * 1
await m.reply(`${emoji} You withdrew *${count} ${m.moneda}* From the bank, now you can use it but they can also steal it from you.`)}

handler.help = ['withdraw']
handler.tags = ['rpg']
handler.command = ['withdraw', 'wdw', 'with']
handler.group = true
handler.register = true

export default handler