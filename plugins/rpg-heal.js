let handler = async (m, { conn }) => {
    let user = global.db.data.users[m.sender];

    if (!user) {
        return conn.reply(m.chat, `✧⃝❛ The user is not registered in the database.`, m);
    }

    const costoCura = 1000;
    const cura = 75;

    if (user.coin < costoCura) {
        return conn.reply(m.chat, `💔 You don't have enough. *${m.moneda}* to heal you.\nYou need at least *¥${costoCura.toLocaleString()} ${m.moneda}*.`, m);
    }

    user.health += cura;
    user.coin -= costoCura;

    if (user.health > 100) user.health = 100;

    user.lastHeal = new Date();

    const mensaje = `
╭───────❍
│🌸 *Successful cure!*  
│❤️ *+${cura}* restored hit points
│💸 *Cost:* ¥${costoCura.toLocaleString()} ${m.moneda}
╰──────────❍

🏷️ *Current state*
› ❤️ Life: *${user.health}/100*
› 💰 Coins: *¥${user.coin.toLocaleString()} ${m.moneda}*
`;

    await conn.sendMessage(m.chat, { text: mensaje.trim() }, { quoted: m });
};

handler.help = ['heal'];
handler.tags = ['rpg'];
handler.command = ['heal', 'curar'];
handler.group = true;
handler.register = true;

export default handler;