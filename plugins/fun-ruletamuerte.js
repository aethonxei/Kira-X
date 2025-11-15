import { delay } from '@whiskeysockets/baileys';

const salasRuleta = {};

const handler = async (m, { conn }) => {
    const chatId = m.chat;
    const senderId = m.sender;

    if (salasRuleta[chatId]) 
        return conn.reply(m.chat, '✧ There is already an active room in this group, please wait for it to finish..', m);

    salasRuleta[chatId] = { jugadores: [senderId], estado: 'waiting' };

    await conn.sendMessage(m.chat, { 
        text: `✦ *Roulette of Death* ✦\n\n@${senderId.split('@')[0]} I start a game room.\n> ❀ To participate, reply with *I accept* to enter. Time remaining: 60 seconds...`, 
        mentions: [senderId] 
    }, { quoted: m });

    await delay(60000);
    if (salasRuleta[chatId] && salasRuleta[chatId].estado === 'waiting') {
        delete salasRuleta[chatId];
        await conn.sendMessage(m.chat, { text: '✦ Nobody accepted the challenge, the room has been closed.' });
    }
};

handler.command = ['rouletteofdeath'];
handler.botAdmin = true

export default handler;

handler.before = async (m, { conn }) => {
    const chatId = m.chat;
    const senderId = m.sender;
    const texto = m.text?.toLowerCase();

    if (!salasRuleta[chatId]) return

    if (texto === 'accept' || texto === 'accepted') {
        if (salasRuleta[chatId].jugadores.length >= 2) 
            return conn.reply(m.chat, '✧ There are already two players in this room.', m);

        if (senderId === salasRuleta[chatId].jugadores[0])
            return conn.reply(m.chat, '✧ You cannot accept your own challenge.', m);

        salasRuleta[chatId].jugadores.push(senderId);
        salasRuleta[chatId].estado = 'complete';

        await conn.sendMessage(m.chat, { 
            audio: { url: "https://qu.ax/iwAmy.mp3" }, 
            mimetype: "audio/mp4", 
            ptt: true 
        });

        await conn.sendMessage(m.chat, { 
            text: '✦ *Roulette of Death* ✦\n\n❀ The room is full!\n\n> ✧ Selecting the loser...' 
        });

        const loadingMessages = [
            "《 █▒▒▒▒▒▒▒▒▒▒▒》10%\n- Calculating probabilities...",
            "《 ████▒▒▒▒▒▒▒▒》30%\n- The death is cast...",
            "《 ███████▒▒▒▒▒》50%\n- The death is cast...",
            "《 ██████████▒▒》80%\n- We'll soon know who the loser is!",
            "《 ████████████》100%\n- Final results!"
        ];

        let { key } = await conn.sendMessage(m.chat, { text: "✧ Calculating result!" }, { quoted: m });

        for (let msg of loadingMessages) {
            await delay(3000);
            await conn.sendMessage(m.chat, { text: msg, edit: key }, { quoted: m });
        }

        const [jugador1, jugador2] = salasRuleta[chatId].jugadores;
        const perdedor = Math.random() < 0.5 ? jugador1 : jugador2;

        await conn.sendMessage(m.chat, { 
            text: `✦ *Final verdict* ✦\n\n@${perdedor.split('@')[0]} is the loser.\n\n> ❀ You have 60 seconds for your last words...`, 
            mentions: [perdedor] 
        });

        await delay(60000);        
            await conn.groupParticipantsUpdate(m.chat, [perdedor], 'remove');
            await conn.sendMessage(m.chat, { 
                text: `❀ @${perdedor.split('@')[0]} has been eliminated. Game over.`, 
                mentions: [perdedor] 
            });        
        delete salasRuleta[chatId];
    }

    if (texto === 'decline' && senderId === salasRuleta[chatId].jugadores[0]) {
        delete salasRuleta[chatId];
        await conn.sendMessage(m.chat, { text: '✧ The game has been cancelled by the challenger.' });
    }
};
