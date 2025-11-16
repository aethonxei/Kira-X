import { promises as fs } from 'fs'

const charactersFilePath = './src/database/characters.json'
const haremFilePath = './src/database/harem.json'

async function loadCharacters() {
    try {
        const data = await fs.readFile(charactersFilePath, 'utf-8')
        return JSON.parse(data)
    } catch (error) {
        throw new Error('❀ The characters.json file could not be loaded.')
    }
}

async function loadHarem() {
    try {
        const data = await fs.readFile(haremFilePath, 'utf-8')
        return JSON.parse(data)
    } catch (error) {
        return []
    }
}

let handler = async (m, { conn, command, args }) => {
    if (args.length === 0) {
        await conn.reply(m.chat, `《✧》Please provide the name of a character.`, m)
        return
    }

    const characterName = args.join(' ').toLowerCase().trim()

    try {
        const characters = await loadCharacters()
        const character = characters.find(c => c.name.toLowerCase() === characterName)

        if (!character) {
            await conn.reply(m.chat, `《✧》The character has not been found. *${characterName}*. Make sure the name is correct.`, m)
            return
        }

        if (!character.vid || character.vid.length === 0) {
            await conn.reply(m.chat, `《✧》No video was found for *${character.name}*.`, m)
            return
        }

        const randomVideo = character.vid[Math.floor(Math.random() * character.vid.length)]
        const message = `❀ Name » *${character.name}*
⚥ Gender » *${character.gender}*
❖ Source » *${character.source}*`

        const sendAsGif = Math.random() < 0.5

        if (sendAsGif) {
            conn.sendMessage(m.chat, { video: { url: randomVideo }, gifPlayback: true, caption: message }, { quoted: m })
        } else {
            conn.sendMessage(m.chat, { video: { url: randomVideo }, caption: message }, { quoted: m })
        }
    } catch (error) {
        await conn.reply(m.chat, `✘ Error loading character video: ${error.message}`, m)
    }
}

handler.help = ['wvideo <character name>']
handler.tags = ['anime']
handler.command = ['charvideo', 'wvideo', 'waifuvideo']
handler.group = true

export default handler