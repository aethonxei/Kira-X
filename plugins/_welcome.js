import fs from 'fs'
import { WAMessageStubType } from '@whiskeysockets/baileys'

const newsletterJid = '120363420610572685@newsletter';
const newsletterName = '𖥔ᰔᩚ⋆｡˚ ꒰❄︎ ʸᵃᵍᵃᵐⁱ-ˡⁱᵍʰᵗ | ᴄʜᴀɴɴᴇʟ-ʙᴏᴛ ꒱࣭';
const packname = '⏤͟͞ू⃪  ̸̷͢𝐘𝐚𝐠𝐚𝐦𝐢 𝐋𝐢𝐠𝐡𝐭͟˚₊·—̳͟͞͞❄̥';

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

const getRandomIcono = () => iconos[Math.floor(Math.random() * iconos.length)];

async function generarBienvenida({ conn, userId, groupMetadata, chat }) {
const username = `@${userId.split('@')[0]}`;
const pp = await conn.profilePictureUrl(userId, 'image').catch(() => 'https://files.catbox.moe/mq2yh8.jpg');
const fecha = new Date().toLocaleDateString("ar-Ma", { timeZone: "Africa/Casablanca", day: 'numeric', month: 'long', year: 'numeric' });
const groupSize = groupMetadata.participants.length + 1; 
const desc = groupMetadata.desc?.toString() || 'No description';

let caption;
if (chat.welcomeText) {
caption = chat.welcomeText
.replace(/@user/g, username)
.replace(/@subject/g, groupMetadata.subject)
.replace(/@desc/g, desc);
} else {
const defaultWelcomeMessage = `｡ﾟﾟ･｡･ﾟﾟ｡
ﾟ。      ｡ﾟ
　ﾟ･｡･ﾟ
︵ ⊹ ︵ ⊹ ︵ ⊹ ︵ ⊹ ︵ ⊹ ︵ ⊹ ︵
╭──*·˚ 🍎 𝐍𝐄𝐖 𝐔𝐒𝐄𝐑 🍎 ˚·*──╮

 𝙃𝙚𝙡𝙡𝙤, @user! ^^
 Welcome to the group:
 *@subject*

 𝙃𝙤𝙥𝙚𝙛𝙪𝙡𝙡𝙮 𝙮𝙤𝙪 𝙖𝙧𝙚 𝙙𝙤𝙞𝙣𝙜 𝙬𝙚𝙡𝙡,
 𝙃𝙖𝙫𝙚 𝙛𝙪𝙣!!

· · • • • ✿ • • • · ·
「 𝐆𝐑𝐎𝐔𝐏 𝐈𝐍𝐅𝐎 」
🍡 𝐌𝐞𝐦𝐛𝐞𝐫𝐬: ${groupSize}
📅 𝐃𝐚𝐭𝐞: ${fecha}
📄 𝐃𝐞𝐬𝐜𝐫𝐢𝐩𝐭𝐢𝐨𝐧: 
${desc}
· · • • • ✿ • • • · ·

> You can personalize this message
> using: */setwelcome*

╰──*·˚ 🍥 ˚·*──────────╯`;

caption = defaultWelcomeMessage
.replace(/@user/g, username)
.replace(/@subject/g, groupMetadata.subject);
}
return { pp, caption, mentions: [userId] };
}

