import { createHash } from 'crypto';  
import fetch from 'node-fetch';

const handler = async (m, { conn, command, usedPrefix, text }) => {

let user = global.db.data.users[m.sender];

if (!user.birth) {
return conn.reply(m.chat, `${emoji2} You don't have a set date of birth that can be deleted..`, m);
}

user.birth = '';

return conn.reply(m.chat, `${emoji} Your date of birth has been removed.`, m);
};

handler.help = ['delbirth']
handler.tags = ['rg']
handler.command = ['delbirth']
export default handler;