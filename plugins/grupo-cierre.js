

const handler = async (m, { conn, args, usedPrefix, command, isAdmin, isOwner }) => {
  const customEmoji = global.db.data.chats[m.chat]?.customEmoji || '⏰';
  m.react(customEmoji);

  if (!(isAdmin || isOwner)) {
    global.dfail('admin', m, conn);
    throw false;
  }

  if (!conn.groupMetadata || !m.isGroup) throw '*This command only works in groups..*';

  const chat = await conn.groupMetadata(m.chat);
  const botAdmin = chat.participants.find(p => p.id === conn.user.jid)?.admin;
  if (!botAdmin) throw '*I need to be an administrator to close the group.*';

  if (args.length < 3) {
    throw `*Example of use:*\n${usedPrefix + command} Morocco 9:00 am`;
  }

  const zonas = {
    argentina: -3,
    mexico: -6,
    chile: -4,
    colombia: -5,
    españa: 2,
    peru: -5,
    uruguay: -3,
    bolivia: -4,
    venezuela: -4,
    paraguay: -4,
    ecuador: -5,
    panama: -5,
    costa_rica: -6,
    honduras: -6,
    guatemala: -6,
    el_salvador: -6,
    nicaragua: -6,
    republica_dominicana: -4,
    cuba: -4,
    brasil: -3,
    estados_unidos: -4, // Eastern Time
  };

  const zona = args[0].toLowerCase();
  if (!zonas[zona]) {
    throw `*Time zone not valid.*\nValid areas: ${Object.keys(zonas).map(z => `\`${z}\``).join(', ')}`;
  }

  const horaTexto = args[1];
  const ampm = (args[2] || '').toLowerCase();
  if (!horaTexto.match(/^([0-1]?[0-9]):([0-5][0-9])$/) || !['am', 'pm'].includes(ampm)) {
    throw '*Invalid time format. Example: 9:00 am*';
  }

  let [hora, minuto] = horaTexto.split(':').map(n => parseInt(n));
  if (ampm === 'pm' && hora !== 12) hora += 12;
  if (ampm === 'am' && hora === 12) hora = 0;

  const ahora = new Date();
  const tiempoDestino = new Date(ahora);
  tiempoDestino.setUTCHours(hora - zonas[zona], minuto, 0, 0);

  const diferencia = tiempoDestino.getTime() - ahora.getTime();
  if (diferencia <= 0) throw '*The time must be later than the current time..*';

  await m.reply(`✅ The group will be *automatically closed* today at *${horaTexto} ${ampm.toUpperCase()}* in time zone *${zona.toUpperCase()}*.`);

  setTimeout(async () => {
    await conn.groupSettingUpdate(m.chat, 'announcement'); // admin-only mode
    await conn.sendMessage(m.chat, { text: '🔒 *The group has been automatically closed.*' });
  }, diferencia);
};

handler.help = ['scheduleclosure <area> <hour> <am/pm>'];
handler.tags = ['group'];
handler.command = ['scheduleclosure', 'closegroup'];
handler.admin = true;
handler.group = true;

export default handler;
