import {googleImage} from '@bochilteam/scraper';
const handler = async (m, {conn, text, usedPrefix, command}) => {
if (!text) return conn.reply(m.chat, `${emoji} Please enter a search term.`, m);
await m.react(rwait)
conn.reply(m.chat, '🍎 Downloading your image, please wait a moment...', m)
const res = await googleImage(text);
const image = await res.getRandom();
const link = image;
const messages = [['Image 1', dev, await res.getRandom(),
[[]], [[]], [[]], [[]]], ['Image 2', dev, await res.getRandom(), [[]], [[]], [[]], [[]]], ['Image 3', dev, await res.getRandom(), [[]], [[]], [[]], [[]]], ['Image 4', dev, await res.getRandom(), [[]], [[]], [[]], [[]]]]
await conn.sendCarousel(m.chat, `${emoji} Result of ${text}`, '⪛✰ Image - Search ✰⪜', null, messages, m);
};
handler.help = ['imagen'];
handler.tags = ['buscador', 'tools', 'descargas'];
handler.command = ['image', 'imagen'];
handler.register = true

export default handler;