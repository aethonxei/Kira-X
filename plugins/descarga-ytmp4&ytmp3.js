//─────────────────────────────

import fetch from 'node-fetch'
import yts from 'yt-search'

const newsletterJid = '120363420610572685@newsletter'
const newsletterName = '𖥔🍎ᩚ⋆｡˚ ꒰❄︎ ʸᵃᵍᵃᵐⁱ-ˡⁱᵍʰᵗ | ᴄʜᴀɴɴᴇʟ-ʙᴏᴛ ꒱࣭'

const handler = async (m, { conn, args, usedPrefix, command }) => {
  const emoji = command.includes('mp4') ? '🎥' : '🎵'
  const contextInfo = {
    mentionedJid: [m.sender],
    isForwarded: true,
    forwardingScore: 999,
    forwardedNewsletterMessageInfo: {
      newsletterJid,
      newsletterName,
      serverMessageId: -1
    },
    externalAdReply: {
      title: wm,
      body: dev,
      thumbnail: icons,
      sourceUrl: redes,
      mediaType: 1,
      renderLargerThumbnail: false
    }
  }

  if (!args[0]) {
    return conn.reply(
      m.chat,
      `${emoji} *Please enter a YouTube link or video name.*\n\nExample:\n\`${usedPrefix + command} https://youtu.be/????\``,
      m,
      { contextInfo, quoted: m }
    )
  }

  try {
    await conn.reply(
      m.chat,
      command.includes('mp4')
        ? `🍁 *W A I T*\n- 🍃 Your video is downloading, give me a moment >w<`
        : `🍎 *Processing your request...*\nJust a moment~ 🎧`,
      m,
      { contextInfo, quoted: m }
    )

    const text = args.join(' ')
    const videoMatch = text.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/|v\/))([a-zA-Z0-9_-]{11})/)
    const query = videoMatch ? 'https://youtu.be/' + videoMatch[1] : text

    const search = await yts(query)
    const result = videoMatch ? search.videos.find(v => v.videoId === videoMatch[1]) || search.all[0] : search.all[0]
    if (!result) throw '⚠ No results were found.'

    const { title, thumbnail, timestamp, views, ago, url, author, seconds } = result
    if (seconds > 1800) throw '⚠ The content exceeds the duration limit (10 minutes).'

    const vistas = formatViews(views)
    const captionHeader = `╭───[ ${command.includes('mp4') ? '𝚈𝚃𝙼𝙿𝟺 🎬' : '𝚈𝚃𝙼𝙿𝟹 🎶'} ]───⬣`
    const info = `${captionHeader}
📌 *Title:* ${title}
👤 *Channel:* ${author.name}
⏱️ *Duration:* ${timestamp}
👁️ *Views:* ${vistas}
📅 *Published:* ${ago}
🔗 *Link:* ${url}
╰────────────────⬣`

    const thumb = (await conn.getFile(thumbnail)).data
    await conn.sendMessage(m.chat, { image: thumb, caption: info }, { quoted: m })

    if (command.includes('mp3')) {
      const audio = await getAud(url)
      if (!audio?.url) throw '⚠ The audio could not be obtained.'
      await conn.reply(m.chat, `> ❀ *Processed audio. Server:* \`${audio.api}\``, m, { contextInfo })
      await conn.sendMessage(
        m.chat,
        { audio: { url: audio.url }, fileName: `${title}.mp3`, mimetype: 'audio/mpeg' },
        { quoted: m }
      )
    } else {
      const video = await getVid(url)
      if (!video?.url) throw '⚠ The video could not be obtained.'
      await conn.reply(m.chat, `> ❀ *Video processed. Server:* \`${video.api}\``, m, { contextInfo })
      await conn.sendMessage(
        m.chat,
        { video: { url: video.url }, caption: `> 🎞️ ${title}`, mimetype: 'video/mp4', fileName: `${title}.mp4` },
        { quoted: m }
      )
    }
  } catch (e) {
    console.error(e)
    return conn.reply(
      m.chat,
      `❌ *An error occurred while processing the download.*\n> ${typeof e === 'string' ? e : e.message}`,
      m,
      { contextInfo, quoted: m }
    )
  }
}

handler.help = ['ytmp3', 'ytaudio', 'ytmp4', 'ytvideo']
handler.tags = ['descargas']
handler.command = ['ytmp3', 'ytaudio', 'ytmp4', 'ytvideo']
handler.limit = true
export default handler

// ─────────────────────────────
// Multi API fallback system (KT style)
// ─────────────────────────────

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
    } catch {}
    await new Promise(r => setTimeout(r, 500))
  }
  return null
}

function formatViews(views) {
  if (views === undefined) return "Not available"
  if (views >= 1_000_000_000) return `${(views / 1_000_000_000).toFixed(1)}B (${views.toLocaleString()})`
  if (views >= 1_000_000) return `${(views / 1_000_000).toFixed(1)}M (${views.toLocaleString()})`
  if (views >= 1_000) return `${(views / 1_000).toFixed(1)}k (${views.toLocaleString()})`
  return views.toString()
}
