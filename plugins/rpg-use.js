import db from '../lib/database.js';

function pickRandom(list) {
return list[Math.floor(Math.random() * list.length)];
}

let handler = async (m, { conn, args, usedPrefix, command }) => {
let user = global.db.data.users[m.sender];
if (!args[0]) {
return m.reply(`Specify the item you wish to use.\nExample: *${usedPrefix + command} health_potion*`);
}

let itemName = args[0].toLowerCase();

switch (itemName) {
case 'health_potion':
if (!user.inventory.health_potion || user.inventory.health_potion <= 0) {
return m.reply("You don't have any *Health Potions*.");
}
if (user.health >= 100) {
return m.reply("You are now in peak health.");
}
user.inventory.health_potion--;
user.health = Math.min(100, user.health + 50);
m.reply(`❤️ You used a *Health Potion*.\nYour health now is *${user.health}/100*.`);
break;

case 'luck_potion':
if (!user.inventory.luck_potion || user.inventory.luck_potion <= 0) {
return m.reply("You don't have any *Lucky Potions*.");
}
if (user.status.is_lucky && user.status.lucky_until > Date.now()) {
return m.reply("You are now under the effects of a Luck Potion.");
}
user.inventory.luck_potion--;
user.status.is_lucky = true;
user.status.lucky_until = Date.now() + 1000 * 60 * 60;
m.reply(`🍀 You drank a *Potion of Luck*!\nYour chances of success will improve for 1 hour.`);
break;

case 'mysterious_chest':
if (!user.inventory.mysterious_chest || user.inventory.mysterious_chest <= 0) {
return m.reply("You don't have *Mystery Chests*.");
}
user.inventory.mysterious_chest--;

let chance = Math.random();
let rewardText = "You opened a *Mystery Chest* and got...\n\n";

if (chance < 0.60) {
let coins = Math.floor(Math.random() * 20000) + 10000;
user.coin += coins;
rewardText += `*Common:* *${coins.toLocaleString()} ${m.moneda}*!`;
} else if (chance < 0.90) {
let amulets = 1;
user.inventory.escape_amulet += amulets;
rewardText += `*Queer:* *${amulets}x Escape Amulet*!`;
} else if (chance < 0.99) {
let diamonds = Math.floor(Math.random() * 20) + 10;
user.diamond += diamonds;
rewardText += `*Epic:* *${diamonds} Diamonds* 💎!`;
} else {
let coins = 1000000;
user.coin += coins;
rewardText += `*LEGENDARY!!:* One million ${m.moneda} 💸!`;
}
m.reply(rewardText);
break;

default:
m.reply(`The item "${itemName}" is not a consumable or it does not exist.`);
}
};

handler.help = ['use <item>'];
handler.tags = ['rpg'];
handler.command = ['use', 'usar'];
handler.register = true;

export default handler;