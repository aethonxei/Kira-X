import fs from 'fs';

let handler = async (m, { text, usedPrefix, command }) => {
    if (!text) {
        return m.reply(`${emoji} Please enter the plugin name.`);
    }

    if (!m.quoted || !m.quoted.text) {
        return m.reply(`${emoji2} Reply to the message with the plugin content..`);
    }

    const ruta = `plugins/${text}.js`;
    
    try {
        await fs.writeFileSync(ruta, m.quoted.text);
        m.reply(`${emoji} Saving plugin in ${ruta}`);
    } catch (error) {
        m.reply(`${msm} An error occurred while saving the plugin.: ${error.message}`);
    }
};

handler.help = ['saveplugin'];
handler.tags = ['owner'];
handler.command = ["saveplugin"];
handler.owner = true;

export default handler;