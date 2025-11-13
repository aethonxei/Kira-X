import fetch from 'node-fetch';

const newsletterJid  = '120363420610572685@newsletter';
const newsletterName = '𖥔🍎⋆｡˚ ꒰❄︎ ʸᵃᵍᵃᵐⁱ-ˡⁱᵍʰᵗ | ᴄʜᴀɴɴᴇʟ-ʙᴏᴛ ꒱࣭'';

let handler = async (m, { conn, usedPrefix, command }) => {
  try {
    const contextInfo = {
      mentionedJid: [m.sender],
      isForwarded: true,
      forwardingScore: 999,
      forwardedNewsletterMessageInfo: {
        newsletterJid,
        newsletterName,
        serverMessageId: -1
      },
      externalAdReply: {
        title: packname,
        body: dev,
        thumbnail: icons,
        sourceUrl: redes,
        mediaType: 1,
        renderLargerThumbnail: false
      }
    };

    await m.react('🍎');
    await conn.reply(m.chat, '🍁 *Looking for a waifu for you... wait a moment~*', m, { contextInfo });

    let res = await fetch('https://api.waifu.pics/sfw/waifu');
    if (!res.ok) throw new Error('The waifu could not be obtained.');
    let json = await res.json();
    if (!json.url) throw new Error('Invalid answer.');

    const caption = `🍎 *Here you go your waifu, ${conn.getName(m.sender)}-chan~* 〰️\n\n✨ Want another waifu? Just tap the button below.~`;

    const buttons = [
      { buttonId: usedPrefix + command, buttonText: { displayText: '🔁 Next waifu' }, type: 1 }
    ];

    await conn.sendMessage(
      m.chat,
      {
        image: { url: json.url },
        caption,
        footer: '🍎 Kira-X-Bot',
        buttons,
        headerType: 4
      },
      { quoted: m, contextInfo }
    );

  } catch (e) {
    console.error(e);
    await conn.reply(m.chat, '❌ Sorry, there was an error searching for your waifu.', m);
  }
};

handler.help = ['waifu'];
handler.tags = ['anime'];
handler.command = ['waifu'];
handler.group = true;
handler.register = true;

export default handler;
