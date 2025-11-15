import fetch from 'node-fetch'

const handler = async (m, { text, conn, args, usedPrefix, command }) => {
  const emoji = '🍎'
  const emoji2 = '❌'
  const msm = '⚠️'
  const done = '✅'
  const rwait = '⏳'

  if (!args[0]) {
    return conn.reply(
      m.chat,
      `${emoji} 𝐏𝐥𝐞𝐚𝐬𝐞 𝐞𝐧𝐭𝐞𝐫 𝐚 𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤 𝐥𝐢𝐧𝐤 🌐\n\n✨ Example:\n> *${usedPrefix + command} https://www.facebook.com/...*`,
      m
    )
  }

  try {
    await m.react(rwait)

    const apiUrl = `https://ruby-core.vercel.app/api/download/facebook?url=${encodeURIComponent(args[0])}`
    const res = await fetch(apiUrl)
    const json = await res.json()

    if (!json.status || !json.download) {
      await m.react('⚠️')
      return conn.reply(m.chat, `${emoji2} The video could not be retrieved, please check the link >w<`, m)
    }

    const { title, description, siteName } = json.metadata
    const videoUrl = json.download

    const caption = `
ㅤֺㅤ۪ㅤ   ׄ  ＼ㅤ｜ㅤ／  ׄ  ㅤִㅤ۫ 
> ꜒📺ᮀ࠘࿑  *\`𝐓𝐈𝐓𝐋𝐄\`*: ${title || 'Untitled'}
> ꜒📝ᮀ࠘࿑  *\`𝐃𝐄𝐒𝐂𝐑𝐈𝐏𝐓𝐈𝐎𝐍\`*: ${description || 'No description'}
> ꜒🌐ᮀ࠘࿑  *\`𝐎𝐑𝐈𝐆𝐈𝐍\`*: ${siteName || 'Facebook'}
> ꜒🧑🏻‍💻࿑  *\`𝐀𝐏𝐈\`*: Kira-Core by Aethon
╰┈➤ *Hey~! Here's your video 🍎 ~!* 
`.trim()

    await conn.sendMessage(
      m.chat,
      {
        video: { url: videoUrl },
        caption,
        fileName: 'facebook_video.mp4',
        mimetype: 'video/mp4',
        contextInfo: {
          externalAdReply: {
            title: '🪽 Kira-X Downloader 🪽',
            body: 'Direct download from Facebook 🍎',
            thumbnailUrl: 'https://files.catbox.moe/gegwez.jpg',
            sourceUrl: 'https://ruby-core.vercel.app/',
            mediaType: 1,
            renderLargerThumbnail: true
          }
        }
      },
      { quoted: m }
    )

    await m.react(done)
  } catch (e) {
    console.error(e)
    await m.react('⚠️')
    return conn.reply(m.chat, `${msm} There was an error processing the video. >_<`, m)
  }
}

handler.help = ['facebook', 'fb']
handler.tags = ['descargas']
handler.command = ['facebook', 'fb']
handler.group = true
handler.register = true
handler.coin = 2

export default handler
