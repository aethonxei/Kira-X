import db from '../lib/database.js';
import fetch from 'node-fetch';

let cooldowns = {};

// --- NEW STATISTICS WITH DURABILITY ---
const weaponStats = {
'none': { damage: 5, crit_chance: 0.05, durability: Infinity },
'rusty_dagger': { damage: 15, crit_chance: 0.10, durability: 50 },
'steel_sword': { damage: 50, crit_chance: 0.15, durability: 100 }
};

const armorStats = {
'none': { defense: 0, durability: Infinity },
'fabric_clothes': { defense: 10, durability: 40 }, // Aumentada a 10%
'leather_armor': { defense: 25, durability: 80 } // Aumentada a 25%
};
// --- END OF STATISTICS ---

const monsters = [
{ name: 'Slime', hp: 30, base_damage: 5, coin_reward: 500, exp_reward: 50, material: 'slime_goo', mat_chance: 0.9, mat_amount: 2, imageUrl: 'https://files.catbox.moe/4o2m4a.jpeg' },
{ name: 'Goblin', hp: 50, base_damage: 10, coin_reward: 1000, exp_reward: 75, material: 'goblin_skin', mat_chance: 0.6, mat_amount: 1, imageUrl: 'https://files.catbox.moe/j5lf45.jpg' },
{ name: 'Skeleton', hp: 70, base_damage: 15, coin_reward: 1200, exp_reward: 90, material: 'orc_bone', mat_chance: 0.7, mat_amount: 2, imageUrl: 'https://files.catbox.moe/d5k195.jpg' },
{ name: 'Lobo del Bosque', hp: 80, base_damage: 18, coin_reward: 1500, exp_reward: 100, material: 'wolf_fur', mat_chance: 0.8, mat_amount: 1, imageUrl: 'https://files.catbox.moe/2i4gz2.jpg' },
{ name: 'Harpy', hp: 100, base_damage: 22, coin_reward: 2000, exp_reward: 130, material: 'harpy_feather', mat_chance: 0.6, mat_amount: 3, imageUrl: 'https://files.catbox.moe/c89ydj.jpg' },
{ name: 'Orc', hp: 150, base_damage: 25, coin_reward: 3000, exp_reward: 200, material: 'orc_bone', mat_chance: 0.5, mat_amount: 1, imageUrl: 'https://files.catbox.moe/s53u7p.jpg' },
{ name: 'Giant Crab', hp: 180, base_damage: 20, coin_reward: 2500, exp_reward: 180, material: 'chitin_shell', mat_chance: 0.9, mat_amount: 1, imageUrl: 'https://i.postimg.cc/9F7B0S9T/crab.jpg' },
{ name: 'Stone Golem', hp: 250, base_damage: 20, coin_reward: 5000, exp_reward: 300, material: 'stone', mat_chance: 1.0, mat_amount: 10, imageUrl: 'https://i.postimg.cc/8PzFB4W0/golem.jpg' },
{ name: 'Liche', hp: 200, base_damage: 40, coin_reward: 8000, exp_reward: 500, material: 'lich_phylactery', mat_chance: 0.2, mat_amount: 1, imageUrl: 'https://i.postimg.cc/tRYgq1P7/lich.jpg' },
{ name: 'Ancient Treant', hp: 300, base_damage: 30, coin_reward: 7000, exp_reward: 450, material: 'wood', mat_chance: 1.0, mat_amount: 20, imageUrl: 'https://i.postimg.cc/1XGbnKCy/treant.jpg' }
];

function pickRandom(list) {
return list[Math.floor(Math.random() * list.length)];
}

function segundosAHMS(segundos) {
let minutos = Math.floor(segundos / 60);
let segundosRestantes = segundos % 60;
return minutos === 0 ? `${segundosRestantes}s` : `${minutos}m ${segundosRestantes}s`;
}

