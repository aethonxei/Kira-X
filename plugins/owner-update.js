import { exec } from 'child_process';

let handler = async (m, { conn }) => {
  m.reply(`🍎 Updating the bot...`);

  const comando = 'find src -type f | xargs git update-index --assume-unchanged && git pull';

  exec(comando, (err, stdout, stderr) => {
    if (err) {
      conn.reply(m.chat, `📓 Error: The update could not be performed.\nReason: ${err.message}`, m);
      return;
    }

    if (stderr) {
      console.warn('Warning during update:', stderr);
    }

    if (stdout.includes('Already up to date.')) {
      conn.reply(m.chat, `🍎 The bot is now updated.`, m);
    } else {
      conn.reply(m.chat, `🪽 Update completed successfully.\n\n${stdout}`, m);
    }
  });
};

handler.help = ['update'];
handler.tags = ['owner'];
handler.command = ['update'];
handler.rowner = true;

export default handler;