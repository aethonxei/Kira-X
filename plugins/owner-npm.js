import { exec } from 'child_process';

let handler = async (m, { conn }) => {
  m.reply(`${emoji2} installing dependencies...`);

  exec('npm install ytdl-core sharp', (err, stdout, stderr) => {
    if (err) {
      conn.reply(m.chat, `${msm} installation log:.\nReason: ${err.message}`, m);
      return;
    }

    if (stderr) {
      console.warn('Warning during dependency installation:', stderr);
    }

    if (stdout.includes('Already up to date.')) {
      conn.reply(m.chat, `${emoji4} The bot is now updated.`, m);
    } else {
      conn.reply(m.chat, `${emoji} complete installation.\n\n${stdout}`, m);
    }
  });
};

handler.help = ['npm install'];
handler.tags = ['owner'];
handler.command = ['npm'];
handler.rowner = true;

export default handler;
