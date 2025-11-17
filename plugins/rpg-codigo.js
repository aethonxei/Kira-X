let handler = async (m, { conn, text }) => {
    let amount = parseInt(text.trim());

    if (isNaN(amount) || amount <= 0) {
        return conn.reply(m.chat, `${emoji} Please enter a valid amount of ${m.moneda}.`, m);
    }

    let code = Math.random().toString(36).substring(2, 10).toUpperCase();

    if (!global.db.data.codes) global.db.data.codes = {};
    global.db.data.codes[code] = { coin: amount, claimedBy: [] };

    conn.reply(m.chat, `${emoji} Generated code: *${code}*\nThis code can be redeemed for ${amount} ${m.moneda} and can be used by 50 people.`, m);
}

handler.help = ['cc <amount of coins>'];
handler.tags = ['owner'];
handler.command = ['cc']
handler.rowner = true;

export default handler;