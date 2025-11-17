const baseCoinReward = 10000;

var handler = async (m, { conn }) => {

    let user = global.db.data.users[m.sender] || {};
    user.halloween = user.halloween || 0;

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const isOctober = currentDate.getMonth() === 9;

    const cooldown = 365 * 24 * 60 * 60 * 1000; // 1 año en milisegundos
    let timeRemaining = user.halloween + cooldown - currentDate.getTime();

    if (!isOctober) {
        return m.reply(`🎃 You can only claim your Halloween gift in October! Come back in October! ${currentYear}.`);
    }

    if (timeRemaining > 0) {
        return m.reply(`${emoji3} You already claimed your Halloween gift this year! Come back in:\n *${msToTime(timeRemaining)}*`);
    }

    let coinReward = pickRandom([5, 10, 15, 20]);
    let candyReward = pickRandom([5, 10, 15, 20]);
    let expReward = pickRandom([2000, 3000, 4000, 5000]);
    let giftReward = pickRandom([2, 3, 4, 5]);

    user.coin = (user.coin || 0) + coinReward;
    user.candies = (user.candies || 0) + candyReward;
    user.exp = (user.exp || 0) + expReward;
    user.gifts = (user.gifts || 0) + giftReward;

    m.reply(`
\`\`\`🎃 Happy Halloween! Enjoy your Halloween gift!! 👻\`\`\`

💸 *${m.moneda}* : +${coinReward}
🍬 *Candy* : +${candyReward}
✨ *Experience* : +${expReward}
🎃 *Halloween gifts* : +${giftReward}`);

    user.halloween = new Date().getTime();
}

handler.help = ['halloween'];
handler.tags = ['rpg'];
handler.command = ['halloween'];
handler.group = true;
handler.register = true;

export default handler;

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
}

function msToTime(duration) {
    var days = Math.floor(duration / (1000 * 60 * 60 * 24));
    var hours = Math.floor((duration % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));

    return `${days} days ${hours} hours ${minutes} minutes`;
}