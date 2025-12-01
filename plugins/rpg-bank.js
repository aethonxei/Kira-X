import db from '../lib/database.js'

let handler = async (m, { conn, usedPrefix, participants }) => {
    let who = m.mentionedJid[0] 
        ? m.mentionedJid[0] 
        : m.quoted 
        ? m.quoted.sender 
        : m.sender

    if (who == conn.user.jid) return m.react('✖️')

    let primaryJid = who; 
    if (who.endsWith('@lid') && m.isGroup) {
        const participantInfo = participants.find(p => p.lid === who);
        
        if (participantInfo && participantInfo.id) { 
            primaryJid = participantInfo.id;
        }
    }

    if (!(primaryJid in global.db.data.users)) 
        return m.reply(`${emoji} *The user is not found in my database.*`)

    let user = global.db.data.users[primaryJid] 
    let nombre = await conn.getName(primaryJid) 

    let coin = (user.coin || 0).toLocaleString('en-US')
    let bank = (user.bank || 0).toLocaleString('en-US')
    let total = ((user.coin || 0) + (user.bank || 0)).toLocaleString('en-US')

    let texto = `
╭─〔 ᥫ᭡ 𝗘𝗖𝗢𝗡𝗢𝗠𝗬 𝗜𝗡𝗙𝗢 ❀ 〕
│ 👤 User » *${nombre}*
│ 💸 Wallet » *¥${coin} ${m.moneda}*
│ 🏦 Bank » *¥${bank} ${m.moneda}*
│ 🧾 Total » *¥${total} ${m.moneda}*
╰─────────────────────
> 📌 Use *${usedPrefix}deposit* to protect your money in the bank.
    `.trim()

    await conn.reply(m.chat, texto, m)
}

handler.help = ['bal']
handler.tags = ['rpg']
handler.command = ['bal', 'balance', 'bank']
handler.register = true
handler.group = true

export default handler
