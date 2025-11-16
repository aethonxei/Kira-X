import fs from 'fs';

const charactersFilePath = './src/database/characters.json';
const ventaFilePath = './src/database/waifusVenta.json';

async function loadCharacters() {
  return JSON.parse(fs.readFileSync(charactersFilePath, 'utf-8'));
}

async function saveCharacters(characters) {
  fs.writeFileSync(charactersFilePath, JSON.stringify(characters, null, 2), 'utf-8');
}

async function loadVentas() {
  return JSON.parse(fs.readFileSync(ventaFilePath, 'utf-8'));
}

async function saveVentas(data) {
  fs.writeFileSync(ventaFilePath, JSON.stringify(data, null, 2), 'utf-8');
}

let handler = async (m, { conn, args }) => {
  const userId = m.sender;
  const user = global.db.data.users[userId];

  if (!args[0]) return m.reply('✿ Use: *#buywaifu <waifu name>*');

  const nombre = args.join(' ').trim().toLowerCase();

  const ventas = await loadVentas();
  const characters = await loadCharacters();

  const venta = ventas.find(w => w.name.toLowerCase() === nombre);
  if (!venta) return m.reply('✘ That waifu is not for sale.');

  if (venta.vendedor === userId) return m.reply('✘ You cant buy your own waifu.');

  const precio = parseInt(venta.precio);

  if (user.coin < precio) {
    return m.reply(`✘ You don't have enough. *${m.moneda}*. You need *¥${precio.toLocaleString()} ${m.moneda}*.`);
  }

  const waifu = characters.find(c => c.name.toLowerCase() === nombre);
  if (!waifu) return m.reply('✘ That character was not found in the database.');

  user.coin -= precio;
  const vendedorId = venta.vendedor;
  global.db.data.users[vendedorId].coin += precio;

  waifu.user = userId;
  waifu.status = "Claimed";

  const nuevasVentas = ventas.filter(w => w.name.toLowerCase() !== nombre);
  await saveVentas(nuevasVentas);
  await saveCharacters(characters);

  let nombreComprador = await conn.getName(userId);
  let textoPrivado = `✿ Your waifu *${waifu.name}* was bought by *${nombreComprador}*.\nYou won *¥${precio.toLocaleString()} ${m.moneda}*.`;
  await conn.sendMessage(vendedorId, { text: textoPrivado }, { quoted: m });

  m.reply(`✿ You have bought *${waifu.name}* by *¥${precio.toLocaleString()} ${m.moneda}* successfully!\nNow she's part of your harem.`);
};

handler.help = ['buywaifu <name>'];
handler.tags = ['waifus'];
handler.command = ['buywaifu', 'buycharacter', 'buychar', 'buyc'];
handler.group = true;
handler.register = true;

export default handler;