import db from '../lib/database.js';
import fetch from 'node-fetch';

const shopItems = {
  consumibles: `*CONSUMABLES* (Use: .use <item>)
────────────────
🧪 *Health Potion* (health_potion)
   › Heals 50 HP.
   › *Cost:* 750 Coins
   
🧪 *Luck Potion* (luck_potion)
   › Increases luck in /crime and /explore for 1 hour.
   › *Cost:* 2,500 Coins
   
🗝️ *Master Lockpick* (lockpick)
   › Guarantees 1 success in /crime (does not prevent jail).
   › *Cost:* 7,500 Coins
   
🛡️ *Escape Amulet* (escape_amulet)
   › Avoids jail 1 time (consumed when caught).
   › *Cost:* 15,000 Coins
`,
  equipamiento: `*EQUIPMENT* (Equipped automatically)
────────────────
*Weapons:*
🗡️ *Rusty Dagger* (weapon_rusty_dagger)
   › Base Damage: 10
   › *Cost:* 5,000 Coins
   
⚔️ *Steel Sword* (weapon_steel_sword)
   › Base Damage: 50
   › *Cost:* 25,000 Coins
   
*Armors:*
👕 *Cloth Clothes* (armor_clothing_fabric)
   › Defense: 5%
   › *Cost:* 4,000 Coins
   
🧥 *Leather Armor* (armor_leather_armor)
   › Defense: 15%
   › *Cost:* 20,000 Coins
   
*Tools:*
⛏️ *Thief Kit* (tool_kit_thief)
   › Increases /crime earnings by 10%.
   › *Cost:* 30,000 Coins
`,
  cofres: `*CHESTS & LOTTERY* (Use: .use <item>)
────────────────
🎁 *Mysterious Chest* (mysterious_chest)
   › What could be inside? Could be anything...
   › *Cost:* 50,000 Coins
`,
  mascotas: `*PETS* (Coming soon...)
────────────────
🥚 *Wolf Egg*
   › *Cost:* 100,000 Coins
   
🥚 *Griffin Egg*
   › *Cost:* 500,000 Coins
`
};

let handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    let user = global.db.data.users[m.sender];
    if (!user) return m.reply('❌ You are not registered. Use .reg to register.');
    let moneda = global.moneda || 'Coins';
    let category = (text || '').trim().toLowerCase();
    let categories = ['consumables', 'equipment', 'chests', 'pets'];

    const contextInfo = {
      mentionedJid: [m.sender],
      isForwarded: true,
      forwardingScore: 999,
      forwardedNewsletterMessageInfo: {
        newsletterJid: '120363420610572685@newsletter',
        newsletterName: '𖥔🍎ᩚ⋆｡˚ ꒰❄︎ ʸᵃᵍᵃᵐⁱ-ˡⁱᵍʰᵗ | ᴄʜᴀɴɴᴇʟ-ʙᴏᴛ ꒱࣭',
        serverMessageId: -1
      },
      externalAdReply: {
        title: '⸜( •⌄• )⸝ 𝘖𝘍𝘍𝘐𝘊𝘐𝘈𝘓 𝘙𝘗𝘎 🥡',
        body: global.dev || 'Choose an option',
        thumbnail: global.icons || 'https://files.catbox.moe/yeojfu.jpg',
        sourceUrl: global.redes || '',
        mediaType: 1,
        renderLargerThumbnail: false
      }
    };

    const emojiMap = { consumibles: '🧪', equipamiento: '⚔️', cofres: '🎁', mascotas: '🥚' };
    if (category && categories.includes(category)) {
      if (m.react) try { await m.react(emojiMap[category] || '🛍️'); } catch { }
      let replyText = shopItems[category].replace(/Coins/g, moneda);
      await conn.reply(m.chat, replyText, m, { contextInfo });
      return;
    }

    const imgUrl = 'https://files.catbox.moe/yeojfu.jpg';
    const imgBuffer = await fetch(imgUrl).then(r => r.buffer());

    const buttons = [
      { buttonId: `${usedPrefix + command} consumables`, buttonText: { displayText: '🧃 𝙘𝙤𝙣𝙨𝙪𝙢𝙖𝙗𝙡𝙚𝙨' }, type: 1 },
      { buttonId: `${usedPrefix + command} equipment`, buttonText: { displayText: '⚔️ 𝙚𝙦𝙪𝙞𝙥𝙢𝙚𝙣𝙩' }, type: 1 },
      { buttonId: `${usedPrefix + command} chests`, buttonText: { displayText: '🎁 𝙘𝙝𝙚𝙨𝙩𝙨' }, type: 1 },
      { buttonId: `${usedPrefix + command} pets`, buttonText: { displayText: '🥚 𝙥𝙚𝙩𝙨' }, type: 1 }
    ];

    const introText = `🏪 *RPG SHOP* 🏪\n\nWelcome, ${await conn.getName(m.sender)}!\nSelect a category to see the items.\n\n🪙 You have: *${(user.coin || 0).toLocaleString()} ${moneda}*`;

    await conn.sendMessage(m.chat, {
      image: imgBuffer,
      caption: introText,
      footer: '🐾 ' + (global.packname || 'Your RPG Bot'),
      buttons,
      headerType: 4,
    }, { quoted: m });

  } catch (err) {
    let errorMsg = `❌ *Command error ${command}:*\n\n> ${err?.message || String(err)}\n\n📜 *Technical details:*\n${err?.stack || 'Not available'}`;
    await conn.reply(m.chat, errorMsg, m);
  }
};

handler.help = ['shop', 'tienda'];
handler.tags = ['rpg'];
handler.command = ['shop', 'tienda'];
handler.register = true;
handler.group = true;

export default handler;
