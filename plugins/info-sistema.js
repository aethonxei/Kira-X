import os from 'os';
import { execSync } from 'child_process';

const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

const getDiskSpace = () => {
    try {
        const stdout = execSync('df -h | grep -E "^/dev/root|^/dev/sda1"').toString();
        const [ , size, used, available, usePercent ] = stdout.split(/\s+/);
        return { size, used, available, usePercent };
    } catch (error) {
        console.error('✧ Error obtaining disk space:', error);
        return null;
    }
};

const handler = async (m, { conn }) => {
    const totalMem = os.totalmem();
    const freeMem = os.freemem();
    const usedMem = totalMem - freeMem;
    const _muptime = process.uptime() * 1000
    const muptime = clockString(_muptime)
    const hostname = os.hostname();
    const platform = os.platform();
    const arch = os.arch();
    const nodeUsage = process.memoryUsage();
    const diskSpace = getDiskSpace();

    const message = `${done} *SYSTEM STATE*

⚜️ *Host ⪼* ${hostname}
🏆 *Platform ⪼* ${platform}
💫 *Architecture ⪼* ${arch}
🥷 *Total Ram ⪼* ${formatBytes(totalMem)}
🚀 *Free RAM ⪼* ${formatBytes(freeMem)}
⌛️ *Used RAM ⪼* ${formatBytes(usedMem)}
🕒 *Active Time ⪼* ${muptime}

💻 *Nodejs Memory Usage:* 
→ RSS: ${formatBytes(nodeUsage.rss)}
→ Total Heap: ${formatBytes(nodeUsage.heapTotal)}
→ Used Heap: ${formatBytes(nodeUsage.heapUsed)}
→ External: ${formatBytes(nodeUsage.external)}
→ Arrangements: ${formatBytes(nodeUsage.arrayBuffers)}
${diskSpace ? `

☁️ *Disk Space:*
→ Total Size: ${diskSpace.size}
→ Used: ${diskSpace.used}
→ Available: ${diskSpace.available}
→ Percentage of Use: ${diskSpace.usePercent}` : 'Error.'}
`;

    await conn.reply(m.chat, message.trim(), m, );
};

handler.help = ['sistema'];
handler.tags = ['info'];
handler.command = ['system', 'sistema'];
handler.register = true;

export default handler;

function clockString(ms) {
let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')}