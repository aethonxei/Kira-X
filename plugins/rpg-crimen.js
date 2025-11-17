let cooldowns = {};

const handler = async (m, { conn }) => {
let users = global.db.data.users;
let senderId = m.sender;
const user = users[senderId];

const premiumBenefit = user.premium ? 0.8 : 1.0;
const cooldown = 5 * 60 * 1000;
const jailCooldown = 30 * 60 * 1000;

if (user.status.is_jailed && user.status.jailed_until > Date.now()) {
const remaining = segundosAHMS(Math.ceil((user.status.jailed_until - Date.now()) / 1000));
return m.reply(`🚔 You're in jail. You can't commit crimes. You have time left. *${remaining}*.`);
}

if (cooldowns[senderId] && Date.now() - cooldowns[senderId] < cooldown) {
const remaining = segundosAHMS(Math.ceil((cooldowns[senderId] + cooldown - Date.now()) / 1000));
return m.reply(`⏱️ You need to keep a low profile. Wait. *${remaining}* for your next hit.`);
}

const isLucky = user.status.is_lucky && user.status.lucky_until > Date.now();
const luckFactor = isLucky ? 0.5 : 1.0;
const luckBonus = isLucky ? 0.15 : 0;

const toolBonus = user.equipment.tool === 'thief_kit' ? 1.10 : 1.0;

if (user.inventory.lockpick && user.inventory.lockpick > 0) {
user.inventory.lockpick--;
const amount = Math.floor((Math.random() * 25000 + 10000) * toolBonus);
user.coin += amount;
const reason = pickRandom(frasesExito);
await m.react('💰');
await m.reply(`🗝️ *You used a Master Lockpick and forced success!!*\n${reason}. You pocketed it! *¥${amount.toLocaleString()} ${m.moneda}*!\n> Current balance: *¥${user.coin.toLocaleString()}*`);
cooldowns[senderId] = Date.now();
return;
}

const outcome = Math.random();
const jailChance = (0.15 * premiumBenefit) * luckFactor;
const successChance = (0.70 + luckBonus);

if (outcome < jailChance) {
if (user.inventory.escape_amulet && user.inventory.escape_amulet > 0) {
user.inventory.escape_amulet--;
await m.react('🛡️');
await m.reply(`🚔 They caught you! But you used your *Escape Amulet* to bribe the guard. You narrowly escaped!.\nYou have lost 1 Amulet.`);
} else {
user.status.is_jailed = true;
user.status.jailed_until = Date.now() + jailCooldown;
const reason = pickRandom(frasesPolicia);
await m.react('🚔');
await m.reply(`${reason}. You've been caught! You're in jail for 30 minutes..`);
}

} else if (outcome < jailChance + successChance) {
const amount = Math.floor((Math.random() * 25000 + 10000) * toolBonus);
user.coin += amount;
const reason = pickRandom(frasesExito);
await m.react('💰');
let luckText = isLucky ? '🍀 *Your luck was on your side!*\n' : '';
let toolText = toolBonus > 1.0 ? `🔧 *Your Thief Kit gave you an extra 10%!*\n` : '';
await m.reply(`${luckText}${toolText}${reason}. You pocketed it! *¥${amount.toLocaleString()} ${m.moneda}*!\n> Current balance: *¥${user.coin.toLocaleString()}*`);

} else {
const amount = Math.floor(Math.random() * 18000 + 7000);
let restante = amount;

if (user.coin >= restante) {
user.coin -= restante;
} else {
restante -= user.coin;
user.coin = 0;
if (user.bank >= restante) {
user.bank -= restante;
} else {
user.bank = 0;
}
}
const reason = pickRandom(frasesFracaso);
await m.react('💀');
await m.reply(`${reason}. In the process, you lost *¥${amount.toLocaleString()} ${m.moneda}*.\n> You have left: *¥${user.coin.toLocaleString()}* in your wallet and *¥${user.bank.toLocaleString()}* at the bank.`);
}

cooldowns[senderId] = Date.now();
};

handler.help = ['crime'];
handler.tags = ['economy'];
handler.command = ['crime', 'crime'];
handler.group = true;
handler.register = true;

export default handler;

function segundosAHMS(segundos) {
let minutos = Math.floor(segundos / 60);
let segundosRestantes = segundos % 60;
if (minutos === 0) return `${segundosRestantes}s`;
return `${minutos}m ${segundosRestantes}s`;
}

