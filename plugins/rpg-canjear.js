let handler = async (m, { conn, text }) => {
    let code = text.trim().toUpperCase();

    if (!code) {
        return conn.reply(m.chat, `${emoji} Please enter a code to redeem.`, m);
    }

    let codesDB = global.db.data.codes || {};
    let user = global.db.data.users[m.sender];

    if (!codesDB[code]) {
        return conn.reply(m.chat, `${emoji2} Invalid code.`, m);
    }

    if (codesDB[code].claimedBy.includes(m.sender)) {
        return conn.reply(m.chat, `${emoji2} You have already redeemed this code.`, m);
    }

    if (codesDB[code].claimedBy.length >= 5) {
        return conn.reply(m.chat, `${emoji2} This code is completely exhausted... Wait for the creator to release another code.`, m);
    }

    user.coin += codesDB[code].coin;
    codesDB[code].claimedBy.push(m.sender);

    let remaining = 50 - codesDB[code].claimedBy.length;

    conn.reply(m.chat, `${emoji} You have successfully redeemed the code. You have received ${codesDB[code].coin} ${m.moneda}.\nThere remain ${remaining} vacancies to redeem the code.`, m);
}

handler.help = ['redeem <code>'];
handler.tags = ['economia'];
handler.command = ['redeem'];
handler.group = true;
handler.register = true;

export default handler;