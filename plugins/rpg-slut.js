let cooldowns = {};

const handler = async (m, { conn }) => {
    const users = global.db.data.users;
    const senderId = m.sender;

    if (typeof users[senderId].coin !== "number") users[senderId].coin = 0;
    if (typeof users[senderId].bank !== "number") users[senderId].bank = 0;

    const premiumBenefit = users[senderId].premium ? 1.30 : 1.0;
    const cooldown = 5 * 60 * 1000;

    if (cooldowns[senderId] && Date.now() - cooldowns[senderId] < cooldown) {
        const remaining = segundosAHMS(Math.ceil((cooldowns[senderId] + cooldown - Date.now()) / 1000));
        return m.reply(`🥵 You need to catch your breath. Come back in *${remaining}*.`);
    }

    const winChance = 0.70;
    const didWin = Math.random() < winChance;

    let userIds = Object.keys(users).filter(u => u !== senderId && !users[u].banned);
    let targetId = userIds.length > 0 ? userIds[Math.floor(Math.random() * userIds.length)] : senderId;

    if (didWin) {
        const amount = Math.floor((Math.random() * 10000 + 4000) * premiumBenefit);
        users[senderId].coin += amount;
        await m.react('🥵');
        const phrase = pickRandom(frasesGanancia).replace('@user', `@${targetId.split('@')[0]}`);
        await conn.sendMessage(m.chat, {
            text: `${phrase} and you won *¥${amount.toLocaleString()} ${m.moneda}*.`,
            contextInfo: { mentionedJid: [targetId] }
        }, { quoted: m });

    } else {
        const amount = Math.floor(Math.random() * 18000 + 8000);
        let total = users[senderId].coin + users[senderId].bank;
        let loss = Math.min(total, amount);

        if (users[senderId].coin >= loss) {
            users[senderId].coin -= loss;
        } else {
            let resto = loss - users[senderId].coin;
            users[senderId].coin = 0;
            users[senderId].bank = Math.max(0, users[senderId].bank - resto);
        }
        await m.react('💔');
        const phrase = pickRandom(frasesPerdida);
        await conn.reply(m.chat, `${phrase} and you lost *¥${loss.toLocaleString()} ${m.moneda}*.`, m);
    }

    cooldowns[senderId] = Date.now();
};

handler.help = ['slut'];
handler.tags = ['economy'];
handler.command = ['slut', 'prostituirse'];
handler.group = true;
handler.register = true;

export default handler;

function segundosAHMS(segundos) {
    let minutos = Math.floor(segundos / 60);
    let segundosRestantes = segundos % 60;
    return `${minutos}m ${segundosRestantes}s`;
}

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
}

const frasesGanancia = [
    "⚡ You eliminated @user flawlessly, leaving no trace behind",
    "🖤 You orchestrated @user's downfall with perfect precision",
    "🔪 Your plan with @user succeeded without a single error",
    "💀 @user couldn’t escape your scheme; fate was sealed",
    "🕶️ You manipulated @user into doing exactly what you wanted",
    "🔥 Your strategy left @user trembling in fear and awe",
    "🧠 You outsmarted @user completely, gaining ultimate control",
    "🎯 Every move you made against @user hit its mark perfectly",
    "🌑 @user’s fate was in your hands, and you played it coldly",
    "☠️ You removed @user from the equation with absolute discretion",
    "🕰️ Your plan with @user unfolded flawlessly, like clockwork",
    "💎 You turned a risky situation with @user into pure advantage",
    "⚔️ You struck @user with precision that even the gods would envy",
    "🕷️ Every manipulation of @user spun perfectly into your favor",
    "🌌 Your influence over @user reshaped their destiny completely"
];

const frasesPerdida = [
    "💥 Your plan backfired, and @user escaped your grasp",
    "🩸 A mistake cost you dearly, leaving @user one step ahead",
    "⚠️ Your calculations with @user were flawed, resulting in disaster",
    "🕳️ @user slipped through your fingers, ruining your scheme",
    "💔 Your plan unraveled, and @user exposed your weakness",
    "🔥 Your manipulation failed, and @user turned the tables",
    "📉 You underestimated @user and lost everything you gained",
    "🖤 Fate betrayed you; @user survived when they shouldn’t have",
    "⚡ A single oversight allowed @user to foil your perfect plan",
    "🕶️ Your strategy with @user collapsed, leaving chaos behind",
    "☠️ Your precision failed, and @user’s fate slipped away",
    "🕰️ Time worked against you, and @user escaped unscathed",
    "💀 Your meticulous plan was ruined by one small misstep",
    "🧠 Overconfidence led you to misjudge @user’s cunning",
    "🌑 Darkness didn’t protect you this time — @user survived"
];