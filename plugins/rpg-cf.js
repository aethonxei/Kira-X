let handler = async (m, { conn, text, usedPrefix, command }) => {
  let [eleccion, cantidad] = text.trim().split(' ');

  if (!eleccion || !cantidad) {
    return m.reply(`${emoji} Please choose *heads* or *tails* and an amount of ${m.moneda} to bet.\nExample: *${usedPrefix + command} heads 5000*`);
  }

  eleccion = eleccion.toLowerCase();
  cantidad = parseInt(cantidad);

  if (!['heads', 'tails'].includes(eleccion)) {
    return m.reply(`${emoji2} Invalid choice. Use *heads* or *tails*.\nExample: *${usedPrefix + command} heads 5000*`);
  }

  if (isNaN(cantidad) || cantidad <= 0) {
    return m.reply(`${emoji2} You must enter a valid amount greater than zero.\nExample: *${usedPrefix + command} heads 5000*`);
  }

  let user = global.db.data.users[m.sender];
  if (!user || user.coin < cantidad) {
    return m.reply(`${emoji2} You don't have enough. ${m.moneda} to bet. You have *${user.coin.toLocaleString()} ${m.moneda}*.`);
  }

  // Random result
  let resultado = Math.random() < 0.5 ? 'heads' : 'tails';

  if (resultado === eleccion) {
    let ganancia = Math.floor(cantidad + Math.random() * cantidad * 1.25);
    user.coin += ganancia;

    return conn.reply(m.chat,
`「✿」The currency has fallen in *${resultado.toUpperCase()}* and you've won *¥${ganancia.toLocaleString()} ${m.moneda}*! 🍀
> Your choice was *${eleccion.toUpperCase()}*
✨ Luck was on your side!! ✨`, m);
  } else {
    let perdida = Math.floor(cantidad + Math.random() * cantidad * 0.75);
    user.coin -= perdida;

    return conn.reply(m.chat,
`🥀 The currency fell *${resultado.toUpperCase()}* and you lost *¥${perdida.toLocaleString()} ${m.moneda}*...
> You had chosen *${eleccion.toUpperCase()}*
💔 Keep trying, don't give up!!`, m);
  }
};

handler.help = ['ht <heads|tails> <amount>']
handler.tags = ['economy']
handler.command = ['ht', 'luck', 'headstails']
handler.group = true
handler.register = true

export default handler;