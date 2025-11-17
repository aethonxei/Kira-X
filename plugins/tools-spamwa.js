const handler = async (m, {conn, text}) => {
const [nomor, pesan, jumlah] = text.split('|');

if (!nomor) return conn.reply(m.chat, `${emoji} Please enter a number to send spam.`, m);

if (!pesan) return conn.reply(m.chat, `${emoji} Proper Use:\n\n> ${emoji2} #spamwa number|text|amount`, m);

if (jumlah && isNaN(jumlah)) return conn.reply(m.chat, `${emoji2} The amount must be a number.`, m);

const fixedNumber = nomor.replace(/[-+<>@]/g, '').replace(/ +/g, '').replace(/^[0]/g, '62') + '@s.whatsapp.net';
const fixedJumlah = jumlah ? jumlah * 1 : 10;

if (fixedJumlah > 999) return conn.reply(m.chat, `${emoji3} Minimum 50 characters.`, m);

await conn.reply(m.chat, `${emoji4} The spam was successfully sent.`, m);
for (let i = fixedJumlah; i > 1; i--) {
if (i !== 0) conn.reply(fixedNumber, pesan.trim(), null);
}
};
handler.help = ['spamwa <number>|<mesage>|<number of messages>'];
handler.tags = ['tools'];
handler.command = ['spam', 'spamwa'];
handler.premium = true;
export default handler;