// --- VALUES NECESSARY FOR THE NEW FUNCTIONALITY ---
const newsletterJid = '120363420610572685@newsletter';
const newsletterName = '𖥔ᰔᩚ⋆｡˚ ꒰❄︎ ʸᵃᵍᵃᵐⁱ-ˡⁱᵍʰᵗ | ᴄʜᴀɴɴᴇʟ-ʙᴏᴛ ꒱࣭';
const packname = '⏤͟͞ू⃪  ̸̷͢𝐑𝐮𝐛y͟ 𝐇𝐨𝐬𝐡𝐢n͟ᴏ 𝐁𝐨t͟˚₊·—̳͟͞͞♡̥';

// Array of miniatures
const iconos = [
'https://qu.ax/cHfvR.jpg',
'https://qu.ax/KeBXZ.jpg',
'https://qu.ax/RKqMg.jpg',
'https://qu.ax/iPYzS.jpg',
'https://qu.ax/AQyBD.jpg',
'https://qu.ax/GpBqh.jpg',
'https://qu.ax/PxvTi.jpg',
'https://qu.ax/cxqhs.jpg',
'https://qu.ax/vWQCE.jpg',
'https://qu.ax/hsYWi.jpg',
'https://qu.ax/FOMlu.jpg',
'https://qu.ax/galiS.jpg',
'https://qu.ax/iActF.jpg',
'https://qu.ax/tDdyU.jpg',
'https://qu.ax/HJrAc.jpg',
'https://qu.ax/LcELk.jpg',
'https://qu.ax/UhEAy.jpg',
'https://qu.ax/aWVwF.jpg',
'https://qu.ax/galiS.jpg',
'https://qu.ax/tDdyU.jpg',
'https://qu.ax/cxqhs.jpg',
'https://qu.ax/FOMlu.jpg',
'https://qu.ax/GpBqh.jpg'
];

// Function to obtain a random
const getRandomIcono = () => iconos[Math.floor(Math.random() * iconos.length)];

/**
 * Centralized plugin to handle all permission error messages.
 */
const handler = (type, conn, m, comando) => {
  const msg = {
  rowner: '「🍎」 *This function can only be used by my creator...* ⚙️\n\n> *aethonxei.*',
  owner: '「🍎」 *Only my creator and programmers can use this command~!* 💾',
  mods: '「🍎」 *Only my developers can use this~!* 🔮',
  premium: '「🍎」 *Huh~? This feature is exclusive to Premium users.!* 🔖\n\n🔖 *Not a premium member yet? Get it now using:*\n> 🔖 *.Buy Premium 2 days* (or replace "2 days" with the amount you want)).',
  group: '「🍎」 *This command can only be used in a group~!* 👥',
  private: '「🍎」 *This command works only in DM.~* ✉️',
  admin: '「🍎」 *Only admins can use this command~!* 🛡️',
  botAdmin: '「🔧」 *I need to be an admin for this command to work correctly..*\n\n🔧 *Make me an admin and I will unleash all my power~*',
  unreg: `🍎 𝑶𝒉 𝒏𝒐~ *¡You're not registered yet~!* 😿\nI need to get to know you so you can use my commands~ ✨\n\n📝 Please register with:\n */reg name.age*\n\n🎶 Enchanted example:\n */reg aethon.20*\n\n💖 That way I can help u! (⁎˃ᴗ˂⁎)`,
  restrict: '「🚫」 *Oh~! This function is currently asleep~* 💤'
  }[type];

  if (msg) {
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
        body: 'I❄︎ 𓈒꒰ 𝐇𝐦~ 𝐖𝐡𝐚𝐭𝐞𝐯𝐞𝐫',
        thumbnailUrl: getRandomIcono(), // ← random
        sourceUrl: redes,
        mediaType: 1,
        renderLargerThumbnail: false
      }
    };

    return conn.reply(m.chat, msg, m, { contextInfo }).then(_ => m.react('✖️'));
  }

  return true;
};

export default handler;
