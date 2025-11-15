import fetch from "node-fetch"
import yts from "yt-search"

const youtubeRegexID = /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([a-zA-Z0-9_-]{11})/

const handler = async (m, { conn, text, command }) => {
  try {
    if (!text.trim()) {
      return conn.reply(m.chat, `✧ 𝙃𝙚𝙮! You must enter the *name or link* of the video/audio to download.`, m)
    }

    await conn.sendMessage(m.chat, { react: { text: "⏳", key: m.key }})

    let videoIdToFind = text.match(youtubeRegexID) || null
    let ytplay2 = await yts(videoIdToFind ? "https://youtu.be/" + videoIdToFind[1] : text)

    if (videoIdToFind) {
      const videoId = videoIdToFind[1]
      ytplay2 = ytplay2.all.find(item => item.videoId === videoId) || ytplay2.videos.find(item => item.videoId === videoId)
    }

    ytplay2 = ytplay2.all?.[0] || ytplay2.videos?.[0] || ytplay2
    if (!ytplay2) {
      await conn.sendMessage(m.chat, { react: { text: "❌", key: m.key }})
      return m.reply("⚠︎ I found no results, try another name or link..")
    }

    let { title, thumbnail, timestamp, views, ago, url, author } = ytplay2
    const vistas = formatViews(views)
    const canal = author?.name || "Unknown"

    const infoMessage = `
ㅤ۫ ㅤ  🍎 ୧   ˚ \`𝒅𝒐𝒘𝒏𝒍𝒐𝒂𝒅𝒊𝒏𝒈...\` !  ୨ 𖹭  ִֶָ  

᮫ؙܹ  ᳘︵᮫ּܹ࡛〫ࣥܳ⌒ؙ۫ ᮫ּ۪֯⏝ֺ࣯࠭۟ ᮫ּ〪࣭︶᮫ܹ᳟〫࠭߳፝֟᷼⏜᮫᮫ּ〪࣭࠭〬︵᮫ּ᳝̼࣪ 🍚⃘ᩚּ̟߲ ּ〪࣪︵᮫࣭࣪࠭ᰯּ〪࣪࠭⏜ְ࣮〫߳ ᮫ּׅ࣪۟︶᮫ܹׅ࠭〬 ᮫ּּ࣭᷼⏝ᩥ᮫〪ܹ۟࠭۟۟ ᮫ּؙ⌒᮫ܹ۫︵ᩝּּ۟࠭ ࣭۪۟
> 🧊✿⃘࣪◌ ֪ \`𝗧𝗶𝘁𝗹𝗲\` » *${title}*  
> 🧊✿⃘࣪◌ ֪ \`𝗖𝗵𝗮𝗻𝗻𝗲𝗹\` » *${canal}*  
> 🧊✿⃘࣪◌ ֪ \`𝗗𝘂𝗿𝗮𝘁𝗶𝗼𝗻\` » *${timestamp}*  
> 🧊✿⃘࣪◌ ֪ \`𝗩𝗶𝗲𝘄𝘀\` » *${vistas}*  
> 🧊✿⃘࣪◌ ֪ \`𝗣𝘂𝗯𝗹𝗶𝘀𝗵𝗲𝗱\` » *${ago}*  
> 🧊✿⃘࣪◌ ֪ \`𝗟𝗶𝗻𝗸\` » ${url} 
ᓭ݄︢݃ୄᰰ𐨎 𝐢︩۪𝆬͡ꗜ፝֟͜͡ꗜ︪۪𝆬͡ 𝐢   ᅟᨳᩘ🧁ଓ   ᅟ 𝐢︩۪𝆬͡ꗜ፝֟͜͡ꗜ︪۪𝆬͡ 𝐢ୄᰰ𐨎ᓯ︢

> 𐙚 🪵 ｡ Preparing your download... ˙𐙚
    `.trim()

    const thumb = (await conn.getFile(thumbnail))?.data
    await conn.reply(m.chat, infoMessage, m, {
      contextInfo: {
        externalAdReply: {
          title: botname,
          body: dev,
          mediaType: 1,
          thumbnail: thumb,
          renderLargerThumbnail: true,
          mediaUrl: url,
          sourceUrl: url
        }
      }
    })

    if (["play", "yta", "ytmp3", "playaudio"].includes(command)) {
      const audioData = await getAud(url)
      if (!audioData?.url) {
        await conn.sendMessage(m.chat, { react: { text: "❌", key: m.key }})
        return conn.reply(m.chat, "✦ The audio could not be downloaded. Please try again later..", m)
      }

      await conn.sendMessage(m.chat, {
        audio: { url: audioData.url },
        fileName: `${title}.mp3`,
        mimetype: "audio/mpeg",
        ptt: false
      }, { quoted: m })

      await conn.sendMessage(m.chat, { react: { text: "✅", key: m.key }})
    }

    else if (["play2", "ytv", "ytmp4", "mp4"].includes(command)) {
      const videoData = await getVid(url)
      if (!videoData?.url) {
        await conn.sendMessage(m.chat, { react: { text: "❌", key: m.key }})
        return conn.reply(m.chat, "✦ The video could not be downloaded. Please try again later.", m)
      }

      await conn.sendMessage(m.chat, {
        video: { url: videoData.url },
        fileName: `${title}.mp4`,
        caption: `${title}`,
        mimetype: "video/mp4"
      }, { quoted: m })

      await conn.sendMessage(m.chat, { react: { text: "✅", key: m.key }})
    }

    else {
      return conn.reply(m.chat, "✧︎ Invalid command, check the menu.", m)
    }

  } catch (error) {
    await conn.sendMessage(m.chat, { react: { text: "❌", key: m.key }})
    return m.reply(`⚠︎ Unexpected error:\n\n${error}`)
  }
}

