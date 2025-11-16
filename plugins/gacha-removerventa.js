import fs from 'fs';

const ventaFilePath = './src/database/waifusVenta.json';

async function loadVentas() {
  return JSON.parse(fs.readFileSync(ventaFilePath, 'utf-8'));
}

async function saveVentas(data) {
  fs.writeFileSync(ventaFilePath, JSON.stringify(data, null, 2), 'utf-8');
}

let handler = async (m, { conn, args }) => {
  const userId = m.sender;

  if (!args[0]) {
    return m.reply('✿ Usa: *#removerwaifu <nombre del personaje>*');
  }

  const nombre = args.join(' ').trim().toLowerCase();

  const ventas = await loadVentas();
  const venta = ventas.find(v => v.name.toLowerCase() === nombre);

  if (!venta) {
    return m.reply('✘ That waifu is not for sale.');
  }

  if (venta.vendedor !== userId) {
    return m.reply('✘ You cant remove a waifu that isnt yours..');
  }

  const nuevasVentas = ventas.filter(v => v.name.toLowerCase() !== nombre);
  await saveVentas(nuevasVentas);

  m.reply(`✿ You have removed *${venta.name}* Out of sale. No longer available for purchase.`);
};

handler.help = ['removewaifu <name>'];
handler.tags = ['waifus'];
handler.command = ['removewaifu', 'removechar', 'removesale'];
handler.group = true;
handler.register = true;

export default handler;
