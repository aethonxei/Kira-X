import { createHash } from 'crypto';  
import fetch from 'node-fetch';

const handler = async (m, { conn, command, usedPrefix, text }) => {

let user = global.db.data.users[m.sender];

if (user.genre) {
return conn.reply(m.chat, `${emoji2} You already have a set gender; if you want to delete the current gender, use:\n> » ${usedPrefix}delgenre`, m);
}

if (!text) return conn.reply(m.chat, `${emoji} You must enter a valid gender.\n> Example » *${usedPrefix + command} man*`, m);

function asignarGenre(text) {
let genre;
switch (text.toLowerCase()) {
case "male":
genre = "Male";
break;
case "female":
genre = "Female";
break;
default:
return null;
}
return genre;
}

let genre = asignarGenre(text);
if (!genre) {
return conn.reply(m.chat, `${emoji2} Remember to choose a valid genre.\n> Example: ${usedPrefix + command} male`, m);
}

user.genre = genre;

return conn.reply(m.chat, `${emoji} Your gender has been established as: *${user.genre}*!`, m);
};

handler.help = ['setgenre']
handler.tags = ['rg']
handler.command = ['setgenero', 'setgenre', 'setgender']
export default handler;
