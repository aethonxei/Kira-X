import axios from 'axios';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply(`${emoji} Please enter a *Terabox link*.`);
  await m.react('🕓');

  try {
    const result = await terabox(text);
    if (!result.length) return m.reply(`${emoji2} Enter a valid URL.`);

    for (let i = 0; i < result.length; i++) {
      const { fileName, type, thumb, url } = result[i];
      if (!fileName || !url) {
        console.error('Error: Incomplete file data', { fileName, url });
        continue;
      }

      const caption = `📄 *Name File:* ${fileName}\n📂 *Format:* ${type}\n🔗 URL: ${url}`;
      console.log(`Sending file: ${fileName}, URL: ${url}`);

      try {
        await conn.sendFile(m.chat, url, fileName, caption, m, false, {
          thumbnail: thumb ? await getBuffer(thumb) : null
        });
        await m.react('✅');
      } catch (error) {
        console.error('Error sending file:', error);
        m.reply(`${msm} Error sending file: ${fileName}`);
      }
    }
  } catch (err) {
    console.error('Error general:', err);
    m.reply('Error downloading the file.');
  }
};

handler.help = ["terabox *<url>*"];
handler.tags = ["dl"];
handler.command = ['terabox', 'tb'];
handler.group = true;
handler.register = true;
handler.coin = 5;

export default handler;

async function terabox(url) {
  return new Promise(async (resolve, reject) => {
    await axios
      .post('https://teradl-api.dapuntaratya.com/generate_file', {
        mode: 1,
        url: url
      })
      .then(async (a) => {
        const array = [];
        for (let x of a.data.list) {
          let dl = await axios
            .post('https://teradl-api.dapuntaratya.com/generate_link', {
              js_token: a.data.js_token,
              cookie: a.data.cookie,
              sign: a.data.sign,
              timestamp: a.data.timestamp,
              shareid: a.data.shareid,
              uk: a.data.uk,
              fs_id: x.fs_id
            })
            .then((i) => i.data)
            .catch((e) => e.response);

          if (!dl.download_link || !dl.download_link.url_1) {
            console.error('Error: Download link not found', dl);
            continue;
          }

          array.push({
            fileName: x.name,
            type: x.type,
            thumb: x.image,
            url: dl.download_link.url_1
          });
        }
        resolve(array);
      })
      .catch((e) => {
        console.error('Terabox API error:', e.response.data);
        reject(e.response.data);
      });
  });
}

async function getBuffer(url) {
  try {
    const res = await axios({
      method: 'get',
      url,
      responseType: 'arraybuffer'
    });
    return res.data;
  } catch (err) {
    console.error('Error obtaining buffer:', err);
    return null;
  }
}