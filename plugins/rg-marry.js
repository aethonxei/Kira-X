/* Original Destroy code, adapted and improve by aethonxei.
*/

import fs from 'fs';
import path from 'path';

const marriagesFile = path.resolve('src/database/casados.json'); 
let proposals = {}; 
let marriages = loadMarriages();
const confirmation = {};

function loadMarriages() {
    try {
        return fs.existsSync(marriagesFile) ? JSON.parse(fs.readFileSync(marriagesFile, 'utf8')) : {};
    } catch (e) {
        console.error("Error loading casados.json:", e);
        return {};
    }
}

function saveMarriages() {
    try {
        fs.writeFileSync(marriagesFile, JSON.stringify(marriages, null, 2));
    } catch (e) {
        console.error("Error saving casados.json:", e);
    }
}

const handler = async (m, { conn, command }) => {
    const isPropose = /^marry$/i.test(command);
    const isDivorce = /^divorce$/i.test(command);

    const userIsMarried = (user) => marriages[user] !== undefined;

    try {
        if (isPropose) {
            const proposee = m.quoted?.sender || m.mentionedJid?.[0];
            const proposer = m.sender;

            if (!proposee) {
                if (userIsMarried(proposer)) {
                    return await conn.reply(m.chat, `《✧》 You're already married to *${conn.getName(marriages[proposer].partner)}*\n> You can get a divorce with the command: *#divorce*`, m);
                } else {
                    throw new Error('You must mention someone to accept or propose marriage.\n> *Example:* #marry @User');
                }
            }
            
            if (userIsMarried(proposer)) throw new Error(`You're already married to ${conn.getName(marriages[proposer].partner)}.`);
            if (userIsMarried(proposee)) throw new Error(`${conn.getName(proposee)} is already married to ${conn.getName(marriages[proposee].partner)}.`);
            if (proposer === proposee) throw new Error('You cant propose to yourself! zmlti al9lawi');
            if (confirmation[proposee]) throw new Error(`That person already has a pending marriage proposal..`)

            proposals[proposer] = proposee;
            const proposerName = conn.getName(proposer);
            const proposeeName = conn.getName(proposee);


            const confirmationMessage = `♡ ${proposerName} has proposed to you, ${proposeeName} 💍\n\nDo you accept?? •(=^●ω●^=)•`;

            const buttons = [
                { buttonId: 'marry_accept', buttonText: { displayText: 'Yes, I accept 💞' }, type: 1 },
                { buttonId: 'marry_reject', buttonText: { displayText: 'No, sorry 💔' }, type: 1 }
            ];

            const fkont = {
                key: {
                    fromMe: false,
                    participant: '0@s.whatsapp.net',
                    remoteJid: 'status@broadcast'
                },
                message: {
                    "contactMessage": {
                        "displayName": "💍 PROPOSAL 💍",
                        "vcard": "BEGIN:VCARD\nVERSION:3.0\nN:;Test;;;\nFN:Test\nORG:Test\nTITLE:\nTEL;type=CELL;type=VOICE;waid=0:+0\nEND:VCARD"
                    }
                }
            };

            await conn.sendMessage(m.chat, {
                text: confirmationMessage,
                buttons: buttons,
                footer: 'You have 60 seconds to respond',
                mentions: [proposee, proposer]
            }, { quoted: fkont });

            confirmation[proposee] = {
                proposer,
                timeout: setTimeout(() => {
                    conn.sendMessage(m.chat, { text: '*《✧》Time ran out, there was no response. The marriage proposal was canceled..*' }, { quoted: m });
                    delete confirmation[proposee];
                }, 60000)
            };

        } else if (isDivorce) {
            if (!userIsMarried(m.sender)) throw new Error('You are not married to anyone.');

            const partner = marriages[m.sender].partner;
            delete marriages[m.sender];
            delete marriages[partner];
            saveMarriages();

            if (global.db.data.users[m.sender]) global.db.data.users[m.sender].marry = '';
            if (global.db.data.users[partner]) global.db.data.users[partner].marry = '';

            await conn.reply(m.chat, `✐ ${conn.getName(m.sender)} and ${conn.getName(partner)} have divorced. 💔`, m);
        }
    } catch (error) {
        await conn.reply(m.chat, `《✧》 ${error.message}`, m);
    }
};

handler.before = async (m, { conn }) => {
    if (m.isBaileys) return;
    
    if (!(m.sender in confirmation)) return;
    
    if (!m.text) return; 

    const respuesta = m.text.trim();
    const { proposer, timeout } = confirmation[m.sender];

    if (respuesta === 'marry_reject') {
        clearTimeout(timeout);
        delete confirmation[m.sender];
        return conn.sendMessage(m.chat, { text: `《✧》 ${conn.getName(m.sender)} rejected the marriage proposal 💔` }, { quoted: m, mentions: [m.sender, proposer] });
    }

    if (respuesta === 'marry_accept') {
        clearTimeout(timeout);
        delete confirmation[m.sender];
        delete proposals[proposer];

        const fecha = Date.now();

        marriages[proposer] = { partner: m.sender, date: fecha };
        marriages[m.sender] = { partner: proposer, date: fecha };
        saveMarriages();

        if (global.db?.data?.users[proposer]) global.db.data.users[proposer].marry = m.sender;
        if (global.db?.data?.users[m.sender]) global.db.data.users[m.sender].marry = proposer;

        await conn.sendMessage(m.chat, {
            text: `✩.･:｡≻───── ⋆♡⋆ ─────.•:｡✩
💞 They're married! ฅ^•ﻌ•^ฅ*:･ﾟ✧

*•.¸♡ Husband:* ${conn.getName(proposer)}
*•.¸♡ Wife:* ${conn.getName(m.sender)}

🎉 Enjoy your honeymoon! 🍓💍
✩.･:｡≻───── ⋆♡⋆ ─────.•:｡✩`,
            mentions: [proposer, m.sender]
        }, { quoted: m });
    }
};

handler.tags = ['fun'];
handler.help = ['marry *@user*', 'divorce'];
handler.command = ['marry', 'divorce'];
handler.group = true;

export default handler;