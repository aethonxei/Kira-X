import { promises as fs } from 'fs';

const charactersFilePath = './src/database/characters.json';
const userFavFilePath = './src/database/charactersfav.json';

async function loadCharacters() {
  const data = await fs.readFile(charactersFilePath, 'utf-8');
  return JSON.parse(data);
}

async function saveCharacters(characters) {
  await fs.writeFile(charactersFilePath, JSON.stringify(characters, null, 2), 'utf-8');
}

async function loadUserFavs() {
  try {
    const data = await fs.readFile(userFavFilePath, 'utf-8');
    return JSON.parse(data);
  } catch {
    return {};
  }
}

async function saveUserFavs(favs) {
  await fs.writeFile(userFavFilePath, JSON.stringify(favs, null, 2), 'utf-8');
}

let handler = async (m, { args }) => {
  if (!args[0]) return m.reply('✿ You must write the name of the character you want to set as your favorite..');

  let characters = await loadCharacters();
  let favs = await loadUserFavs();

  const characterName = args.join(' ').toLowerCase();
  const userId = m.sender;

  let character = characters.find(c => c.name.toLowerCase() === characterName);
  if (!character) return m.reply('✿ Character not found.');

  if (favs[userId] && favs[userId] !== character.name) {
    let prevChar = characters.find(c => c.name === favs[userId]);
    if (prevChar && prevChar.favorites > 0) prevChar.favorites--;
  }

  character.favorites = (character.favorites || 0) + 1;
  favs[userId] = character.name;

  await saveCharacters(characters);
  await saveUserFavs(favs);

  await m.reply(`✐ Now *${character.name}* is your favorite character!`);
};

handler.help = ['setfav <name>'];
handler.tags = ['anime'];
handler.command = ['setfav', 'setfavorite'];
handler.group = true;
handler.register = true;

export default handler;
