import fs from 'fs';
import path from 'path';

export default async function handler(m, { conn }) {
    try {
        const usuario = global.db.data.users[m.sender];
        const costo = 1000;

        // Check if the user is registered
        if (!usuario) {
            return m.reply(`${emoji2} You are not registered in the database.`);
        }

        // Verify if the user has enough money
        if (usuario.coin < costo) {
            return m.reply(`${emoji2} You don't have enough money.\nYou Have: ${usuario.coin}\nYou need: ${costo}`);
        }

        const carpeta = './media/temu/';

        // Check if the folder exists
        if (!fs.existsSync(carpeta)) {
            return m.reply(`${emoji2} The order image folder does not exist.`);
        }

        const archivos = fs.readdirSync(carpeta);

        // Filter order and arrival files
        const pedidos = archivos.filter(f => /^pedido\d+\.(jpg|jpeg|png)$/i.test(f));
        const llegadas = archivos.filter(f => /^llegada\d+\.(jpg|jpeg|png)$/i.test(f));

        // Check if there are images of orders and arrivals
        if (pedidos.length === 0 || llegadas.length === 0) {
            return m.reply(`${emoji2} No valid order and arrival images were found.`);
        }

        // Match order images with arrival images
        const combos = pedidos.map(pedido => {
            const numero = pedido.match(/\d+/)[0];
            const llegada = llegadas.find(l => l.match(new RegExp(`llegada${numero}\\.(jpg|jpeg|png)$`, 'i')));
            if (llegada) {
                return {
                    pedido: path.join(carpeta, pedido),
                    llegada: path.join(carpeta, llegada)
                };
            }
        }).filter(Boolean);

        // Check if any valid combo was found
        if (combos.length === 0) {
            return m.reply(`${emoji2} No matching order and arrival image combos were found.`);
        }

        // Subtract the cost of coins
        usuario.coin -= costo;

        const combo = combos[Math.floor(Math.random() * combos.length)];
        const nombrePedido = path.basename(combo.pedido);
        const nombreLlegada = path.basename(combo.llegada);

        // Send the order image
        await conn.sendFile(m.chat, combo.pedido, nombrePedido, `✅ You ordered a package in Temu\nCost: ${costo} ${m.moneda}\nArrives in 30 seconds...`, m);

        // Send the arrival image after 30 seconds
        setTimeout(() => {
            conn.sendFile(m.chat, combo.llegada, nombreLlegada, `📦 @${m.sender.split('@')[0]}, Your Temu package has arrived!!`, m, { mentions: [m.sender] });
        }, 30 * 1000);

    } catch (error) {
        console.error(error);
        m.reply(`${emoji2} An unexpected error occurred: ${error.message}`);
    }
}

handler.help = ['temu'];
handler.tags = ['fun'];
handler.command = ['temu'];
handler.register = true;