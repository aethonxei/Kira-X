import fetch from 'node-fetch';

const handler = async (m, { conn, args }) => {
    if (!args[0]) throw '📎 *Please provide a valid MediaFire link.*\n\nExample: `.mf https://www.mediafire.com/file/xxxxxx/file.apk/file`';

    if (!args[0].includes('mediafire.com')) throw '❌ *That MediaFire link is invalid..*';

    try {
        // Aesthetic reaction
        await conn.sendMessage(m.chat, { react: { text: '✨', key: m.key } });

        let apiUrl = `https://api.sylphy.xyz/download/mediafire?url=${encodeURIComponent(args[0])}&apikey=sylph-30fc019324`;

        let res = await fetch(apiUrl);
        let json = await res.json();

        if (!json.status) throw '⚠️ *The file could not be downloaded, please check the link.*';

        let { filename, filesize, mimetype, dl_url } = json.data;

        await conn.sendMessage(
            m.chat,
            {
                document: { url: dl_url },
                mimetype,
                fileName: filename,
                caption: `📂 *Name:* ${filename}\n📦 *Size:* ${filesize}`
            },
            { quoted: m }
        );

    } catch (err) {
        console.error(err);
        throw '❌ *An error occurred while processing your request..*';
    }
};

handler.command = ['mf', 'mediafire'];
handler.help = ['mediafire <url>'];
handler.tags = ['descargas'];

export default handler;
