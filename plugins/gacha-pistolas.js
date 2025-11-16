import fs from 'fs/promises';
const userConfigFile = './src/database/userClaimConfig.json';

let handler = async (m, { args }) => {
    const userId = m.sender;
    const texto = args.join(' ').trim();

    if (!texto) {
        return m.reply(`《✧》You must specify a message to claim a character.\n\n> Examples:\n*#setclaim $user has claimed $character!*\n*#setclaim Now $user is the owner of $character.*`);
    }

    let config = {};
    try {
        const data = await fs.readFile(userConfigFile, 'utf-8');
        config = JSON.parse(data);
    } catch { config = {}; }

    config[userId] = texto;
    await fs.writeFile(userConfigFile, JSON.stringify(config, null, 2));
    m.reply('✧ Your personalized message was saved successfully!');
};

handler.help = ['setclaim <message>'];
handler.tags = ['waifus'];
handler.command = ['setclaim'];
handler.group = true;

export default handler;
