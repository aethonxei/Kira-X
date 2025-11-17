// Alex-X >> https://github.com/OfcKing

import fs from 'fs'
import path from 'path'

var handler = async (m, { usedPrefix, command }) => {
    try {
        await m.react('🕒') 
        conn.sendPresenceUpdate('composing', m.chat)

        const pluginsDir = './plugins'

        const files = fs.readdirSync(pluginsDir).filter(file => file.endsWith('.js'))

        let response = `✧ *Syntax Error Review:*\n\n`
        let hasErrors = false

        for (const file of files) {
            try {
                await import(path.resolve(pluginsDir, file))
            } catch (error) {
                hasErrors = true
                const stackLines = error.stack.split('\n')

                const errorLineMatch = stackLines[0].match(/:(\d+):\d+/) 
                const errorLine = errorLineMatch ? errorLineMatch[1] : 'Unknown'

                response += `⚠︎ *Error in:* ${file}\n\n> ● Message: ${error.message}\n> ● Line number: ${errorLine}\n\n`
            }
        }

        if (!hasErrors) {
            response += '❀ Everything is in order! No syntax errors were detected'
        }

        await conn.reply(m.chat, response, m)
        await m.react('✅')
    } catch (err) {
        await m.react('✖️') 
        await conn.reply(m.chat, `⚠︎ An error occurred: ${err.message}`, m)
    }
}

handler.command = ['detectyntax', 'detect']
handler.help = ['detectyntax']
handler.tags = ['tools']
handler.rowner = true

export default handler