let handler = async (m, { conn, text, usedPrefix, command }) => {
    conn.menfess = conn.menfess ? conn.menfess : {};
    if (!text) throw m.reply(`${emoji} Example:\n\n${usedPrefix + command} message number\n\n*${emoji2} Use:* ${usedPrefix + command} ${m.sender.split`@`[0]} Hello.`);
    
    let split = text.trim().split(/ (.+)/); 
    let jid = split[0]; 
    let pesan = split[1]; 

    if (!jid || !pesan) throw m.reply(`${emoji} Example:\n\n${usedPrefix + command} message number\n\n*${emoji2} Use:* ${usedPrefix + command} ${m.sender.split`@`[0]} Hello.`);
    
    jid = jid.replace(/[^0-9]/g, '') + '@s.whatsapp.net'; 
    let data = (await conn.onWhatsApp(jid))[0] || {}; 
    if (!data.exists) throw m.reply(`${emoji2} The number is not registered on WhatsApp.`);
    if (jid == m.sender) throw m.reply(`${emoji2} You can't send yourself a message.`);
    
    let mf = Object.values(conn.menfess).find(mf => mf.status === true);
    if (mf) return !0;
    
    let id = Math.floor(1000 + Math.random() * 9000); 
    let teks = `*Hello* @${data.jid.split("@")[0]}, *You received a message of confession.*\n*To* respond\n*Example: .response <id> <Message>*\n\n*\`ID:\`* *${id}*\n*\`MESSAGE:\`* \n\n${pesan}`.trim();
    
    try {
        
        let sentMessage = await conn.sendMessage(data.jid, {
            text: teks,
            contextInfo: {
                mentionedJid: [data.jid],
                externalAdReply: {
                    title: 'C O N F E S S I O N S',
                    body: 'Reply! .response (id) (Message)',
                    mediaType: 1,
                    renderLargerThumbnail: true,
                    thumbnailUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIyz1dMPkZuNleUyfXPMsltHwKKdVddTf4-A&usqp=CAU',
                    sourceUrl: channel,
                }
            }
        });
        
        
        if (sentMessage) {
            conn.menfess[id] = {
                id,
                dari: m.sender,
                penerima: data.jid,
                pesan: pesan,
                status: false 
            };
            return conn.reply(m.chat, `${emoji} Response sent successfully.\n*IDENTIFIER:*` + ` *${id}*`, m);
        }
        
    } catch (e) {
        console.error(e);
        m.reply(`${msm} An error occurred while sending the response.`);
    }
}

handler.tags = ['rg'];
handler.help = ['confess'].map(v => v + ' <message number>');
handler.command = ['confess', 'confessions']
handler.register = true;
handler.private = true;

export default handler;