function pickRandom(list) {
return list[Math.floor(Math.random() * list.length)];
}

const frasesExito = [
"🔫 You held up an armored truck with a water gun; the confusion gave you time to escape", "💻 You hacked an ATM using a TikTok tutorial and it actually worked", "🚁 You intercepted a delivery drone and kept a luxury package", "🦶 You sold pictures of your feet to an anonymous collector for an unbelievable amount", "🧪 You created a ‘miracle remedy’ with water and sugar and sold it to a group of tourists", "🔧 You stole the catalytic converter from a corrupt politician’s car and sold it for parts", "🕴️ You posed as a health inspector and extorted several street food stands", "🎰 You discovered a flaw in a slot machine and emptied it before anyone noticed", "🐓 You organized a fake cockfight and ran off with all the betting money", "🌕 You sold a plot of land on the moon to an eccentric millionaire", "🐝 You stole a beehive and sold the honey as an ‘elixir of eternal youth’", "💳 You cloned an influencer’s credit card and used it to buy cryptocurrency", "🐶 You kidnapped a celebrity’s pet and demanded limited-edition sneakers as ransom, which you later resold", "🎨 You sneaked into an art auction and swapped a famous painting for a copy. No one noticed", "🕊️ You sold ‘pigeon attack insurance’ in the main plaza. Surprisingly, many people bought it", "🖼️ You created an NFT of an old meme and someone bought it out of nostalgia", "🥑 You stole a shipment of avocados and exported it to a country where they’re a luxury good", "🔮 You read the future for a group of people and ‘advised’ them to invest in your phantom business"
];

const frasesFracaso = [
"💀 You tried to steal a grandma’s purse, but she was a former judo champion. You had to pay her so she wouldn’t press charges",
"🤡 Your accomplice betrayed you and ran off with the loot, not without stealing your own wallet first",
"💸 You ran so fast that all the money fell into a sewer. You could only watch as the current took it away",
"👮 You tried to bribe an officer, but he asked for such a big ‘cut’ that it wiped out your profits",
"🦴 The loot was just discount coupons for a pet store. You had to pay the getaway taxi out of your own pocket",
"💥 You broke a window to get in and steal, which set off an alarm. You had to pay for the damages to avoid jail",
"💨 You spent all the money on an ‘invisibility’ amulet that clearly did not work",
"🎭 The robbery victim recognized you and extorted you not to go to the police. It cost you twice what you stole",
"🍿 You hid in a movie theater to escape, but ended up watching the film and buying popcorn and a large soda",
"🔥 The stolen money was marked with invisible ink. You had to burn it all to avoid leaving evidence",
"⌚ You tried to sell a stolen watch, but the buyer was an undercover cop. You had to pay bail",
"🦷 You fell during the getaway and broke a tooth. The dentist visit cost more than the loot",
"🗣️ Your plan was brilliant, but you told your friend and he did it first. Then he asked you for a loan",
"🐕 The guard dog ate part of the money. What you recovered wasn’t even enough to buy bandages",
"🚌 You fled on a bus, but didn’t have change and had to pay with a big bill from the loot",
"🩸 You got confused and instead of robbing a bank, you walked into a blood bank. You left pale and with less money"
];

const frasesPolicia = [
"🤳 They caught you because you posted a selfie with the loot on your WhatsApp status",
"😴 You fell asleep at the crime scene and the police found you snoring on top of the money",
"📝 You left your résumé on the counter of the store you robbed. They called you for an ‘interview’",
"🛴 You tried to flee on an electric scooter, but the battery died half a block from the police station",
"🦜 The victim’s parrot wouldn’t stop repeating your name and address. It was key testimony",
"🗿 You hid from the police in a human statue contest. You lost when you got a cramp",
"🗺️ You used Google Maps for your escape route, but accidentally shared it live with all your contacts",
"🍩 They identified you thanks to the DNA you left on a half-eaten donut at the scene",
"🍕 You tried to escape disguised as a pizza delivery guy, but you stopped to deliver a real order",
"🐾 Your dog, excited to see you, led the police straight to your hideout",
"❤️ They caught you because the ‘Mom Only One’ tattoo matched the suspect description",
"😭 You tripped and accidentally activated a baby-crying filter on your phone, alerting the police",
"👮‍♂️ You asked a cop for directions to your own hideout without realizing he was an officer",
"🎨 The victim drew you so accurately in the sketch that even your mom recognized you and turned you in",
"🚲 The GPS on the bike you stole to escape gave you away"
]