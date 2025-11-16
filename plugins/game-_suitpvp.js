const handler = (m) => m;
handler.before = async function(m) {
  this.suit = this.suit ? this.suit : {};
  if (db.data.users[m.sender].suit < 0) db.data.users[m.sender].suit = 0;
  const room = Object.values(this.suit).find((room) => room.id && room.status && [room.p, room.p2].includes(m.sender));
  if (room) {
    let win = '';
    let tie = false;
    if (m.sender == room.p2 && /^(acc(ept)?|terima|accept|gas|I will acceptt?|nao|gamau|decline|ga(k.)?bisa)/i.test(m.text) && m.isGroup && room.status == 'wait') {
      if (/^(tolak|gamau|decline|ga(k.)?bisa)/i.test(m.text)) {
        const textno = `${emoji2} @${room.p2.split`@`[0]} rejected PVP, the game is cancelled.`;
        m.reply(textno, null, {mentions: this.parseMention(textno)});
        delete this.suit[room.id];
        return !0;
      }
      room.status = 'play';
      room.asal = m.chat;
      clearTimeout(room.waktu);
      const textplay = `🎮 Games - PVP - Games 🎮\n\n—◉ The game begins, the options have been sent to the private chats of @${room.p.split`@`[0]} and @${room.p2.split`@`[0]}\n\n◉ Please select an option in your private chats, respectively.\n*◉ Choose an option on wa.me/${conn.user.jid.split`@`[0]}*`;
      m.reply(textplay, m.chat, {mentions: this.parseMention(textplay)});
      const comienzop = `${emoji} Please select one of the following options:
rock
paper
scissors\nWinner +${room.poin}XP\nLoser ${room.poin_lose}XP\n*Reply to the message with the option you want*
*example: paper*`;
      const comienzop2 = `${emoji} Please select one of the following options:
rock
paper
scissors\nWinner +${room.poin}XP\nLoser ${room.poin_lose}XP\n*Please reply to the message with your preferred option.*
*Example: paper*`;

      if (!room.pilih) this.sendMessage(room.p, {text: comienzop}, {quoted: m});
      if (!room.pilih2) this.sendMessage(room.p2, {text: comienzop2}, {quoted: m});
      room.waktu_milih = setTimeout(() => {
        const iniciativa = `${emoji2} No player took the initiative to start the game; the PVP has been cancelled.`;
        if (!room.pilih && !room.pilih2) this.sendMessage(m.chat, {text: iniciativa}, {quoted: m});
        else if (!room.pilih || !room.pilih2) {
          win = !room.pilih ? room.p2 : room.p;
          const textnull = `${emoji2} @${(room.pilih ? room.p2 : room.p).split`@`[0]} You didn't choose any option, end of PVP.`;
          this.sendMessage(m.chat, {text: textnull}, {quoted: m}, {mentions: this.parseMention(textnull)});
          db.data.users[win == room.p ? room.p : room.p2].exp += room.poin;
          db.data.users[win == room.p ? room.p : room.p2].exp += room.poin_bot;
          db.data.users[win == room.p ? room.p2 : room.p].exp -= room.poin_lose;
        }
        delete this.suit[room.id];
        return !0;
      }, room.timeout);
    }
    const jwb = m.sender == room.p;
    const jwb2 = m.sender == room.p2;
    const g = /scissors/i;
    const b = /rock/i;
    const k = /paper/i;
    const reg = /^(scissors|rock|paper)/i;
    if (jwb && reg.test(m.text) && !room.pilih && !m.isGroup) {
      room.pilih = reg.exec(m.text.toLowerCase())[0];
      room.text = m.text;
      m.reply(`${emoji} You have chosen ${m.text}, return to the group and ${room.pilih2 ? `Check the results` : 'Wait for the results'}`);
      if (!room.pilih2) this.reply(room.p2, `${emoji2} Your opponent has chosen, it's your turn to choose!.`, 0);
    }
    if (jwb2 && reg.test(m.text) && !room.pilih2 && !m.isGroup) {
      room.pilih2 = reg.exec(m.text.toLowerCase())[0];
      room.text2 = m.text;
      m.reply(`${emoji} You have chosen ${m.text}, return to the group and ${room.pilih ? `Check the results` : 'Wait for the results'}`);
      if (!room.pilih) this.reply(room.p, `${emoji2} Your opponent has chosen, it's your turn to choose!.`, 0);
    }
    const stage = room.pilih;
    const stage2 = room.pilih2;
    if (room.pilih && room.pilih2) {
      clearTimeout(room.waktu_milih);
      if (b.test(stage) && g.test(stage2)) win = room.p;
      else if (b.test(stage) && k.test(stage2)) win = room.p2;
      else if (g.test(stage) && k.test(stage2)) win = room.p;
      else if (g.test(stage) && b.test(stage2)) win = room.p2;
      else if (k.test(stage) && b.test(stage2)) win = room.p;
      else if (k.test(stage) && g.test(stage2)) win = room.p2;
      else if (stage == stage2) tie = true;
      this.reply(room.asal, `
*👑 PVP Results 👑*${tie ? '\n*—◉ Draw!!*' : ''}
*@${room.p.split`@`[0]} (${room.text})* ${tie ? '' : room.p == win ? ` *Won 🥳 +${room.poin}XP*` : ` *Lost 🤡 ${room.poin_lose}XP*`}
*@${room.p2.split`@`[0]} (${room.text2})* ${tie ? '' : room.p2 == win ? ` *Won 🥳 +${room.poin}XP*` : ` *Lost 🤡 ${room.poin_lose}XP*`}
`.trim(), m, {mentions: [room.p, room.p2]} );
      if (!tie) {
        db.data.users[win == room.p ? room.p : room.p2].exp += room.poin;
        db.data.users[win == room.p ? room.p : room.p2].exp += room.poin_bot;
        db.data.users[win == room.p ? room.p2 : room.p].exp += room.poin_lose;
      }
      delete this.suit[room.id];
    }
  }
  return !0;
};
handler.exp = 0;
export default handler;
function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}