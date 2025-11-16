import { promises as fs } from 'fs';

const charactersFilePath = './src/database/characters.json';
const claimMsgFile = './src/database/userClaimConfig.json';

export const cooldowns = {};

async function loadCharacters() {
    const data = await fs.readFile(charactersFilePath, 'utf-8');
    return JSON.parse(data);
}

async function saveCharacters(characters) {
    await fs.writeFile(charactersFilePath, JSON.stringify(characters, null, 2), 'utf-8');
}

async function loadClaimMessages() {
    try {
        const data = await fs.readFile(claimMsgFile, 'utf-8');
        return JSON.parse(data);
    } catch {
        return {};
    }
}

async function getCustomClaimMessage(userId, username, characterName) {
    const messages = await loadClaimMessages();
    const template = messages[userId] || '✧ *$user* has claimed *$character* ✦';

    return template
        .replace(/\$user/g, username)
        .replace(/\$character/g, characterName);
}

let handler = async (m, { conn }) => {
    const userId = m.sender;
    const now = Date.now();

    if (cooldowns[userId] && now < cooldowns[userId]) {
        const remaining = cooldowns[userId] - now;
        const minutes = Math.floor(remaining / 60000);
        const seconds = Math.floor((remaining % 60000) / 1000);
        return conn.reply(m.chat, `⏳ You must wait *${minutes}m ${seconds}s* before claiming another waifu.`, m);
    }

    if (!m.quoted || !m.quoted.text) {
        return conn.reply(m.chat, '《✧》You must *cite a valid character* to claim it.', m);
    }

    try {
        const characters = await loadCharacters();

        const match = m.quoted.text.match(/𝙄𝘿:\s*\*([^\*]+)\*/i);
        if (!match) return conn.reply(m.chat, '《✧》The character ID could not be detected.', m);

        const id = match[1].trim();
        const character = characters.find(c => c.id === id);

        if (!character) return conn.reply(m.chat, '《✧》Character not found.', m);

        if (character.user && character.user !== userId) {
            return conn.reply(m.chat,
                `✧ The character *${character.name}* has already been claimed by @${character.user.split('@')[0]}.`,
                m,
                { mentions: [character.user] });
        }

        character.user = userId;
        character.status = 'Claimed';
        await saveCharacters(characters);

        const username = await conn.getName(userId);
        const mensajeFinal = await getCustomClaimMessage(userId, username, character.name);

        await conn.reply(m.chat, mensajeFinal, m);

        cooldowns[userId] = now + 30 * 60 * 1000; // 30 minutos

    } catch (e) {
        conn.reply(m.chat, `✘ Error claiming waifu:\n${e.message}`, m);
    }
};

handler.help = ['claim'];
handler.tags = ['waifus'];
handler.command = ['claim', 'reclamar', 'c'];
handler.group = true;

export default handler;