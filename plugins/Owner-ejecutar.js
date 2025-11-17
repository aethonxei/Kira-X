import { exec } from 'child_process';

let handler = async (m, { conn, text }) => {
  if (!text) {
    throw 'You must enter the command you wish to execute on the server/terminal.';
  }

  m.reply('Executing command...');

  exec(text, (err, stdout, stderr) => {
    let response = '';
    if (err) {
      response += `Error:\n${err}`;
    }
    if (stderr) {
      response += `\nStderr:\n${stderr}`;
    }
    if (stdout) {
      response += `\nStdout:\n${stdout}`;
    }

    conn.reply(m.chat, response.trim() || 'Command executed without output.', m);
  });
};

handler.help = ['exec <comando>'];
handler.tags = ['owner'];
handler.command = ['execute', 'exec'];
handler.rowner = true;

export default handler;
