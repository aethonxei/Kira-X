let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw m.reply(`${emoji} Example:\n\n${usedPrefix + command} <id> <message>\n\n*${emoji2} Use:* ${usedPrefix + command} 1234 Thank you for your confession.`);
    
    let split = text.trim().split(/ (.+)/); 
    let id = split[0]; 
    let pesan = split[1]; 

    if (!id || !pesan) throw m.reply(`${emoji} Example:\n\n${usedPrefix + command} <id> <message>\n\n*${emoji2} Use:* ${usedPrefix + command} 1234 Thank you for your confession.`);
    
    id = id.trim();
    pesan = pesan.trim();

    
    console.log("conn.menfess", conn.menfess); 
    
    if (!conn.menfess || !conn.menfess[id]) {
        throw m.reply(`${msm} Error:* No message was found with the ID *${id}*.`);
    }
    
    let { dari, penerima } = conn.menfess[id];
    
    if (m.sender !== penerima) throw m.reply(`${emoji} You do not have permission to reply to this message.`);
    
    let teks = `*Hello, you received a response to your anonymous message..*\n\n*\`ID:\`* *${id}*\n*\`ANSWER:\`* \n\n${pesan}`.trim();
    
    try {
        
        let sentMessage = await conn.sendMessage(dari, {
            text: teks,
            contextInfo: {
                mentionedJid: [dari],
                externalAdReply: {
                    title: 'A N S W E R S',
                    body: 'Thank you for using the confession service!',
                    mediaType: 1,
                    renderLargerThumbnail: true,
                    thumbnailUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIyz1dMPkZuNleUyfXPMsltHwKKdVddTf4-A&usqp=CAU',
                    sourceUrl: channel,
                }
            }
        });
        
        if (sentMessage) {
           return conn.reply(m.chat, `${emoji} Response sent successfully.\n*IDENTIFIER:*` + ` *${id}*`, m);
            
            
            conn.menfess[id].status = true;
        } else {
            throw new Error('The message could not be sent..');
        }
    } catch (e) {
        console.error(e);
        m.reply(`${msm} An error occurred while sending the reply. Please ensure the number is valid and that the sender can receive messages..`);
    }
};

handler.tags = ['rg'];
handler.help = ['confesss'].map(v => v + ' <id message>');
handler.command = ['confessionn', 'confesss']
handler.register = true;
handler.private = true;

export default handler;
