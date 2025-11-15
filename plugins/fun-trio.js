let handler = async(m, { conn, text, usedPrefix, command }) => {

    if (m.mentionedJid && m.mentionedJid.length === 2) {
        let person1 = m.mentionedJid[0];
        let person2 = m.mentionedJid[1];
        let name1 = conn.getName(person1);
        let name2 = conn.getName(person2);
        let name3 = conn.getName(m.sender);
        const pp = './src/Imagen.jpg';

        let trio = `\t\t*“VIOLENT TRIOOOOO”!*
        
${name1} & ${name2} They have a *${Math.floor(Math.random() * 100)}%* compatibility as a couple.
While ${name1} & ${name3} have a *${Math.floor(Math.random() * 100)}%* compatibility.
And ${name2} & ${name3} have a *${Math.floor(Math.random() * 100)}%* compatibility.
How about a threesome? 😏`;

        conn.sendMessage(m.chat, { image: { url: pp }, caption: trio, mentions: [person1, person2, m.sender] }, { quoted: m });
    } else {
        conn.reply(m.chat, `${emoji} Mention 2 more users to calculate compatibility.`, m);
    }
}

handler.help = ['fromatrio @user1 @user2'];
handler.tags = ['fun'];
handler.command = ['formartrio']
handler.group = true;
handler.register = true;

export default handler;