import db from '../lib/database.js';
import moment from 'moment-timezone';

let handler = async (m, { conn, usedPrefix }) => {
let who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender;

if (!(who in global.db.data.users)) {
return conn.reply(m.chat, `${emoji} The user is not in my database.`, m);
}

let img = 'https://files.catbox.moe/sfq2mb.jpg';
let user = global.db.data.users[who];
let name = conn.getName(who);
let premium = user.premium ? '✅' : '❌';
let coin = user.coin || 0;
let bank = user.bank || 0;

const capitalize = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : 'None');

let equip = user.equipment || {};
let equipment_text = `*Equipment:*
  › 🗡️ Weapon: ${capitalize(equip.weapon)}
  › 🛡️ Armor: ${capitalize(equip.armor)}
  › 🛠️ Tool: ${capitalize(equip.tool)}`;

let inv = user.inventory || {};
let inventory_text = `*Consumables:*
  › 🧪 Health Potion: ${inv.health_potion || 0}
  › 🍀 Potion of Luck: ${inv.luck_potion || 0}
  › 🛡️ Escape Amulet: ${inv.escape_amulet || 0}
  › 🗝️ Key: ${inv.lockpick || 0}
  › 🎁 Mystery Chest: ${inv.mysterious_chest || 0}`;

let mat = user.materials || {};
let materials_text = `*Materials:*
  › 🔩 Iron: ${user.iron || 0}
  › 🏅 Gold: ${user.gold || 0}
  › 🕋 Coal: ${user.coal || 0}
  › 🪨 Stone: ${user.stone || 0}
  › 🪵 Wood: ${mat.wood || 0}
  › 💎 Diamonds: ${user.diamond || 0}
  › ♦️ Emeralds: ${user.emerald || 0}`; // He took it off \n

let economy_text = `*Economics and Statistics:*
  › 💸 ${m.moneda} (Wallet): ${coin.toLocaleString()}
  › 🏦 ${m.moneda} (Bank): ${bank.toLocaleString()}
  › 🌟 Level: ${user.level || 0}
  › ✨ Experience: ${user.exp || 0}
  › ❤️ Health: ${user.health || 100} / 100
  › 🎟️ Tokens: ${user.joincount || 0}
  › 🍬 Sweets: ${user.candies || 0}
  › 🎁 Gifts: ${user.gifts || 0}
  › ⚜️ Premium: ${premium}`;

let status_text = `*State:*
  › ⏳ Last Adventure: ${user.lastadventure ? moment(user.lastadventure).fromNow() : 'Never'}
  › 🍀 Lucky: ${user.status.is_lucky && user.status.lucky_until > Date.now() ? '✅' : '❌'}
  › 🚔 Imprisoned: ${user.status.is_jailed && user.status.jailed_until > Date.now() ? '✅' : '❌'}`;

let text = `╭━〔 Inventory of ${name} 〕⬣\n` +
`┠───「 Equipment 」\n` +
`┋ ${equipment_text.replace(/\n/g, '\n┋ ')}\n` +
`┠───「 Consumables 」\n` +
`┋ ${inventory_text.replace(/\n/g, '\n┋ ')}\n` +
`┠───「 Materials 」\n` +
`┋ ${materials_text.replace(/\n/g, '\n┋ ')}\n` +
`┠───「 Economics and Statistics 」\n` +
`┋ ${economy_text.replace(/\n/g, '\n┋ ')}\n` +
`┠───「 Current State 」\n` +
`┋ ${status_text.replace(/\n/g, '\n┋ ')}\n` +
`╰━━━━━━━━━━━━⬣\n` +
`📅 ${new Date().toLocaleString('id-ID')}`;

await conn.sendFile(m.chat, img, 'inventory.jpg', text, fkontak);
}

handler.help = ['inventory', 'inv'];
handler.tags = ['rpg'];
handler.command = ['inventory', 'inv']; 
handler.group = true;
handler.register = true;

export default handler;
