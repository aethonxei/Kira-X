import db from '../lib/database.js';

const items = {
health_potion: { cost: 750, type: 'inventory' },
luck_potion: { cost: 2500, type: 'inventory' },
lockpick: { cost: 7500, type: 'inventory' },
escape_amulet: { cost: 15000, type: 'inventory' },
mysterious_chest: { cost: 50000, type: 'inventory' },

weapon_daga_oxidada: { cost: 5000, type: 'equipment', slot: 'weapon', value: 'rusty_dagger', stats: { damage: 10 } },
weapon_espada_acero: { cost: 25000, type: 'equipment', slot: 'weapon', value: 'steel_sword', stats: { damage: 50 } },

armor_ropa_tela: { cost: 4000, type: 'equipment', slot: 'armor', value: 'fabric_clothes', stats: { defense: 5 } },
armor_armadura_cuero: { cost: 20000, type: 'equipment', slot: 'armor', value: 'leather_armor', stats: { defense: 15 } },

tool_kit_ladron: { cost: 30000, type: 'equipment', slot: 'tool', value: 'thief_kit', stats: { crime_boost: 10 } },
};

let handler = async (m, { conn, args, usedPrefix, command }) => {
let user = global.db.data.users[m.sender];
if (!args[0]) {
return m.reply(`Please specify the item you wish to purchase.\nUse *${usedPrefix}shop* to see the list.\nExample: *${usedPrefix + command} health_potion*`);
}

let itemName = args[0].toLowerCase();
if (!items[itemName]) {
return m.reply(`The item "${itemName}" does not exist in the store.`);
}

let item = items[itemName];
let count = args[1] ? parseInt(args[1]) : 1;
if (isNaN(count) || count <= 0) {
return m.reply("The amount must be a positive number..");
}

let totalCost = item.cost * count;

if (user.coin < totalCost) {
return m.reply(`You don't have enough. ${m.moneda}. You need *${totalCost.toLocaleString()} ${m.moneda}* to buy *${count}x ${itemName}*.\n\nYou Have: ${user.coin.toLocaleString()} ${m.moneda}`);
}

user.coin -= totalCost;

if (item.type === 'inventory') {
if (!user.inventory[itemName]) user.inventory[itemName] = 0;
user.inventory[itemName] += count;
m.reply(`✅ You bought *${count}x ${itemName}* for *${totalCost.toLocaleString()} ${m.moneda}*.\n\nCheck your *${usedPrefix}inventory*`);
} 
else if (item.type === 'equipment') {
if (count > 1) return m.reply("You can only buy 1 piece of equipment at a time.");

if (user.equipment[item.slot] && user.equipment[item.slot] !== 'none') {
m.reply(`You replaced your *${user.equipment[item.slot]}* for *${item.value}*.\n*Cost:* ${totalCost.toLocaleString()} ${m.moneda}`);
} else {
m.reply(`✅ You equipped *${item.value}*.\n*Cost:* ${totalCost.toLocaleString()} ${m.moneda}`);
}
user.equipment[item.slot] = item.value;
}
};

handler.help = ['buyitem <item> [amount]'];
handler.tags = ['rpg'];
handler.command = ['buyitem', 'buyy'];
handler.register = true;

export default handler;