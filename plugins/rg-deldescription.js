import { createHash } from 'crypto';  
import fetch from 'node-fetch';

const handler = async (m, { conn }) => {
let user = global.db.data.users[m.sender];

if (!user.description) {
return conn.reply(m.chat, `${emoji2} You don't have a description that can be deleted..`, m);
}

user.description = '';

return conn.reply(m.chat, `${emoji} Your description has been removed.`, m);
};

handler.help = ['deldescription']
handler.tags = ['rg']
handler.command = ['deldescription', 'deldesc']
export default handler;