import { promises as fs } from 'fs';

const charactersFilePath = './src/database/characters.json';
const confirmaciones = new Map();

async function loadCharacters() {
  const data = await fs.readFile(charactersFilePath, 'utf-8');
  return JSON.parse(data);
}

async function saveCharacters(characters) {
  await fs.writeFile(charactersFilePath, JSON.stringify(characters, null, 2), 'utf-8');
}

let handler = async (m, { conn }) => {
  const sender = m.sender;
  const mentioned = m.mentionedJid?.[0];

  if (!mentioned) return m.reply('✿ You must tag someone to give all your waifus to..');
  if (mentioned === sender) return m.reply('✿ You cant give yourself your own waifus.');

  const characters = await loadCharacters();
  const myWaifus = characters.filter(c => c.user === sender);

  if (myWaifus.length === 0) return m.reply('✿ You dont have any waifus to give away.');

  const valorTotal = myWaifus.reduce((acc, w) => acc + (parseInt(w.value) || 0), 0);

  // Save request on map to confirm
  confirmaciones.set(sender, {
    waifus: myWaifus.map(c => c.id),
    receptor: mentioned,
    valorTotal
  });

  const textoConfirmacion = `「✐」 @${sender.split('@')[0]}, Are you sure you want to give all your characters to *@${mentioned.split('@')[0]}*?

❏ Characters to give away: *${myWaifus.length}*
❏ Total value: *${valorTotal.toLocaleString()}*

✐ To confirm, reply to this message with "*Accept*".
> This action cannot be undone; please double-check the information before confirming.`;

  await conn.sendMessage(m.chat, {
    text: textoConfirmacion,
    mentions: [sender, mentioned]
  }, { quoted: m });
};

handler.before = async function (m, { conn }) {
  const data = confirmaciones.get(m.sender);
  if (!data) return;

  if (m.text?.trim().toLowerCase() === 'accept') {
    confirmaciones.delete(m.sender);

    const characters = await loadCharacters();
    let regalados = 0;

    for (const char of characters) {
      if (data.waifus.includes(char.id) && char.user === m.sender) {
        char.user = data.receptor;
        char.status = "Claimed";
        regalados++;
      }
    }

    await saveCharacters(characters);

    return conn.sendMessage(m.chat, {
      text: `「✐」 You have successfully given away all your characters to *@${data.receptor.split('@')[0]}*!\n\n> ❏ Gift characters: *${regalados}*\n> ⴵ Total value: *${data.valorTotal.toLocaleString()}*`,
      mentions: [data.receptor]
    }, { quoted: m });
  }
};

handler.help = ['giveallharem @user'];
handler.tags = ['gacha'];
handler.command = ['giveallharem', 'regalarharem'];
handler.group = true;
handler.register = true;

export default handler;
