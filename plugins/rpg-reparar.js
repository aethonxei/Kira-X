import db from '../lib/database.js';

const repairCosts = {
'rusty_dagger': { material: 'iron', mat_cost: 1, coin_cost: 50 },
'steel_sword': { material: 'iron', mat_cost: 2, coin_cost: 150 },
'fabric_clothes': { material: 'wood', mat_cost: 2, coin_cost: 30 },
'leather_armor': { material: 'goblin_skin', mat_cost: 1, coin_cost: 100 }
};

let handler = async (m, { conn, args, usedPrefix, command }) => {
let user = global.db.data.users[m.sender];
if (!user) return m.reply('You are not registered.');

let targetItem = args[0] ? args[0].toLowerCase() : null;

if (!targetItem || (targetItem !== 'weapon' && targetItem !== 'armor')) {
return m.reply(`Please specify what you want repaired.
Use: *${usedPrefix + command} <weapon|armor>*

*Your current team:*
🗡️ Weapon: *${user.equipment.weapon}*
   › Endurance: ${user.equipment.weapon_durability ?? 'N/A'} / ${weaponStats[user.equipment.weapon]?.durability || '∞'}

🛡️ Armor: *${user.equipment.armor}*
   › Endurance: ${user.equipment.armor_durability ?? 'N/A'} / ${armorStats[user.equipment.armor]?.durability || '∞'}
`);
}

let itemName, itemDurability, maxDurability, itemKey, durabilityKey, costData;

if (targetItem === 'weapon') {
itemName = user.equipment.weapon;
itemKey = 'weapon';
durabilityKey = 'weapon_durability';
costData = repairCosts[itemName];
maxDurability = weaponStats[itemName]?.durability;
} else {
itemName = user.equipment.armor;
itemKey = 'armor';
durabilityKey = 'armor_durability';
costData = repairCosts[itemName];
maxDurability = armorStats[itemName]?.durability;
}

if (!itemName || itemName === 'none' || !costData) {
return m.reply(`You don't have a *${targetItem}* equipped that can be repaired.`);
}

let currentDurability = user.equipment[durabilityKey];
if (currentDurability >= maxDurability) {
return m.reply(`Your *${itemName}* is already in perfect condition.`);
}

let durabilityNeeded = maxDurability - currentDurability;
let materialNeeded = costData.material;
let materialCost = durabilityNeeded * costData.mat_cost;
let coinCost = durabilityNeeded * costData.coin_cost;

let userMaterials = user.materials[materialNeeded] || 0;

if (userMaterials < materialCost || user.coin < coinCost) {
return m.reply(`You don't have enough resources to repair your *${itemName}*.
You need:
› ${materialCost} x *${materialNeeded}* (Have: ${userMaterials})
› ${coinCost.toLocaleString()} *${m.moneda}* (Have: ${user.coin.toLocaleString()})`);
}

user.coin -= coinCost;
user.materials[materialNeeded] -= materialCost;
user.equipment[durabilityKey] = maxDurability;

m.reply(`✅ *Complete Repair!*
Your *${itemName}* has been restored to 100% of its durability.

You spent:
› ${materialCost} x *${materialNeeded}*
› ${coinCost.toLocaleString()} *${m.moneda}*`);

};

handler.help = ['repair <weapon|armor>'];
handler.tags = ['rpg'];
handler.command = ['fix', 'repair'];
handler.register = true;

export default handler;

const weaponStats = {
'none': { durability: Infinity },
'rusty_dagger': { durability: 50 },
'steel_sword': { durability: 100 }
};
const armorStats = {
'none': { durability: Infinity },
'fabric_clothes': { durability: 40 },
'leather_armor': { durability: 80 }
};