async function generarDespedida({ conn, userId, groupMetadata, chat }) {
const username = `@${userId.split('@')[0]}`;
const pp = await conn.profilePictureUrl(userId, 'image').catch(() => 'https://files.catbox.moe/mq2yh8.jpg');
const fecha = new Date().toLocaleDateString("ar-MA", { timeZone: "Africa/Casablanca", day: 'numeric', month: 'long', year: 'numeric' });
const groupSize = groupMetadata.participants.length - 1;

let caption;
if (chat.byeText) {
caption = chat.byeText
.replace(/@user/g, username)
.replace(/@subject/g, groupMetadata.subject);
} else {
const defaultByeMessage = `｡ﾟﾟ･｡･ﾟﾟ｡
ﾟ。      ｡ﾟ
　ﾟ･｡･ﾟ
︵ ⊹ ︵ ⊹ ︵ ⊹ ︵ ⊹ ︵ ⊹ ︵ ⊹ ︵
╭──*·˚ 💔 𝐀 𝐅𝐀𝐑𝐄𝐖𝐄𝐋𝐋 💔 ˚·*──╮

 𝙎𝙖𝙮𝙤𝙣𝙖𝙧𝙖, @user (T-T)/~~~
 Left the group:
 *@subject*

 𝙇𝙤𝙨𝙩 𝙖𝙣𝙤𝙩𝙝𝙚𝙧 𝙜𝙖𝙮 𝙨𝙤𝙡𝙞𝙙𝙚𝙧...

· · • • • ✿ • • • · ·
 「 𝐂𝐔𝐑𝐑𝐄𝐍𝐓 𝐒𝐓𝐀𝐓𝐄 」
 📉 𝐌𝐞𝐦𝐛𝐞𝐫𝐬: ${groupSize}
 📅 𝐃𝐚𝐭𝐞: ${fecha}
· · • • • ✿ • • • · ·

> You can personalize this message
> using: */setbye

╰──*·˚ 🥀 ˚·*──────────╯`;

caption = defaultByeMessage
.replace(/@user/g, username)
.replace(/@subject/g, groupMetadata.subject);
}
return { pp, caption, mentions: [userId] };
}

let handler = m => m

handler.before = async function (m, { conn, participants, groupMetadata }) {
if (!m.messageStubType || !m.isGroup) return !0

const chat = global.db.data.chats[m.chat]
if (!chat) return !0;

const primaryBot = chat.botPrimario
if (primaryBot && conn.user.jid !== primaryBot) return !0

const userId = m.messageStubParameters[0]

if (chat.welcome && m.messageStubType == WAMessageStubType.GROUP_PARTICIPANT_ADD) {
const { pp, caption, mentions } = await generarBienvenida({ conn, userId, groupMetadata, chat })
const contextInfo = {
mentionedJid: mentions,
isForwarded: true,
forwardingScore: 999,
forwardedNewsletterMessageInfo: {
newsletterJid,
newsletterName,
serverMessageId: -1
},
externalAdReply: {
title: packname,
body: 'I🍎 𓈒꒰ 𝐘𝐚𝐲~ 𝐖𝐞𝐥𝐜𝐨𝐦𝐞@! (≧∇≦)/',
thumbnailUrl: getRandomIcono(),
sourceUrl: global.redes,
mediaType: 1,
renderLargerThumbnail: false
}
};
await conn.sendMessage(m.chat, { image: { url: pp }, caption, contextInfo }, { quoted: null })
}

if (chat.welcome && (m.messageStubType == WAMessageStubType.GROUP_PARTICIPANT_REMOVE || m.messageStubType == WAMessageStubType.GROUP_PARTICIPANT_LEAVE)) {
const { pp, caption, mentions } = await generarDespedida({ conn, userId, groupMetadata, chat })
const contextInfo = {
mentionedJid: mentions,
isForwarded: true,
forwardingScore: 999,
forwardedNewsletterMessageInfo: {
newsletterJid,
newsletterName,
serverMessageId: -1
},
externalAdReply: {
title: packname,
body: 'I🍎 𓈒꒰ 𝐒𝐚𝐲𝐨̄𝐧𝐚𝐫𝐚... (TωT)/',
thumbnailUrl: getRandomIcono(),
sourceUrl: global.redes,
mediaType: 1,
renderLargerThumbnail: false
}
};
await conn.sendMessage(m.chat, { image: { url: pp }, caption, contextInfo }, { quoted: null })
}
}

export { generarBienvenida, generarDespedida }
export default handler