handler.command = handler.help = ["play", "yta", "ytmp3", "play2", "ytv", "ytmp4", "playaudio", "mp4"]
handler.tags = ["descargas"]

export default handler

// ------------------ API LOGIC (added) ------------------

async function getAud(url) {
  const apis = [
    { api: 'ZenzzXD', endpoint: `${global.APIs.zenzxz.url}/downloader/ytmp3?url=${encodeURIComponent(url)}`, extractor: res => res.data?.download_url },
    { api: 'ZenzzXD v2', endpoint: `${global.APIs.zenzxz.url}/downloader/ytmp3v2?url=${encodeURIComponent(url)}`, extractor: res => res.data?.download_url },
    { api: 'Yupra', endpoint: `${global.APIs.yupra.url}/api/downloader/ytmp3?url=${encodeURIComponent(url)}`, extractor: res => res.result?.link },
    { api: 'Vreden', endpoint: `${global.APIs.vreden.url}/api/v1/download/youtube/audio?url=${encodeURIComponent(url)}&quality=128`, extractor: res => res.result?.download?.url },
    { api: 'Vreden v2', endpoint: `${global.APIs.vreden.url}/api/v1/download/play/audio?query=${encodeURIComponent(url)}`, extractor: res => res.result?.download?.url },
    { api: 'Xyro', endpoint: `${global.APIs.xyro.url}/download/youtubemp3?url=${encodeURIComponent(url)}`, extractor: res => res.result?.download }
  ]
  return await fetchFromApis(apis)
}

async function getVid(url) {
  const apis = [
    { api: 'ZenzzXD', endpoint: `${global.APIs.zenzxz.url}/downloader/ytmp4?url=${encodeURIComponent(url)}&resolution=360p`, extractor: res => res.data?.download_url },
    { api: 'ZenzzXD v2', endpoint: `${global.APIs.zenzxz.url}/downloader/ytmp4v2?url=${encodeURIComponent(url)}&resolution=360`, extractor: res => res.data?.download_url },
    { api: 'Yupra', endpoint: `${global.APIs.yupra.url}/api/downloader/ytmp4?url=${encodeURIComponent(url)}`, extractor: res => res.result?.formats?.[0]?.url },
    { api: 'Vreden', endpoint: `${global.APIs.vreden.url}/api/v1/download/youtube/video?url=${encodeURIComponent(url)}&quality=360`, extractor: res => res.result?.download?.url },
    { api: 'Vreden v2', endpoint: `${global.APIs.vreden.url}/api/v1/download/play/video?query=${encodeURIComponent(url)}`, extractor: res => res.result?.download?.url },
    { api: 'Xyro', endpoint: `${global.APIs.xyro.url}/download/youtubemp4?url=${encodeURIComponent(url)}&quality=360`, extractor: res => res.result?.download }
  ]
  return await fetchFromApis(apis)
}

async function fetchFromApis(apis) {
  for (const { api, endpoint, extractor } of apis) {
    try {
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 10000)
      const res = await fetch(endpoint, { signal: controller.signal }).then(r => r.json())
      clearTimeout(timeout)
      const link = extractor(res)
      if (link) return { url: link, api }
    } catch (e) {}
    await new Promise(resolve => setTimeout(resolve, 500))
  }
  return null
}

function formatViews(views) {
  if (!views) return "Not available"
  if (views >= 1_000_000_000) return `${(views / 1_000_000_000).toFixed(1)}B`
  if (views >= 1_000_000) return `${(views / 1_000_000).toFixed(1)}M`
  if (views >= 1_000) return `${(views / 1_000).toFixed(1)}k`
  return views.toString()
}
