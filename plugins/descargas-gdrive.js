import fg from 'api-dylux';

const mssg = {
    noLink: (service) => `${emoji} Please provide a link to ${service}.`,
    usage: (command, prefix) => `${emoji} Please send a Google Drive link to download the file.`,
    name: 'File name',
    size: 'File size',
    limitdl: 'Download limit',
    limitdlTe: 'You have left',
    error: '✘ An error occurred while processing your request.'
};

let free = 100; 
let prem = 500; 

let handler = async (m, { conn, args, usedPrefix, command, isOwner, isPrems }) => {
    if (!args[0]) {
        return conn.reply(m.chat, mssg.usage(command, usedPrefix), null, { quoted: m });
    }
    
    m.react(rwait); 

    try {
        let res = await fg.GDriveDl(args[0]);

        let limit = isPrems || isOwner ? prem : free;
        let isLimit = limit * 1024 < res.fileSizeB;

        await m.reply(`
≡  *Google Drive Downloads*

*✿ ${mssg.name}:* ${res.fileName}
*✎ ${mssg.size}:* ${res.fileSize}
${isLimit ? `\n✧ ${mssg.limitdl} *+${free} MB* ${mssg.limitdlTe} *${prem} MB*` : ''}
        `);
        
        if (!isLimit) {
            conn.sendMessage(m.chat, { document: { url: res.downloadUrl }, fileName: res.fileName, mimetype: res.mimetype }, { quoted: m });
        }
        m.react(done);
    } catch (error) {
        console.error(error); 
        m.reply(mssg.error); 
    }
}

handler.help = ['gdrive'];
handler.tags = ['descargas'];
handler.command = ['gdrive', 'drive'];
handler.group = true;
handler.register = true;
handler.coin = 5;

export default handler;