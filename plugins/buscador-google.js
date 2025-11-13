import fetch from 'node-fetch';

let handler = async (m, { text }) => {
  if (!text) {
    m.reply(`${emoji} Please provide the search term you wish to perform to *Google*.`);
    return;
  }

  const apiUrl = `https://delirius-apiofc.vercel.app/search/googlesearch?query=${encodeURIComponent(text)}`;

  try {
    const response = await fetch(apiUrl);
    const result = await response.json();

    if (!result.status) {
      m.reply('Error performing the search.');
      return;
    }

    let replyMessage = `${emoji2} Search results:\n\n`;
    result.data.slice(0, 1).forEach((item, index) => {
      replyMessage += `☁️ *${index + 1}. ${item.title}*\n`;
      replyMessage += `📰 *${item.description}*\n`;
      replyMessage += `🔗 URL: ${item.url}`;
    });

m.react('✅')

    m.reply(replyMessage);
  } catch (error) {
    console.error(`${msm} Error making API request:`, error);
    m.reply(`${msm} An error occurred while obtaining the results.`);
  }
};

handler.command = ['google'];

export default handler;