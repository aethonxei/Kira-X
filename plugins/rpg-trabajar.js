let cooldowns = {};

const handler = async (m, { conn }) => {
    let user = global.db.data.users[m.sender];
    if (!user.coin) user.coin = 0;
    if (!user.bank) user.bank = 0;

    const premiumBenefit = user.premium ? 1.25 : 1.0;
    const cooldown = 3 * 60 * 1000;

    if (cooldowns[m.sender] && Date.now() - cooldowns[m.sender] < cooldown) {
        const remaining = segundosAHMS(Math.ceil((cooldowns[m.sender] + cooldown - Date.now()) / 1000));
        return conn.reply(m.chat, `⏱️ Take a break, work can wait. Come back in *${remaining}*.`, m);
    }

    const winChance = 0.85;
    const didWin = Math.random() < winChance;

    if (didWin) {
        const amount = Math.floor((Math.random() * 4000 + 1000) * premiumBenefit);
        user.coin += amount;
        const work = pickRandom(trabajosBuenos);
        await m.react('✅');
        await conn.reply(m.chat, `${work} and you took *¥${amount.toLocaleString()} ${m.moneda}*.\n\n*💰 Wallet:* ¥${user.coin.toLocaleString()} | *🏦 Bank:* ¥${user.bank.toLocaleString()}`, m);
    } else {
        const amount = Math.floor(Math.random() * 3000 + 500);
        let total = user.coin + user.bank;
        let loss = Math.min(total, amount);

        if (user.coin >= loss) {
            user.coin -= loss;
        } else {
            let resto = loss - user.coin;
            user.coin = 0;
            user.bank = Math.max(0, user.bank - resto);
        }

        const work = pickRandom(trabajosMalos);
        await m.react('❌');
        await conn.reply(m.chat, `${work} and in the process you lost *¥${loss.toLocaleString()} ${m.moneda}*.\n\n*💰 Wallet:* *¥${user.coin.toLocaleString()}* | *🏦 Bank:* *¥${user.bank.toLocaleString()}*`, m);
    }

    cooldowns[m.sender] = Date.now();
};

handler.help = ['chamba', 'work', 'work'];
handler.tags = ['economy'];
handler.command = ['chamba', 'work', 'w', 'work', 'chambear'];
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

const trabajosBuenos = [
    "📓 You analyzed a complex case and solved it with perfect logic",
    "🖋️ You wrote a flawless report that impressed even the higher-ups",
    "🕵️‍♂️ You gathered crucial information without leaving a trace",
    "📚 You mentored someone, sharpening their mind significantly",
    "💼 You organized a chaotic system and restored absolute order",
    "🧠 You cracked a difficult puzzle that others failed to understand",
    "💻 You improved a security system, making it nearly unbreakable",
    "🎯 You completed a task with precision worthy of Kira himself",
    "🪙 You negotiated a deal and gained more profit than expected",
    "🗂️ You helped clean and structure important documents efficiently",
    "🕶️ You assisted someone discreetly, without drawing attention",
    "🎬 You edited a strategic video that gained massive attention",
    "📊 You optimized someone’s workflow, doubling their efficiency",
    "📦 You helped move items while keeping everything perfectly organized",
    "💡 You taught someone a new skill that changed their day completely",
    "📱 You created a digital tool that became unexpectedly popular",
    "📈 You made a smart decision that increased your overall gains",
    "🧽 You cleaned and restored an important item flawlessly",
    "🧳 You took care of someone’s responsibilities while they were away",
    "🔥 You completed a difficult task with cold, absolute focus"
];

const trabajosMalos = [
    "📉 Your plan failed due to one small miscalculation—unacceptable",
    "💸 You invested in something that collapsed instantly, a foolish risk",
    "📱 Your device broke at the worst possible moment, costing you money",
    "💥 A small error created a bigger problem, and you paid for it",
    "🕳️ You trusted the wrong person and lost more than you gained",
    "🚗 You were fined for a careless mistake while rushing a job",
    "⚠️ You acted without analyzing the situation and it backfired",
    "🍽️ You broke something valuable while working, and had to cover the cost",
    "🤦‍♂️ You fell into a scam you should’ve seen coming",
    "🔥 You damaged important material and had to replace everything",
    "📦 Poor planning caused delays, costing you part of your earnings",
    "🌧️ Bad weather ruined your work and forced you to redo it",
    "🔧 You bought low-quality equipment and it broke immediately",
    "😷 You got sick and ended up spending more than you earned",
    "🕳️ An oversight caused you to lose time and money"
];