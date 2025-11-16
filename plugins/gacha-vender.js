import { promises as fs } from 'fs';

const charactersFile = './src/database/characters.json';
const waifusEnVentaFile = './src/database/waifusVenta.json';

async function loadCharacters() {
    const data = await fs.readFile(charactersFile, 'utf-8');
    return JSON.parse(data);
}
async function saveCharacters(characters) {
    await fs.writeFile(charactersFile, JSON.stringify(characters, null, 2));
}
async function loadVentas() {
    try {
        const data = await fs.readFile(waifusEnVentaFile, 'utf-8');
        return JSON.parse(data);
    } catch {
        return [];
    }
}
async function saveVentas(ventas) {
    await fs.writeFile(waifusEnVentaFile, JSON.stringify(ventas, null, 2));
}

let handler = async (m, { args, conn }) => {
    const userId = m.sender;
    const texto = args.join(' ').trim();

    let personaje = null;
    let precio = null;

    if (m.quoted?.text) {

        const idMatch = m.quoted.text.match(/𝙄𝘿:\s*\*([^\*]+)\*/i);
        if (!idMatch) return m.reply('✧ The ID of the cited character could not be found..');
        const id = idMatch[1].trim();
        const characters = await loadCharacters();
        personaje = characters.find(c => c.id === id);
        precio = parseInt(args[0]);
    } else {
        const precioDetectado = args.find(a => !isNaN(a));
        if (!precioDetectado) {
            return m.reply('✧ Enter a valid price.\n> Example: *#sell Miku Nakano 40000*');
        }

        precio = parseInt(precioDetectado);
        if (isNaN(precio) || precio < 1) {
            return m.reply('✧ The price must be a valid number more than 0.');
        }


        const nombre = args.filter(a => a !== precioDetectado).join(' ').toLowerCase();
        const characters = await loadCharacters();
        personaje = characters.find(c => c.name.toLowerCase() === nombre);

        if (!personaje) return m.reply(`✧ Character *"${nombre}"* not found.`);
    }

    if (personaje.user !== userId) return m.reply('✧ This waifu does not belong to you.');

    const ventas = await loadVentas();

    personaje.enVenta = true;
    personaje.precioVenta = precio;

    ventas.push({
        id: personaje.id,
        name: personaje.name,
        precio: precio,
        vendedor: userId,
        fecha: Date.now()
    });

    await saveCharacters(await loadCharacters());
    await saveVentas(ventas);

    m.reply(`✿ You have put up for sale *${personaje.name}* by *¥${precio.toLocaleString()} ${m.moneda}*.`);
};

handler.help = ['sellwaifu'];
handler.tags = ['waifus'];
handler.command = ['vender', 'sell', 'sellwaifu'];
handler.group = true;
handler.register = true;

export default handler;