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

let handler = async (m, { conn, args }) => {
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

        const randomImage = character.img[Math.floor(Math.random() * character.img.length)]

        const message = `❀ Name » *${character.name}*
⚥ Gender » *${character.gender}*
❖ Source » *${character.source}*`

        await conn.sendFile(m.chat, randomImage, `${character.name}.jpg`, message, m)
    } catch (error) {
        await conn.reply(m.chat, `✘ Error loading character image: ${error.message}`, m)
    }
}

handler.help = ['wimage <character name>']
handler.tags = ['anime']
handler.command = ['charimage', 'wimage', 'waifuimage']
handler.group = true

export default handler