let handler = async (m, { conn, usedPrefix, command }) => {
try {
let user = global.db.data.users[m.sender];
if (!user) return m.reply('❌ You are not registered. Use *.reg* to register.');

// Initialize new properties if they do not exist
user.equipment = user.equipment || {};
user.equipment.weapon_durability = user.equipment.weapon_durability ?? 0;
user.equipment.armor_durability = user.equipment.armor_durability ?? 0;
user.materials = user.materials || {};
user.coin = user.coin || 0;
user.exp = user.exp || 0;
user.health = user.health ?? 100;

const moneda = m.moneda || 'Coins';
const cooldown = 3 * 60 * 1000; // 3 minutes

if (cooldowns[m.sender] && Date.now() - cooldowns[m.sender] < cooldown) {
const remaining = segundosAHMS(Math.ceil((cooldowns[m.sender] + cooldown - Date.now()) / 1000));
return m.reply(`⏳ You're resting from your last hunt. Wait *${remaining}* to hunt again.`);
}

if (user.health <= 20) {
return m.reply(`❤️ You are in very poor health. (*${user.health} HP*). Use *${usedPrefix}heal* before hunting.`);
}

let combat_log = []; // Combat Log
let weapon_name = user.equipment.weapon || 'none';
let armor_name = user.equipment.armor || 'none';

// --- DURABILITY VERIFICATION ---
// Si el item es nuevo (!user.equipment.weapon_durability), le asigna la durabilidad máxima.
if (weapon_name !== 'none' && user.equipment.weapon_durability <= 0) {
user.equipment.weapon_durability = weaponStats[weapon_name].durability;
}
if (armor_name !== 'none' && user.equipment.armor_durability <= 0) {
user.equipment.armor_durability = armorStats[armor_name].durability;
}

// Si está rota, la trata como 'none' para este combate
if (user.equipment.weapon_durability <= 0 && weapon_name !== 'none') {
combat_log.push(`⚠️ Your *${weapon_name}* Is broken! You fought with your fists.`);
weapon_name = 'none';
}
if (user.equipment.armor_durability <= 0 && armor_name !== 'none') {
combat_log.push(`⚠️Your *${armor_name}* Is broken! You have no protection..`);
armor_name = 'none';
}

let weaponData = weaponStats[weapon_name];
let armorData = armorStats[armor_name];
// --- END OF VERIFICATION ---

const monster = pickRandom(monsters);
const monsterImage = Buffer.from(await (await fetch(monster.imageUrl)).arrayBuffer());

let roll = Math.random();
let caption = '';

// --- EVENTOS PRE-COMBATE ---
if (roll < 0.05) { // 5% chance de Emboscada
await m.react('🚨');
let dmg_taken = Math.floor(monster.base_damage * (1 - (armorData.defense / 100)));
user.health = Math.max(0, user.health - dmg_taken);
if (armor_name !== 'none' && user.equipment.armor_durability > 0) user.equipment.armor_durability--; // Wear
combat_log.push(`🚨 *AMBUSH!* The ${monster.name} attacks you first and you receive *${dmg_taken} HP* of damage.`);

} else if (roll > 0.95) { // 5% chance that the monster will escape
await m.react('💨');
let exp_won = Math.floor(monster.exp_reward * 0.1);
user.exp += exp_won;
cooldowns[m.sender] = Date.now();
caption = `╭─「 💨 *HE FLEEED!* 」
┠ 👹 The *${monster.name}* saw you and ran away.
┠ ✨ You won: *+${exp_won} XP* (for scaring him)
╰────────────`;
await conn.sendMessage(m.chat, { image: monsterImage, caption: caption }, { quoted: m });
return;
}

// --- START OF SIMULATED COMBAT ---
let user_hp = user.health;
let monster_hp = monster.hp;
let turn = 0;
const MAX_TURNS = 20;

combat_log.push(`⚔️ The battle against *${monster.name}* begins! (HP: ${monster_hp})!`);

while (user_hp > 0 && monster_hp > 0 && turn < MAX_TURNS) {
turn++;
combat_log.push(`\n--- *Turn ${turn}* ---`);

// User's Turn
let is_crit = Math.random() < weaponData.crit_chance;
let dmg_dealt = Math.floor(weaponData.damage * (is_crit ? 1.5 : 1)); // Crítico hace 1.5x
monster_hp -= dmg_dealt;
if (weapon_name !== 'none' && user.equipment.weapon_durability > 0) user.equipment.weapon_durability--; // Desgaste

combat_log.push(is_crit ? `💥 CRITICAL HIT! You do *${dmg_dealt}* of damage.` : `🗡️ You attack and do *${dmg_dealt}* of damage.`);
combat_log.push(`(Weapon Durability: ${user.equipment.weapon_durability || '∞'})`);

// Monster's turn (if still alive)
if (monster_hp > 0) {
let dmg_taken = Math.floor(monster.base_damage * (1 - (armorData.defense / 100)));
user_hp -= dmg_taken;
if (armor_name !== 'none' && user.equipment.armor_durability > 0) user.equipment.armor_durability--; // Desgaste

combat_log.push(`👹 The ${monster.name} attack and you receive *${dmg_taken}* of damage.`);
combat_log.push(`(Armor Durability: ${user.equipment.armor_durability || '∞'})`);
}
}
// --- FIN DEL COMBATE ---

// Update user health
user.health = Math.max(0, user_hp);

if (monster_hp <= 0) {
// --- VICTORY ---
await m.react('🎉');
let coins_won = monster.coin_reward;
let exp_won = monster.exp_reward;
user.coin += coins_won;
user.exp += exp_won;

caption = `╭─「 🎉 *VICTORY!* 🎉 」
┠ 🤺 You defeated the *${monster.name}*.
┠
┠ *Rewards:*
┠ 💰 You won: *+${coins_won.toLocaleString()} ${moneda}*
┠ ✨ You won: *+${exp_won} XP*
╰────────────`;

if (Math.random() < monster.mat_chance) {
let mat_name = monster.material;
let mat_amount = monster.mat_amount;
user.materials[mat_name] = (user.materials[mat_name] || 0) + mat_amount;
caption += `\n┠ 📦 Material: *+${mat_amount} ${mat_name}*`;
}

} else if (user_hp <= 0) {
// --- DERROTA ---
await m.react('💀');
let coins_lost = Math.floor(user.coin * 0.10); // Lose 10% of coins
let exp_won = Math.floor(monster.exp_reward * 0.1); // Earn 10% exp
user.coin = Math.max(0, user.coin - coins_lost);
user.exp += exp_won;
user.health = 1; // It's left with 1 HP

caption = `╭─「 💀 *DEFEAT!* 💀 」
┠ 🤕 The *${monster.name}* has defeated you.
┠ 🩹 You escaped, but you were left with 1 HP.
┠
┠ *Losses:*
┠ 💸 You lost: *-${coins_lost.toLocaleString()} ${moneda}* (10% from your wallet)
┠ ✨ You won: *+${exp_won} XP* (from surviving)
╰────────────`;

} else if (turn >= MAX_TURNS) {
// --- DRAW (Escape due to turn limit)) ---
await m.react('💨');
let exp_won = Math.floor(monster.exp_reward * 0.2);
user.exp += exp_won;

caption = `╭─「 💨 *DRAW!* 💨 」
┠ 🏃‍♂️ The fight against *${monster.name}* was very long.
┠ 😅 They both decided to run away.
┠
┠ *Result:*
┠ ✨ You won: *+${exp_won} XP* (for the resistance)
╰────────────`;
}

caption += `\n\n--- *Combat Summary* ---\n${combat_log.join('\n')}`;
caption += `\n\n❤️ *Your Final Health:* ${user.health}/100`;
cooldowns[m.sender] = Date.now();

await conn.sendMessage(
m.chat, 
{ 
image: monsterImage, 
caption: caption 
}, 
{ quoted: m } // We used the user's message as a quote.
);

} catch (err) {
console.error(err);
let errorMsg = `❌ *Command error ${command}:*\n\n> ${String(err)}`;
await conn.reply(m.chat, errorMsg, m);
}
};

handler.help = ['hunt', 'hunt'];
handler.tags = ['rpg'];
handler.command = ['hunt', 'hunt'];
handler.group = true;
handler.register = true;

export default handler;