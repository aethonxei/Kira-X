const handler = async (m, { conn, command, usedPrefix }) => {

const user = global.db.data.users[m.sender];

if (!user.genre) {
return conn.reply(m.chat, `${emoji2} You do not have an assigned gender..`, m)
}

user.genre = '';

return conn.reply(m.chat, `${emoji} Your gender has been removed.`, m)
};

handler.help = ['delgenre']
handler.tags = ['rg']
handler.command = ['delgenero', 'delgenre']
export default handler;
