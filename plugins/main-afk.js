export function before(m) {
const user = global.db.data.users[m.sender];
if (user.afk > -1) {
conn.reply(m.chat, `${emoji} You are no longer inactive\n${user.afkReason ? 'Afk Reason: ' + user.afkReason : ''}\n\n*Afk Time: ${(new Date - user.afk).toTimeString()}*`, m)
user.afk = -1;
user.afkReason = '';
}
const jids = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])];
for (const jid of jids) {
const user = global.db.data.users[jid];
if (!user) {
continue;
}
const afkTime = user.afk;
if (!afkTime || afkTime < 0) {
continue;
}
const reason = user.afkReason || '';
conn.reply(m.chat, `${emoji2} The user is afk. Do not tag them.`, m)
}
return true;
}