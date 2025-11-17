let linkRegex = /https:\/\/chat\.whatsapp\.com\/([0-9A-Za-z]{20,24})/i;

let handler = async (m, { conn, text, isOwner }) => {
    if (!text) return m.reply(`${emoji} You must send an invitation so that *${botname}* join the group.`);

    let [_, code] = text.match(linkRegex) || [];

    if (!code) return m.reply(`${emoji2} Invalid invitation link.`);

    if (isOwner) {
        await conn.groupAcceptInvite(code)
            .then(res => m.reply(`${emoji} I have successfully joined the group.`))
            .catch(err => m.reply(`${msm} Error joining group.`));
    } else {
        let message = `${emoji} Invitation to a group:\n${text}\n\nBy: @${m.sender.split('@')[0]}`;
        await conn.sendMessage(`${suittag}` + '@s.whatsapp.net', { text: message, mentions: [m.sender] }, { quoted: m });
        m.reply(`${emoji} The group link has been sent, thank you for your invitation. ฅ^•ﻌ•^ฅ`);
    }
};

handler.help = ['invite'];
handler.tags = ['owner', 'tools'];
handler.command = ['invite', 'join'];

export default handler;