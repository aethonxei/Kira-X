var handler = async (m, { conn, text, usedPrefix, command }) => {
    let user, number, bot, bant, ownerNumber, aa, users, usr

    try {
        function no(number) {
            return number.replace(/\s/g, '').replace(/([@+-])/g, '')
        }
        text = no(text)
        number = isNaN(text) ? text.split`@`[1] : text
        user = conn.user.jid.split`@`[0] + '@s.whatsapp.net'
        bot = conn.user.jid.split`@`[0]
        bant = `❀ Please tag or write the number of the user you want to ban from the Bot.`
        const nn = conn.getName(m.sender)
        if (!text && !m.quoted) return conn.reply(m.chat, bant, m, { mentions: [user] })
        
        if (text) {
            user = number + '@s.whatsapp.net'
        } else if (m.quoted.sender) {
            user = m.quoted.sender
        } else if (m.mentionedJid) {
            user = number + '@s.whatsapp.net'
        }

        number = user.split('@')[0]
        if (user === conn.user.jid) return conn.reply(m.chat, `✧ @${bot} cannot be banned with this command.`, m, { mentions: [user] })

        for (let i = 0; i < global.owner.length; i++) {
            ownerNumber = global.owner[i][0]
            if (user.replace(/@s\.whatsapp\.net$/, '') === ownerNumber) {
                aa = ownerNumber + '@s.whatsapp.net'
                await conn.reply(m.chat, `✧ I cannot ban the owner @${ownerNumber} of *${botname}*.`, m, { mentions: [aa] })
                return
            }
        }

        users = global.db.data.users
        if (!users[user]) {
            users[user] = { banned: false }
        }
        if (users[user].banned === true) return conn.reply(m.chat, `✦ There is no need to ban again. @${number}.`, m, { mentions: [user] })

        users[user].banned = true
        usr = m.sender.split('@')[0]
        await conn.reply(m.chat, `❀ User successfully banned.`, m, { mentions: [user] })
        let nametag = conn.getName(user)
        await conn.reply(`${suittag}@s.whatsapp.net`, `❀ The user *${nametag}* has been banned by *${nn}*.`, m)
    } catch (e) {
        await conn.reply(m.chat, `⚠︎ An error occurred.`, m)
    }
}

handler.help = ['banuser <@tag> <reason>']
handler.command = ['banuser', 'ban']
handler.tags = ['mods']
handler.rowner = true

export default handler
