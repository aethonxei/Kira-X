import fetch from 'node-fetch';
import { Sticker } from 'wa-sticker-formatter';

/**
 * Shuffle (Fisher–Yates)
 * @param {Array} arr
 * @returns {Array}
 */
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Main handler
 * Expects: msg, { conn, text, usedPrefix, command }
 */
let handler = async (msg, { conn, text, usedPrefix, command }) => {
  // quick reaction if available
  if (msg.react) try { msg.react('🎴'); } catch (e) { /* ignore */ }

  if (!text || !text.trim()) {
    throw '🔍 *Usage example:* ' + (usedPrefix + command) + ' <search terms>';
  }

  const apiUrl = 'https://zenzxz.dpdns.org/search/stickerlysearch?query=' + encodeURIComponent(text);

  try {
    const res = await fetch(apiUrl, { method: 'GET' });
    if (!res.ok) throw new Error('❌ Error connecting to the API. Status: ' + res.status);

    const body = await res.json();

    // SAFER validation
    if (!body || !body.data || !Array.isArray(body.data) || body.data.length === 0) {
      throw new Error('😿 No stickers found for that search.');
    }

    // shuffle and pick up to 5
    const pool = shuffleArray(body.data.slice());
    const picks = pool.slice(0, 5);

    for (const item of picks) {
      try {
        // item.thumbnailUrl might be a URL. Fetch it and get Buffer.
        let thumbBuf;
        if (item.thumbnailUrl && typeof item.thumbnailUrl === 'string') {
          const tRes = await fetch(item.thumbnailUrl);
          if (!tRes.ok) {
            // fallback: skip this sticker if thumbnail fetch fails
            console.error('Thumbnail fetch failed for', item.thumbnailUrl, 'status', tRes.status);
            continue;
          }
          const arrayBuffer = await tRes.arrayBuffer();
          thumbBuf = Buffer.from(arrayBuffer);
        } else {
          console.error('Missing thumbnailUrl, skipping item:', item);
          continue;
        }

        const st = new Sticker(thumbBuf, {
          pack: item.name || 'stickerpack',
          author: item.author || 'unknown',
          type: 'full',
          categories: ['🔎'],
          id: 'stickerly-' + Date.now(),
          quality: 80
        });

        const stickerBuffer = await st.toBuffer();
        await conn.sendMessage(msg.chat, { sticker: stickerBuffer }, { quoted: msg });
      } catch (innerErr) {
        console.error('Error creating/sending sticker for item:', item, innerErr);
      }
    }
  } catch (err) {
    console.error(err);
    throw '❌ There was an error searching or sending the stickers.';
  }
};

// metadata (same names as original)
handler.help = ['stickerly <text>'];
handler.tags = ['sticker', 'internet'];
handler.command = ['stickerly', 'stickersearch', 'stickerpack'];
handler.limit = true;

export default handler;