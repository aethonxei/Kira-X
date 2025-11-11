import * as fs from 'fs';

export async function before(m, {conn, isAdmin, isBotAdmin, usedPrefix}) {
  if (m.isBaileys && m.fromMe) {
    return !0;
  }
  if (!m.isGroup) return !1;
  const chat = global.db.data.chats[m.chat];
  const bot = global.db.data.settings[this.user.jid] || {};
  const delet = m.key.participant;
  const bang = m.key.id;
  const name = await conn.getName(m.sender);
  const fakemek = {'key': {'participant': '0@s.whatsapp.net', 'remoteJid': '0@s.whatsapp.net'}, 'message': {'groupInviteMessage': {'groupJid': '120363400657975790@g.us', 'inviteCode': 'm', 'groupName': 'P', 'caption': 'Kira-X', 'jpegThumbnail': null}}};
  if (chat.antiTraba && m.text.length > 5000) { 
    if (isAdmin) return conn.sendMessage(m.chat, {text: `The administrator @${m.sender.split('@')[0]} just sent a text containing many characters. -.-!`, mentions: [m.sender]}, {quoted: fakemek});
    conn.sendMessage(m.chat, `*[ ! ] A message containing many characters was detected [ ! ]*\n`, `${isBotAdmin ? '' : 'Im not an administrator, I cant do anything :/'}`, m);
    if (isBotAdmin && bot.restrict) {
      conn.sendMessage(m.chat, {delete: {remoteJid: m.chat, fromMe: false, id: bang, participant: delet}});
        	setTimeout(() => {
        	conn.sendMessage(m.chat, {text: `Mark the chat as read ✓\n${'\n'.repeat(400)}\n=> The number : wa.me/${m.sender.split('@')[0]}\n=> Alias : ${name}\n[ ! ] You just sent a text containing many characters that may cause device malfunctions`, mentions: [m.sender]}, {quoted: fakemek});
      }, 0);
      setTimeout(() => {
        	conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
      }, 1000);
    } else if (!bot.restrict) return m.reply('[ ! ] To perform deletion actions, my owner has to turn on restricted mode!');
  }
  return !0;
}
