import pkg from '@whiskeysockets/baileys'
const { generateWAMessageFromContent, prepareWAMessageMedia, proto } = pkg

let handler = async (m, { conn, command }) => {

    // Fake message for quoting
    const fake = {
        key: {
            remoteJid: "status@broadcast",
            fromMe: false,
            participant: "0@s.whatsapp.net"
        },
        message: {
            extendedTextMessage: {
                text: "Dashboard"
            }
        }
    }

    // DASHBOARD COMMANDS
    if (command == 'dash' || command == 'dashboard' || command == 'views') {

        let stats = Object.entries(global.db.data.stats).map(([key, val]) => {
            let name = Array.isArray(global.plugins[key]?.help)
                ? global.plugins[key].help.join(' , ')
                : global.plugins[key]?.help || key

            if (/exec/.test(name)) return
            return { name, ...val }
        }).filter(Boolean)

        // sort by most used
        stats = stats.sort((a, b) => b.total - a.total)

        // top 10 commands
        let handlers = stats.slice(0, 10).map(({ name, total }) => {
            return `⬡ *Command* : *${name}*\n⬡ *Uses* : ${total}`
        }).join('\n\n')

        return conn.reply(m.chat, handlers, m, fake)
    }

    // USER DATABASE COMMANDS
    if (command == 'database' || command == 'users' || command == 'user' || command == 'usuarios') {

        let totalUsers = Object.keys(global.db.data.users).length
        let registered = Object.values(global.db.data.users).filter(v => v.registered).length
        let unregistered = totalUsers - registered

        return conn.reply(m.chat, `
🗂️ *Registered Users:* ${registered}
📂 *Unregistered Users:* ${unregistered}
📁 *Total:* ${totalUsers}
`, m)
    }

}

handler.help = ['dash', 'dashboard', 'views', 'database', 'usuarios', 'user']
handler.tags = ['info']
handler.command = ['dashboard', 'dash', 'views', 'database', 'usuarios', 'user']
handler.register = true

export default handler
