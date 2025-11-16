import { promises as fs } from 'fs';

const charactersFilePath = './src/database/characters.json';
const haremFilePath = './src/database/harem.json';

async function loadCharacters() {
    try {
        const data = await fs.readFile(charactersFilePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        throw new Error('《✧》The characters.json file could not be loaded.');
    }
}

async function saveCharacters(characters) {
    try {
        await fs.writeFile(charactersFilePath, JSON.stringify(characters, null, 2));
    } catch (error) {
        throw new Error('《✧》The characters.json file could not be saved.');
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

async function saveHarem(harem) {
    try {
        await fs.writeFile(haremFilePath, JSON.stringify(harem, null, 2));
    } catch (error) {
        throw new Error('《✧》The file harem.json could not be saved.');
    }
}

export let cooldowns = new Map();
export const voteCooldownTime = 1 * 60 * 60 * 1000; // 1 hour

let characterVotes = new Map();

let handler = async (m, { conn, args }) => {
    try {
        const userId = m.sender;
        
        if (cooldowns.has(userId)) {
            const expirationTime = cooldowns.get(userId) + voteCooldownTime;
            const now = Date.now();
            if (now < expirationTime) {
                const timeLeft = expirationTime - now;
                const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
                const seconds = Math.floor((timeLeft / 1000) % 60);
                await conn.reply(m.chat, `《✧》You must wait *${Math.floor(minutes)} minutes ${seconds} seconds* to use *#vote* again.`, m);
                return;
            }
        }

        const characters = await loadCharacters();
        const characterName = args.join(' ');

        if (!characterName) {
            await conn.reply(m.chat, '《✧》You must specify a character to vote for them..', m);
            return;
        }

        const originalCharacterName = characterName;
        const character = characters.find(c => c.name.toLowerCase() === originalCharacterName.toLowerCase());

        if (!character) {
            await conn.reply(m.chat, '《✧》Character not found. Please ensure the name is in the correct format..', m);
            return;
        }

        if (characterVotes.has(originalCharacterName) && Date.now() < characterVotes.get(originalCharacterName)) {
            const expirationTime = characterVotes.get(originalCharacterName);
            const timeLeft = expirationTime - Date.now();
            const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
            const seconds = Math.floor((timeLeft / 1000) % 60);
            await conn.reply(m.chat, `《✧》The character *${originalCharacterName}* It has already been voted on recently. You must wait. *${Math.floor(minutes)} minutes ${seconds} seconds* to vote again.`, m);
            return;
        }

        const incrementValue = Math.floor(Math.random() * 10) + 1;
        character.value = String(Number(character.value) + incrementValue);
        character.votes = (character.votes || 0) + 1;
        await saveCharacters(characters);

        const harem = await loadHarem();
        const userEntry = harem.find(entry => entry.userId === userId && entry.characterId === character.id);
        
        if (!userEntry) {
            harem.push({
                userId: userId,
                characterId: character.id,
                lastVoteTime: Date.now(),
                voteCooldown: Date.now() + voteCooldownTime
            });
        } else {
            userEntry.lastVoteTime = Date.now();
            userEntry.voteCooldown = Date.now() + voteCooldownTime;
        }
        await saveHarem(harem);
        
        cooldowns.set(userId, Date.now());
        characterVotes.set(originalCharacterName, Date.now() + voteCooldownTime);

        await conn.reply(m.chat, `✰ You voted for the character *${originalCharacterName}*\n> Its new value is *${character.value}* (increased in *${incrementValue}*)\n> Total votes: *${character.votes}*`, m);
    } catch (e) {
        await conn.reply(m.chat, `✘ Error updating the value: ${e.message}`, m);
    }
};

handler.help = ['vote <name>'];
handler.tags = ['anime'];
handler.command = ['vote', 'votar'];
handler.group = true;
handler.register = true;

export default handler;