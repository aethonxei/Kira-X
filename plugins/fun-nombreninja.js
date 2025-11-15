function handler(m, { text }) {
if (!text) return conn.reply(m.chat, `${emoji} Please enter your name next to the command.`, m)
conn.reply(m.chat, `${emoji} Searching for the Name, please wait a moment...`, m)
let teks = text ? text : m.quoted && m.quoted.text ? m.quoted.text : m.text
m.reply(teks.replace(/[a-z]/gi, v => {
return {
'a': 'ka',
'b': 'tsu',
'c': 'mi',
'd': 'te',
'e': 'ku',
'f': 'hi',
'g': 'ji',
'h': 'ri',
'i': 'ki',
'j': 'zu',
'k': 'me',
'l': 'ta',
'm': 'rin',
'n': 'to',
'o': 'mo',
'p': 'no',
'q': 'ke',
'r': 'shi',
's': 'ari',
't': 'chi',
'u': 'do',
'v': 'ru',
'w': 'mei',
'x': 'na',
'y': 'fu',
'z': 'mori'
}[v.toLowerCase()] || v }))}

handler.help = ['ninjaname *<text>*']
handler.tags = ['fun']
handler.command = ['ninjaname']
handler.group = true;
handler.register = true

export default handler