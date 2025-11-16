import { areJidsSameUser } from '@whiskeysockets/baileys';

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
const emoji = '👻', emoji2 = '📜', emoji3 = '⚰️', advertencia = '⚠️';

const handler = async (m, { conn, participants, command, text }) => {
  const groupMetadata = await conn.groupMetadata(m.chat);
  const botNumber = conn.user.jid;
  const participantes = participants.map(p => p.id);

  const cantidad = text && !isNaN(text) ? parseInt(text) : participantes.length;
  const fantasmas = [];

  for (let i = 0; i < cantidad; i++) {
    const id = participantes[i];
    const user = global.db.data.users?.[id];
    const miembro = participants.find(p => areJidsSameUser(p.id, id));

    const esAdmin = miembro?.admin === 'admin' || miembro?.admin === 'superadmin';

    if (!esAdmin && (!user || user.chat === 0) && !user?.whitelist) {
      fantasmas.push(id);
    }
  }

  if (command === 'ghosts') {
    if (!fantasmas.length) {
      return conn.reply(m.chat, `${emoji} *No ghosts detected!*`, m);
    }

    const texto = `╭━━━〔 𝔻𝔼𝕋𝔼ℂ𝕋𝕆ℝ 👻 〕━━⬣
┃ ${emoji2} *List of Ghosts:*\n${fantasmas.map(u => '┃ ⊳ @' + u.split('@')[0]).join('\n')}
┃
┃ ${advertencia} *Note:* This list is based on activity recorded since the bot joined the group.
╰━━━━━━━━━━━━━━━━━━━━⬣`;

    return conn.reply(m.chat, texto, m, { mentions: fantasmas });
  }

  if (command === 'kickghosts') {
    if (!fantasmas.length) {
      return conn.reply(m.chat, `${emoji} *There are no ghosts to eliminate*, the group is active.`, m);
    }

    const texto = `╭────〔 𝔼𝕃𝕀𝕄𝕀ℕ𝔸𝕋𝕀𝕆ℕ ${emoji3} 〕────⬣
┃ Detected *${fantasmas.length} ghosts*
┃ Starting purge in *5 seconds...*
┃
┃ ${emoji2} *Expulsion list:*\n${fantasmas.map(u => '┃ ⊳ @' + u.split('@')[0]).join('\n')}
╰━━━━━━━━━━━━━━━━━━━━⬣`;

    await conn.reply(m.chat, texto, m, { mentions: fantasmas });
    await delay(5000);

    let errores = 0;
    for (const id of fantasmas) {
      try {
        const miembro = participants.find(p => areJidsSameUser(p.id, id));
        const esAdmin = miembro?.admin === 'admin' || miembro?.admin === 'superadmin';

        if (!esAdmin && id !== botNumber) {
          await conn.groupParticipantsUpdate(m.chat, [id], 'remove');
          await delay(3000); // Wait to avoid WhatsApp limits
        }
      } catch (e) {
        console.error(`❌ Error deleting ${id}:`, e.message);
        errores++;
      }
    }

    conn.reply(m.chat, `${emoji3} *Process completed.* ${fantasmas.length - errores} deleted, ${errores} errors.`, m);
  }
};

handler.command = ['ghosts', 'kickghosts'];
handler.tags = ['grupo'];
handler.group = true;
handler.admin = true;
handler.botAdmin = true;
handler.fail = null;

export default handler;
