const handler = async (m, { conn, text, usedPrefix, command }) => {
    let user = global.db.data.users[m.sender];
    text = text.toLowerCase().trim();

    const plans = {
        'day': { duration: 1, cost: 50000 },
        'week': { duration: 7, cost: 250000 }, // Savings of 28%
        'month': { duration: 30, cost: 750000 }, // 50% Savings
    };

    if (!text || !plans[text]) {
        let response = `🎟️ *Premium Plans Available* 🎟️\n\n`;
        for (const plan in plans) {
            response += `› *${plan.charAt(0).toUpperCase() + plan.slice(1)}* (${plans[plan].duration} day(s))\n`;
            response += `  Cost: *¥${plans[plan].cost.toLocaleString()} ${m.moneda}*\n\n`;
        }
        response += `*Example of use:*\n${usedPrefix + command} week`;
        return conn.reply(m.chat, response, m);
    }

    const selectedPlan = plans[text];

    if (user.coin < selectedPlan.cost) {
        return conn.reply(m.chat, `❌ You don't have enough. ${m.moneda} For this plan, you need *¥${selectedPlan.cost.toLocaleString()}* and you only have *¥${user.coin.toLocaleString()}*.`, m);
    }

    user.coin -= selectedPlan.cost;
    user.premium = true;

    const newPremiumTime = (user.premiumTime > 0 ? user.premiumTime : Date.now()) + (selectedPlan.duration * 24 * 60 * 60 * 1000);
    user.premiumTime = newPremiumTime;

    const remainingTime = newPremiumTime - Date.now();
    const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    conn.reply(m.chat, `✅ Congratulations! You have purchased the *Premium plan ${text}*.\n\nYou will enjoy exclusive benefits.\n*Total time remaining:* ${days} days and ${hours} hours.`, m);
};

handler.help = ['comprarpremium [plan]'];
handler.tags = ['premium'];
handler.command = ['comprarpremium', 'premium', 'vip'];
handler.register = true;

export default handler;