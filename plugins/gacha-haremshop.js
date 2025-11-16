import fs from 'fs';

const ventaPath = './src/database/waifusVenta.json';
const charPath = './src/database/characters.json';

function formatoFecha(fechaMs) {
  try {
    const fecha = new Date(fechaMs);
    return fecha.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  } catch {
    return '-';
  }
}

let handler = async (m, { conn, args }) => {
  let ventas = [], personajes = [];

  try {
    ventas = JSON.parse(fs.readFileSync(ventaPath, 'utf-8'));
    personajes = JSON.parse(fs.readFileSync(charPath, 'utf-8'));
    if (!Array.isArray(ventas) || !Array.isArray(personajes)) throw new Error('Error in the file structure.');
  } catch (e) {
    return m.reply(`✘ Error reading data.\n*Details:* ${e.message}`);
  }

  if (!ventas.length) {
    return m.reply('✿ There are currently no waifus for sale.');
  }

  let page = parseInt(args[0]) || 1;
  const pageSize = 10;
  const totalPages = Math.ceil(ventas.length / pageSize);
  if (page < 1 || page > totalPages) {
    return m.reply(`✘ Invalid page. There is *${totalPages}* available page(s).`);
  }

  const inicio = (page - 1) * pageSize;
  const waifusPagina = ventas.slice(inicio, inicio + pageSize);
  let texto = `◢✿ *Waifus for sale* ✿◤\n\n`;
  let mencionados = [];

  for (let i = 0; i < waifusPagina.length; i++) {
    try {
      let { name, precio, vendedor, fecha } = waifusPagina[i];

      const p = personajes.find(p => p.name.toLowerCase() === name.toLowerCase());
      const valorOriginal = p?.value || 'Unknown';
      const idPersonaje = p?.id || 'Unknown';

      let username;
      try {
        username = await conn.getName(vendedor);
      } catch {
        username = `@${(vendedor || '').split('@')[0] || 'unknown'}`;
      }

      texto += `✰ ${inicio + i + 1} » *${name}* (*${valorOriginal.toLocaleString()})*\n`;
      texto += `  🛒 Sale price: *¥${(precio || 0).toLocaleString()} ${m.moneda}*\n`;
      texto += `  🆔 ID: *${idPersonaje}*\n`;
      texto += `  👤 Seller: ${username}\n`;
      texto += `  📅 Published: ${formatoFecha(fecha)}\n\n`;

      if (vendedor) mencionados.push(vendedor);
    } catch (err) {
      texto += `✘ Error loading waifu: ${err.message}\n\n`;
    }
  }

  texto += `> Page *${page}* of *${totalPages}*\n`;
  if (page < totalPages) {
    texto += `> Use *#haremshop ${page + 1}* to see the next page.\n`;
  }

  try {
    await conn.sendMessage(m.chat, {
      text: texto,
      mentions: mencionados
    }, { quoted: m });
  } catch (err) {
    return m.reply(`✘ Error sending list:\n${err.message}`);
  }
};

handler.help = ['waifusventa [page]'];
handler.tags = ['waifus'];
handler.command = ['haremshop', 'waifustore', 'wshop'];
handler.group = true;
handler.register = true;

export default handler;