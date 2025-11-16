let handler = async (m, { conn, text, usedPrefix, command, isOwner, isAdmin, isROwner }) => {
if (!(isOwner || isAdmin || isROwner)) {
conn.reply(m.chat, `${emoji2} Sorry, you can't customize the autoresponder in this group/chat..`, m)
}
const chatData = global.db.data.chats[m.chat]
if (text) {
if (chatData.sAutoresponder) return conn.reply(m.chat, `${emoji} A prompt is already in use; if you want to configure another one, type: *${usedPrefix + command}, Do it without text..*`, m)

chatData.sAutoresponder = text
conn.reply(m.chat, `${emoji} Configuration successful.\n\n${emoji2} If the autoresponder is disabled, enable it using:\n> » *${usedPrefix}autoresponder*`, m)
} else {
if (chatData.sAutoresponder) {
chatData.sAutoresponder = ''
conn.reply(m.chat, "🗑️ Prompt successfully deleted.", m)
} else {
conn.reply(m.chat, `${emoji2} There is no custom prompt in this chat..\n\n${emoji} You can customize the autoresponder using:\n> » *${usedPrefix + command} + text that you want to interact with.*`, m)
}}
}

handler.tags = ['info']
handler.help = ['editautoresponder']
handler.command = ['editautoresponder', 'autoresponder2']

export default handler