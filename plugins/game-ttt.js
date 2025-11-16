import TicTacToe from '../lib/tictactoe.js';

const handler = async (m, {conn, usedPrefix, command, text}) => {
  conn.game = conn.game || {};

  if (Object.values(conn.game).find((room) => room.id.startsWith('tictactoe') && [room.game.playerX, room.game.playerO].includes(m.sender))) {
    throw `${emoji2} You are still in a game with a user.`;
  }

  if (!text) {
    return m.reply(`${emoji} The name of the gaming room is required.\n\n*—◉ Example*\n*◉ ${usedPrefix + command} new room*`, m.chat);
  }

  let room = Object.values(conn.game).find((room) => room.state === 'WAITING' && (text ? room.name === text : true));

  if (room) {
    await m.reply(`${emoji} At the start of the game, one player joined the game..`);
    room.o = m.chat;
    room.game.playerO = m.sender;
    room.state = 'PLAYING';
    
    const arr = room.game.render().map((v) => {
      return {
        X: '❎',
        O: '⭕',
        1: '1️⃣',
        2: '2️⃣',
        3: '3️⃣',
        4: '4️⃣',
        5: '5️⃣',
        6: '6️⃣',
        7: '7️⃣',
        8: '8️⃣',
        9: '9️⃣',
      }[v];
    });

    const str = `
🎮 Tic-tac-toe 🎮

❎ = @${room.game.playerX.split('@')[0]}
⭕ = @${room.game.playerO.split('@')[0]}

        ${arr.slice(0, 3).join('')}
        ${arr.slice(3, 6).join('')}
        ${arr.slice(6).join('')}

Turn of @${room.game.currentTurn.split('@')[0]}
`.trim();

    if (room.x !== room.o) await conn.sendMessage(room.x, {text: str, mentions: conn.parseMention(str)}, {quoted: m});
    await conn.sendMessage(room.o, {text: str, mentions: conn.parseMention(str)}, {quoted: m});
  } else {
    room = {
      id: 'tictactoe-' + Date.now(),
      x: m.chat,
      o: '',
      game: new TicTacToe(m.sender, 'o'),
      state: 'WAITING',
      name: text
    };

    const imgplay = `https://cope-cdnmed.agilecontent.com/resources/jpg/8/9/1590140413198.jpg`;
    conn.reply(m.chat, `*🕹 Tic-tac-toe 🎮*\n\n◉ Waiting for the second player\n◉ To delete or exit the game, use the command *${usedPrefix}delttt*\n\n◉ To join the game, type: (${usedPrefix + command} ${text})`, m);
    conn.game[room.id] = room;
  }
};

handler.command = ['ttt', 'tictactoe'];
handler.group = true;
handler.register = true;

export default handler;