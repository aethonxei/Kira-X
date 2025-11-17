import { readdirSync, statSync, unlinkSync, existsSync, readFileSync, watch, rmSync, promises as fsPromises } from "fs";
const fs = { ...fsPromises, existsSync };
import path, { join } from 'path';
import ws from 'ws';

let handler = async (m, { conn: _envio, command, usedPrefix, args, text, isOwner }) => {
  const isDeleteSession = /^(deletesesion|deletebot|deletesession|deletesesaion)$/i.test(command);
  const isPauseBot = /^(stop|pausarai|pausarbot)$/i.test(command);
  const isShowBots = /^(bots|sockets|socket)$/i.test(command);

  const reportError = async (e) => {
    await m.reply(`⚠️ An unexpected error occurred, I'm very sorry....`)
    console.error(e);
  };

  switch (true) {
    case isDeleteSession: {
      const who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
      const uniqid = `${who.split('@')[0]}`;
      const dirPath = `./${jadi}/${uniqid}`;

      if (!await fs.existsSync(dirPath)) {
        await conn.sendMessage(m.chat, {
          text: `🚫 *Session not found*\n\n✨ You do not have an active session.\n\n🔰 You can create one with:\n*${usedPrefix}qr*\n\n📦 Do you have an ID??\nUse this command followed by the ID:\n*${usedPrefix}code* \`\`\`(ID)\`\`\``
        }, { quoted: m });
        return;
      }

      if (global.conn.user.jid !== conn.user.jid) {
        await conn.sendMessage(m.chat, {
          text: `💬 This command can only be used from the *Main Bot*.\n\n🔗 Access it from here:\nhttps://api.whatsapp.com/send/?phone=${global.conn.user.jid.split`@`[0]}&text=${usedPrefix + command}&type=phone_number&app_absent=0`
        }, { quoted: m });
        return;
      }

      await conn.sendMessage(m.chat, {
        text: `🗑️ Your session as a *Sub-Bot* has been successfully deleted.`
      }, { quoted: m });

      try {
        fs.rmdir(`./${jadi}/${uniqid}`, { recursive: true, force: true });
        await conn.sendMessage(m.chat, {
          text: `🌈 Everything's clean! Your session and all traces of it have been completely erased.`
        }, { quoted: m });
      } catch (e) {
        reportError(e);
      }
      break;
    }

    case isPauseBot: {
      if (global.conn.user.jid == conn.user.jid) {
        conn.reply(m.chat, `🚫 You cannot pause the main bot.\n🛟 If you wish to become a *Sub-Bot*, contact the main number.`, m);
      } else {
        await conn.reply(m.chat, `🔕 *${botname} has been paused.*`, m);
        conn.ws.close();
      }
      break;
    }

    case isShowBots: {
      const users = [...new Set([...global.conns.filter(conn => conn.user && conn.ws.socket && conn.ws.socket.readyState !== ws.CLOSED)])];

      const convertirMsAFormato = (ms) => {
        if (!ms || ms < 1000) return 'Just logged on';
        let segundos = Math.floor(ms / 1000);
        let minutos = Math.floor(segundos / 60);
        let horas = Math.floor(minutos / 60);
        let días = Math.floor(horas / 24);
        
        segundos %= 60;
        minutos %= 60;
        horas %= 24;

        const parts = [];
        if (días > 0) parts.push(`${días}d`);
        if (horas > 0) parts.push(`${horas}h`);
        if (minutos > 0) parts.push(`${minutos}m`);
        if (segundos > 0) parts.push(`${segundos}s`);
        
        return parts.join(', ') || 'Right now';
      };

      const listaSubBots = users.map((v, i) => {
          const uptime = v.uptime ? convertirMsAFormato(Date.now() - v.uptime) : 'Unknown';
          const numero = v.user.jid.split('@')[0];
          const nombre = v.user.name || 'Unnamed';
          return `╭━ • 🤖 *SUB-BOT ${i + 1}* • ━
│➤ *User:* ${nombre}
│➤ *Number:* wa.me/${numero}
│➤ *Uptime:* ${uptime}
╰━━━━━━━━━━━━━`;
        }).join('\n\n');

      const finalMessage = users.length > 0
        ? listaSubBots
        : '💤 There are currently no Sub-Bots connected.';

      const msg = `*CONNECTED SUB-BOTS* ✨
      
Here is the list of bots that are currently active..

*Total Connected:* ${users.length}
${users.length > 0 ? '\n───────────────\n' : ''}
${finalMessage}

*Note:* The main bot is not responsible for the use given to the Sub-Bots.`.trim();

      await _envio.sendMessage(m.chat, {
        image: { url: 'https://files.catbox.moe/9wlmu9.jpg' },
        caption: msg,
        mentions: _envio.parseMention(msg)
      }, { quoted: m });
      
      break;
    }
  }
};

handler.tags = ['serbot'];
handler.help = ['sockets', 'deletesesion', 'pausarai'];
handler.command = [
  'deletesesion', 'deletebot', 'deletesession', 'deletesesaion',
  'stop', 'pausarai', 'pausarbot',
  'bots', 'sockets', 'socket'
];

export default handler;