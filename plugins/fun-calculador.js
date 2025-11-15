const handler = async (m, { conn, command, text, usedPrefix }) => {
  if (!text) return conn.reply(m.chat, `🍎 Use it this way: *${usedPrefix}calculate [type] [@user | name]*\n\nExamples:\n> ${usedPrefix}calculate gay @user\n> ${usedPrefix}calculate lesbian imad`, m);

  let [tipo, ...rest] = text.split(" ");
  if (!tipo) return m.reply(`🍎 You must specify the type you want to calculate.\nExample: *${usedPrefix}calculate gay @user*`);
  let nombre = rest.join(" ");
  if (!nombre) return m.reply(`🍎 You must mention someone or write a name.\nExample: *${usedPrefix}calculate ${tipo} Imad*`);

  const percentages = (500).getRandom();
  let emoji = '';
  let description = '';

  switch (tipo.toLowerCase()) {
    case 'gay':
      emoji = '🏳️‍🌈';
      if (percentages < 50) {
        description = `💙 The calculations have shown that ${nombre.toUpperCase()} is *${percentages}%* Gay ${emoji}\n> ✰ That's low, you're a faggot, not gay!`;
      } else if (percentages > 100) {
        description = `💜 The calculations have shown that ${nombre.toUpperCase()} is *${percentages}%* Gay ${emoji}\n> ✰ Even gayer than we thought!`;
      } else {
        description = `🖤 The calculations have shown that ${nombre.toUpperCase()} is *${percentages}%* Gay ${emoji}\n> ✰ What you really are, what you really are, is gay..`;
      }
      break;
    case 'lesbian':
      emoji = '🏳️‍🌈';
      description = `💗 The calculations have shown that ${nombre.toUpperCase()} is *${percentages}%* ${tipo} ${emoji}\n> ✰ Keep the love blooming!`;
      break;
    case 'asshole':
    case 'bitch':
      emoji = '😏💦';
      description = `💞 The calculations have shown that ${nombre.toUpperCase()} is *${percentages}%* ${tipo} ${emoji}\n> ✰ Keep up the good work (alone)).`;
      break;
    case 'puto':
    case 'puta':
      emoji = '🔥🥵';
      description = `😺 The calculations have shown that ${nombre.toUpperCase()} is *${percentages}%* ${tipo} ${emoji}\n> ✰ Keep that fiery charm.!`;
      break;
    case '9wad':
    case '9a7ba':
      emoji = '💩';
      description = `🥷 The calculations have shown that ${nombre.toUpperCase()} is *${percentages}%* ${tipo} ${emoji}\n> ✰ Keep that t97bin up hh!`;
      break;
    case 'kfat':
      emoji = '🐁';
      description = `👑 The calculations have shown that ${nombre.toUpperCase()} is *${percentages}%* ${tipo} ${emoji}\n> ✰ Akbar kfat in the planet.!`;
      break;
    case 'zaml':
    case 'hoe':
      emoji = '🫦👅';
      description = `✨️ The calculations have shown that ${nombre.toUpperCase()} is *${percentages}%* ${tipo} ${emoji}\n> ✰ 5aso li y7wih/a!`;
      break;
    default:
      return m.reply(`🍭 Invalid type.\nOptions valid: gay, lesbian, asshole/bitch, puto/puta, 9wad/9a7ba, kfat, zaml/hoe`);
  }

  const responses = [
    "The universe has spoken..",
    "Scientists confirm it.",
    "Surprise!"
  ];
  const response = responses[Math.floor(Math.random() * responses.length)];

  const cal = `💫 *CALCULATOR*\n\n${description}\n\n➤ ${response}`.trim();

  async function loading() {
    var hawemod = [
      "《 █▒▒▒▒▒▒▒▒▒▒▒》10%",
      "《 ████▒▒▒▒▒▒▒▒》30%",
      "《 ███████▒▒▒▒▒》50%",
      "《 ██████████▒▒》80%",
      "《 ████████████》100%"
    ];
    let { key } = await conn.sendMessage(m.chat, { text: `🤍 Calculating Percentage!`, mentions: conn.parseMention(cal) }, { quoted: fkontak });
    for (let i = 0; i < hawemod.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      await conn.sendMessage(m.chat, { text: hawemod[i], edit: key, mentions: conn.parseMention(cal) }, { quoted: fkontak });
    }
    await conn.sendMessage(m.chat, { text: cal, edit: key, mentions: conn.parseMention(cal) }, { quoted: fkontak });
  }
  loading();
};

handler.help = ['calculate <type> <@tag|name>'];
handler.tags = ['fun'];
handler.register = true;
handler.group = true;
handler.command = ['calculate'];

export default handler;
