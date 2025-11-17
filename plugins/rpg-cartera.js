let handler = async (m, {conn, usedPrefix}) => {
let who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.sender
if (who == conn.user.jid) return error 
if (!(who in global.db.data.users)) return conn.reply(m.chat, `${emoji4} The user is not found in my database.`, m)
let user = global.db.data.users[who]
await m.reply(`${who == m.sender ? `You Have *${user.coin} ${m.moneda} 💸* in your wallet` : `The user @${who.split('@')[0]} has *${user.coin} ${m.moneda} 💸* in his wallet`}. `, null, { mentions: [who] })}

handler.help = ['wallet']
handler.tags = ['economy']
handler.command = ['wallet', 'wt']
handler.group = true
handler.register = true

export default handler