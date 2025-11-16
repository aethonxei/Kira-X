const timeout = 60000;
const poin = 500;
const poin_lose = -100;
const poin_bot = 200;
const handler = async (m, {conn, usedPrefix, text}) => {
  conn.suit = conn.suit ? conn.suit : {};
  
  const userToChallenge = m.mentionedJid[0] || (m.replyMessage && m.replyMessage.sender);
  
  if (Object.values(conn.suit).find((room) => room.id.startsWith('suit') && [room.p, room.p2].includes(m.sender))) throw `${emoji2} Finish your game before starting another one.`;
  
  const textquien = `${emoji} Who do you want to challenge? Tag a user.\n\n*—◉ Example:*\n${usedPrefix}suit @tag`;
  
  if (!userToChallenge) return m.reply(textquien, m.chat, {mentions: conn.parseMention(textquien)});
  
  if (Object.values(conn.suit).find((room) => room.id.startsWith('suit') && [room.p, room.p2].includes(userToChallenge))) throw `${emoji2} The user is still in a game; please wait until it finishes before playing..`;
  
  const id = 'suit_' + new Date() * 1;
  const caption = `🎮 Games - PVP - Games 🎮\n\n—◉ @${m.sender.split`@`[0]} Challenge @${userToChallenge.split`@`[0]} to a rock, paper, scissors PVP\n◉ Type "accept" to accept\n◉ Type "reject" to reject\nresponding to the message`;
  const imgplaygame = `https://www.merca2.es/wp-content/uploads/2020/05/Piedra-papel-o-tijera-0003318_1584-825x259.jpeg`;
  
  conn.suit[id] = {
    chat: await conn.sendMessage(m.chat, {text: caption, mentions: [m.sender, userToChallenge]}, {caption}),
    id: id,
    p: m.sender,
    p2: userToChallenge,
    status: 'wait',
    waktu: setTimeout(() => {
      if (conn.suit[id]) conn.reply(m.chat, `${emoji2} Waiting time expired, the PVP is cancelled due to lack of response..`, m);
      delete conn.suit[id];
    }, timeout),
    poin, poin_lose, poin_bot, timeout,
  };
};

handler.command = ['suitpvp', 'pvp', 'suit'];
handler.group = true;
handler.register = true;
handler.game = true;

export default handler;