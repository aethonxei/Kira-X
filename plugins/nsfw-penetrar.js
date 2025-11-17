

let handler = async (m, { conn, command, text }) => {
if (!db.data.chats[m.chat].nsfw && m.isGroup) {
    return m.reply(`${emoji} *NSFW* content is disabled in this group.\n> An administrator can activate it with the command » *#nsfw on*`);
    }
    
    let user = m.mentionedJid[0] || (m.quoted ? m.quoted.sender : m.sender);
    let userName = user === m.sender ? `@${m.sender.split('@')[0]}` : `@${user.split('@')[0]}`;
    m.react('🔥');

    const responseMessage = `
*THEY'VE FILLED YOUR FACE WITH SEMEN BECAUSE YOU'RE A WHORE AND A SLUT!*

*is putting his penis in* \`${text || userName}\` *Even with the condom on until he was completely dry, you said "please harder!, ahhhhhhh, ahhhhhh, give me a son who's just as well-endowed as you!" while he was penetrating you and then left you in a wheelchair*

\`${text || userName}\` 
✿ *YOU'VE ALREADY BEEN PENETRATED!*`;

    conn.reply(m.chat, responseMessage, null, { mentions: [user] });
}

handler.help = ['penetrate @user'];
handler.tags = ['nsfw'];
handler.command = ['penetrate', 'penetrated'];
handler.register = true;
handler.group = true;
handler.fail = null;

export default handler;
