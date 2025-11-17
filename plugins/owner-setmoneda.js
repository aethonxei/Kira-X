let handler = async (m, { conn, text, isROwner }) => {
  if (!isROwner && m.sender !== conn.user.jid) {
      throw `This command can only be used by the bot owner.`;
  }

  let settings = global.db.data.settings[conn.user.jid];

  if (!settings) {
    global.db.data.settings[conn.user.jid] = {};
    settings = global.db.data.settings[conn.user.jid];
  }

  if (!text) {
    const currentMoneda = settings.moneda || 'Not established';
    return m.reply(
`*–––––『 BOT COIN 』–––––*

Please provide a name for the currency.
> *Example:* #setcurrency Diamonds 

*Current currency:* ${currentMoneda}`
    );
  }

  settings.moneda = text.trim();

  m.reply(`✅ The currency name for this bot has been changed to: *${settings.moneda}*`);
};

handler.help = ['setcurrency <name>'];
handler.tags = ['owner'];
handler.command = ['setcurrency'];

export default handler;