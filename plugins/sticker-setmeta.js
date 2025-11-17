// ⁱ𝔇ĕ𝐬†𝓻⊙γ𒆜 -  >> https://github.com/The-King-Destroy

let handler = async (m, { text, usedPrefix, command }) => {
    const userId = m.sender;

    if (command === 'setmeta') {
        const packParts = text.split(/[\u2022|]/).map(part => part.trim());
        if (packParts.length < 2) {
            return m.reply(`${emoji} Please write the sticker pack and author you want to use by default for your stickers.\n> Example: *${usedPrefix + command} Kira-X • By aethonxei*`);
        }

        const packText1 = packParts[0];
        const packText2 = packParts[1];

        if (!global.db.data.users[userId]) {
            global.db.data.users[userId] = {};
        }

        const packstickers = global.db.data.users[userId];

        if (packstickers.text1 || packstickers.text2) {
            return m.reply(`${emoji2} You already have a sticker pack set up..\n> Use the command *${usedPrefix}delmeta* to remove it before setting up a new one.`);
        }

        packstickers.text1 = packText1;
        packstickers.text2 = packText2;

        await global.db.write();

        return m.reply(`${emoji4} The default sticker pack and author have been updated.`);
    }

    if (command === 'delmeta') {
        if (!global.db.data.users[userId] || (!global.db.data.users[userId].text1 && !global.db.data.users[userId].text2)) {
            return m.reply(`${emoji3} This user has not set up a sticker pack.`);
        }

        const packstickers = global.db.data.users[userId];
        delete packstickers.text1;
        delete packstickers.text2;

        await global.db.write();

        return m.reply(`${emoji} The default sticker pack and author have been restored.`);
    }
};

handler.help = ['setmeta', 'delmeta']
handler.tags = ['tools']
handler.command = ['setmeta', 'delmeta']
handler.register = true
handler.group = true

export default handler;

/*const handler = async (m, { text, usedPrefix, command }) => {
try {
const metaParts = text.split(/\s/).map(part => part.trim())
if (metaParts.length < 2) {
return m.reply(`🚀 Escribe el pack y el autor que deseas usar por defecto para tus stickers\n> Ejemplo: *${usedPrefix + command} Star Author*`)
}
const packName = metaParts[0]
const authorName = metaParts[1]
if (!global.db.data.users[m.sender]) {
global.db.data.users[m.sender] = {}
}
const { packstickers, packstickers2 } = global.db.data.users[m.sender]
packstickers = packName
packstickers2 = authorName
await global.db.write()
return m.reply(`✨ ¡Tus metadatos de stickers han sido actualizados con éxito! Pack: ${packName} | Autor: ${authorName}`)
} catch (e) {
await m.reply(`🚨 Ocurrió un problema al actualizar los ajustes: ${e}`)
}}

handler.help = ['setmeta']
handler.tags = ['tools']
handler.command = ['setmeta']

export default handler*/