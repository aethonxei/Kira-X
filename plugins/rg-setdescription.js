import { createHash } from 'crypto';  
import fetch from 'node-fetch';

const handler = async (m, { conn, command, usedPrefix, text }) => {

let user = global.db.data.users[m.sender];

if (user.description) {
return conn.reply(m.chat, `${emoji2} You already have a description set up; if you want to delete the current description, use:\n> » ${usedPrefix}deldescription`, m);
}

if (!text) return conn.reply(m.chat, `${emoji}︎ You must provide a valid description for your profile..\n\n> ✐ Example » *${usedPrefix + command} Hi, I use WhatsApp!*`, m);

user.description = text;

return conn.reply(m.chat, `${emoji} Your description has been set..\n\n> *${user.description}*`, m);
};

handler.help = ['setdescription']
handler.tags = ['rg']
handler.command = ['setdescription', 'setdesc']
export default handler;