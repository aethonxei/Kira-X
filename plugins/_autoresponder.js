import db from '../lib/database.js';

let handler = async (m, { conn, args, usedPrefix, command }) => {
  let user = db.data.users[m.sender];
  let mentionedJid = m.mentionedJid?.[0];

  if (!mentionedJid) return m.reply(`*✦ You must mention the user you want to challenge to the duel.*\n\nExample: *${usedPrefix}${command} @user*`);
  if (mentionedJid === m.sender) return m.reply('✦ You cant challenge yourself, huh?');

  let target = db.data.users[mentionedJid];
  if (!target) return m.reply('✦ The user you mentioned does not exist in the database.');

  const apuesta = 2500;
  if (user.yenes < apuesta) return m.reply(`✦ You don't have enough money to challenge. You need ¥${apuesta}.`);
  if (target.yenes < apuesta) return m.reply(`✦ The user you mentioned does not have enough money to accept the duel..`);

  const acceptMsg = `
𓆩 ⚔️ 𝔻 𝕌 𝔼 𝕃 ⚔️ 𓆪

*${conn.getName(m.sender)}* has challenged *${conn.getName(mentionedJid)}* to an anime duel ⚔️  
🎴 Total bet: *¥${apuesta}* for each one

*${conn.getName(mentionedJid)}*, Do you accept the duel?

✦ Reply with: * _accept_ *in the next 30 seconds.
`;

  await conn.sendMessage(m.chat, { text: acceptMsg, mentions: [mentionedJid, m.sender] }, { quoted: m });

  const respuesta = await conn.awaitReply(m.chat, mentionedJid, 30000);
  if (!respuesta || !/accept|yes|wi/i.test(respuesta.text)) {
    return m.reply(`❌ The duel was cancelled. The user did not respond or did not accept..`);
  }

  // Proceed with the mourning
  user.yenes -= apuesta;
  target.yenes -= apuesta;

  let ganador = Math.random() < 0.5 ? m.sender : mentionedJid;
  let perdedor = ganador === m.sender ? mentionedJid : m.sender;

  db.data.users[ganador].yenes += apuesta * 2;

  const gifs = [
    'https://c.tenor.com/EZITk9w7NNUAAAAC/anime-fight.gif',
    'https://c.tenor.com/g2SRjuoKJvYAAAAd/anime-fight-sword.gif',
    'https://c.tenor.com/EDK51mtA0OYAAAAC/naruto-sasuke.gif',
    'https://c.tenor.com/x6xxo2nGFYMAAAAd/anime-duel.gif'
  ];

  const gif = gifs[Math.floor(Math.random() * gifs.length)];

  const resultado = `
╭━━━❰  🎴 𝗔𝗡𝗜𝗠𝗘 𝗗𝗨𝗘𝗟 🎴 ❱━━━╮
┃ 🥷 *${conn.getName(m.sender)}*
┃            ✦  𝙑𝙎  ✦
┃ 🥷 *${conn.getName(mentionedJid)}*
╰━━━━━━━━━━━━━━━━━━━╯

⚔️ The battle has begun!

💸 They both bet: *¥${apuesta}*

🎥 *Epic Scene:* 
${gif}

🏆 𝙒𝙄𝙉𝙉𝙀𝙍: *${conn.getName(ganador)}*
🎊 He/She wins the prize of: *¥${apuesta * 2}*

> _Keep fighting for glory!_
`;

  await conn.sendMessage(m.chat, { text: resultado, mentions: [m.sender, mentionedJid] }, { quoted: m });
};

handler.command = /^duel$/i;
handler.group = true;
handler.money = true; // if you use an economic system
export default handler;
