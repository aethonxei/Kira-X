/* Code created by @Emma (Violet's Version) @Elpapiema

Patched and adapted by @aethonxei */

import fetch from 'node-fetch'

const handler = async (m, { text, usedPrefix, command, conn }) => {
    const args = text.split(',').map(arg => arg.trim())

    if (args.length < 7) {
        return m.reply(`❀ Please enter the character info.\n✧ Example: ${usedPrefix}${command} <Name of the character>, <Gender>, <Worth>, <Origin>, <Image link 1>, <Image link 2>, <Image link 3>\n\n> Note: Links must be in catbox.moe or qu.ax. If using qu.ax, it must be configured as permanent..`)
    }

    const [name, gender, value, source, img1, img2, img3] = args

    if (!img1.startsWith('http') || !img2.startsWith('http') || !img3.startsWith('http')) {
        return m.reply('✧ Please provide valid links for the images.')
    }

    const characterData = {
        id: Date.now().toString(),
        name,
        gender,
        value,
        source,
        img: [img1, img2, img3],
        vid: [],
        user: null,
        status: "Free",
        votes: 0
    }

    const tagNumber = '212688299426@s.whatsapp.net'

    const jsonMessage = `❀ New character added ❀\n\n\`\`\`${JSON.stringify(characterData, null, 2)}\`\`\``
    await conn.sendMessage(tagNumber, { text: jsonMessage })

    m.reply(`❀ The character *"${name}"* was sent to the staff for further review.`)
}

handler.command = ['addcharacter', 'addrw']

export default handler