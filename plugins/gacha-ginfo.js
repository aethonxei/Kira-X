import { promises as fs } from 'fs';

import { cooldowns as rwCooldowns } from './gacha-rollwaifu.js';
import { cooldowns as claimCooldowns } from './gacha-claim.js';
import { cooldowns as voteCooldowns, voteCooldownTime } from './gacha-vote.js';

const charactersFilePath = './src/database/characters.json';

function formatTime(ms) {
    if (!ms || ms <= 0) return 'Now.';
    const totalSeconds = Math.ceil(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes} minutes ${seconds} seconds`;
}

let handler = async (m, { conn }) => {
    const userId = m.sender;
    const now = Date.now();
    let userName;

    try {
        userName = await conn.getName(userId);
    } catch {
        userName = userId;
    }

    try {
        const rwExpiration = rwCooldowns?.[userId] || 0;
        const rwRemaining = rwExpiration - now;
        const rwStatus = formatTime(rwRemaining);

        const claimExpiration = claimCooldowns?.[userId] || 0;
        const claimRemaining = claimExpiration - now;
        const claimStatus = formatTime(claimRemaining);

        let voteStatus = 'Now.';
        if (voteCooldowns && typeof voteCooldowns.get === 'function') {
            const lastVoteTime = voteCooldowns.get(userId);
            if (lastVoteTime) {
                const voteExpiration = lastVoteTime + (voteCooldownTime || 0);
                const voteRemaining = voteExpiration - now;
                voteStatus = formatTime(voteRemaining);
            }
        }

        let allCharacters = [];
        try {
            const data = await fs.readFile(charactersFilePath, 'utf-8');
            allCharacters = JSON.parse(data);
        } catch (e) {
            console.error('❌ Error reading characters.json:', e.message);
            return conn.reply(m.chat, '《✧》There was an error loading the character database.', m);
        }

        const userCharacters = allCharacters.filter(c => c.user === userId);
        const claimedCount = userCharacters.length;
        const totalCharacters = allCharacters.length;

        const totalValue = userCharacters.reduce((sum, char) => {
            return sum + (Number(char.value) || 0);
        }, 0);

        let response = `*❀ User \`<${userName}>\`*\n\n`;
        response += `ⴵ RollWaifu » *${rwStatus}*\n`;
        response += `ⴵ Claim » *${claimStatus}*\n`;
        response += `ⴵ Vote » *${voteStatus}*\n\n`;
        response += `♡ Claimed characters » *${claimedCount} / ${totalCharacters}*\n`;
        response += `✰ Total value » *${totalValue.toLocaleString('en-US')}*`;

        await conn.reply(m.chat, response, m);

    } catch (e) {
        console.error('❌ Error in ginfo handler:', e);
        await conn.reply(m.chat, '✘ An error occurred while verifying your status..', m);
    }
};

handler.help = ['estado', 'status', 'cooldowns', 'cd'];
handler.tags = ['info'];
handler.command = ['infogacha', 'ginfo', 'gachainfo'];
handler.group = true;
handler.register = true;

export default handler;
