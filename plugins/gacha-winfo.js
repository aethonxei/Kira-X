import { promises as fs } from 'fs';

const charactersFilePath = './src/database/characters.json';
const haremFilePath = './src/database/harem.json';

async function loadCharacters() {
    try {
        const data = await fs.readFile(charactersFilePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        throw new Error('The characters.json file could not be loaded.');
    }
}

async function loadHarem() {
    try {
        const data = await fs.readFile(haremFilePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

let handler = async (m, { conn, args }) => {
    if (args.length === 0) {
        await conn.reply(m.chat, '《✧》You must specify a character to view their information.\n> Example » *#winfo Aika Sano*', m);
        return;
    }

    const characterName = args.join(' ').toLowerCase().trim();

    try {
        const characters = await loadCharacters();
        const character = characters.find(c => c.name.toLowerCase() === characterName);

        if (!character) {
            await conn.reply(m.chat, `《✧》The character could not be found. *${characterName}*.`, m);
            return;
        }

        const harem = await loadHarem();
        const userEntry = harem.find(entry => entry.characterId === character.id);
        const statusMessage = userEntry 
            ? `Claimed by @${userEntry.userId.split('@')[0]}` 
            : 'Free';
        
        const message = `❀ Name » *${character.name}*\n⚥ Gender » *${character.gender}*\n✰ Value » *${character.value}*\n♡ Status » ${statusMessage}\n❖ Source » *${character.source}*`;

        await conn.reply(m.chat, message, m, { mentions: [userEntry ? userEntry.userId : null] });
    } catch (error) {
        await conn.reply(m.chat, `✘ Error loading character information: ${error.message}`, m);
    }
};

handler.help = ['charinfo <character name>', 'winfo <character name>', 'waifuinfo <character name>'];
handler.tags = ['anime'];
handler.command = ['charinfo', 'winfo', 'waifuinfo'];
handler.group = true;
handler.register = true;

export default handler;
