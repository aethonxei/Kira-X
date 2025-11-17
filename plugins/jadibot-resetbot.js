let handler = async (m, { conn }) => {
    let chat = global.db.data.chats[m.chat];

    if (!chat || !chat.primaryBot) {
        return m.reply('《✧》 There is no primary bot established in this group.');
    }

    console.log(`[ResetBot] Resetting chat settings: ${m.chat}`);
    chat.primaryBot = null;

    await m.reply(`✐ Done! Settings have been reset.\n> From now on, all valid bots will respond again in this group.`);
}

handler.customPrefix = /^(resetbot|resetprimario|botreset)$/i;
handler.command = new RegExp;

handler.group = true;
handler.admin = true;

export default handler;