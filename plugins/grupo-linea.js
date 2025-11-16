let handler = async (m, { conn, args }) => {
  try {
    let id = args?.[0]?.match(/\d+\-\d+@g.us/) || m.chat;

    const participantesUnicos = Object.values(conn.chats[id]?.messages || {})
      .map((item) => item.key.participant)
      .filter((value, index, self) => self.indexOf(value) === index);

    const listaEnLinea =
      participantesUnicos
        .map((k) => `@${k.split("@")[0]}`)
        .join("\n") || "*✧ There are no users online at this time :c.*";

    const mensaje = `*♡ List of online users:*\n\n${listaEnLinea}\n\n> ${dev}`;

    await conn.sendMessage(m.chat, {
      text: mensaje,
      mentions: participantesUnicos,
    });

    await m.react("✅");
  } catch (error) {
    console.error(error);
    await m.reply(`${msm} There was an error sending the user list.`);
  }
};

handler.help = ["listonline"];
handler.tags = ["grupo"];
handler.command = ["listonline", "online", "linea", "enlinea"];
handler.group = true;
handler.fail = null;

export default handler;