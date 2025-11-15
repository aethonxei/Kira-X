import fetch from "node-fetch";
import { download, detail, search } from "../lib/anime.js";

async function getLangs(episodes) {
    const list = [];
    for (const ep of episodes) {
        try {
            const dl = await download(ep.link);
            const langs = [];
            if (dl?.dl?.sub) langs.push("sub");
            if (dl?.dl?.dub) langs.push("dub");
            list.push({ ...ep, lang: langs });
        } catch {
            list.push({ ...ep, lang: [] });
        }
    }
    return list;
}

let handler = async (m, { command, usedPrefix, conn, text, args }) => {
    if (!text) return m.reply(
        `🌱 *Enter the title of an anime or the URL.*\n\n` +
        `• ${usedPrefix + command} Mushoku Tensei\n` +
        `• ${usedPrefix + command} https://animeav1.com/media/mushoku-tensei`
    );

    try {
        if (text.includes("https://animeav1.com/media/")) {
            m.react("⌛");
            let info = await detail(args[0]);
            let { title, altTitle, description, cover, votes, rating, total, genres } = info;

            let episodes = await getLangs(info.episodes);
            const gen = genres.join(", ");

            let eps = episodes.map(e => {
                return `• Episode ${e.ep} (${e.lang.includes("sub") ? "SUB" : ""}${e.lang.includes("dub") ? (e.lang.includes("sub") ? " & " : "") + "DUB" : ""})`;
            }).join("\n");

            let caption = `
乂 \`\`\`ANIME - DOWNLOAD\`\`\`

≡ 🌷 *Title :* ${title} - ${altTitle}
≡ 🌾 *Description :* ${description}
≡ 🌲 *Votes :* ${votes}
≡ 🍂 *Rating :* ${rating}
≡ 🍃 *Genres :* ${gen}
≡ 🌱 *Total episodes :* ${total}
≡ 🌿 *Available episodes :*

${eps}

> Reply to this message with the episode number and language. Example: *1 sub*, *3 dub*
`.trim();

            let buffer = await (await fetch(cover)).arrayBuffer();
            let sent = await conn.sendMessage(
                m.chat,
                { image: Buffer.from(buffer), caption },
                { quoted: m }
            );

            conn.anime = conn.anime || {};
            conn.anime[m.sender] = {
                title,
                episodes,
                key: sent.key,
                downloading: false,
                timeout: setTimeout(() => delete conn.anime[m.sender], 600_000) // 10 minutos
            };

        } else {
            m.react("🔍");
            const results = await search(text);

            if (!results.length) return m.reply("❌ No results were found.", m);

            let cap = `乂 *ANIME - SEARCH*\n`;
            results.slice(0, 15).forEach((res, index) => {
                cap += `\n\`${index + 1}\`\n≡ 🌴 *Title :* ${res.title}\n≡ 🌱 *Link :* ${res.link}\n`;
            });

            await conn.sendMessage(m.chat, { text: cap }, { quoted: m });
            m.react("🌱");
        }
    } catch (e) {
        console.error("Error in anime handler:", e);
        m.reply("⚠️ Error processing request: " + e.message);
    }
};

handler.before = async (m, { conn }) => {
    conn.anime = conn.anime || {};
    const session = conn.anime[m.sender];
    if (!session || !m.quoted || m.quoted.id !== session.key.id) return;

    if (session.downloading) return m.reply("⏳ You are now downloading an episode. Please wait for it to finish..");

    let [epStr, langInput] = m.text.trim().split(/\s+/);
    const epi = parseInt(epStr);
    let idioma = langInput?.toLowerCase();

    if (isNaN(epi)) return m.reply("❌ Invalid episode number.");

    const episode = session.episodes.find(e => parseInt(e.ep) === epi);
    if (!episode) return m.reply(`❌ Episode ${epi} not found.`);

    const inf = await download(episode.link);
    const availableLangs = Object.keys(inf.dl || {});
    if (!availableLangs.length) return m.reply(`❌ No languages are available for this episode. ${epi}.`);

    if (!idioma || !availableLangs.includes(idioma)) {
        idioma = availableLangs[0]; // fallback
    }

    const idiomaLabel = idioma === "sub" ? "sub english" : "english";
    await m.reply(`📥 Downloading *${session.title}* - cap ${epi} (${idiomaLabel})`);
    m.react("📥");

    session.downloading = true;

    try {
        const videoBuffer = await (await fetch(inf.dl[idioma])).buffer();
        await conn.sendFile(
            m.chat,
            videoBuffer,
            `${session.title} - cap ${epi} ${idiomaLabel}.mp4`,
            "",
            m,
            false,
            { mimetype: "video/mp4", asDocument: true }
        );
        m.react("✅");
    } catch (err) {
        console.error("Download error:", err);
        m.reply("⚠️ Error downloading episode: " + err.message);
    }

    clearTimeout(session.timeout);
    delete conn.anime[m.sender];
};

handler.command = ["anime", "animedl", "animes"];
handler.tags = ["download"];
handler.help = ["animedl"];
handler.premium = true;

export default handler;
