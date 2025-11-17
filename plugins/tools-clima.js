import axios from "axios";

let handler = async (m, { conn, args }) => {
  if (!args[0]) {
    let resp = `${emoji} Enter the name of your country or city.`;
    let txt = '';
    let count = 0;
    for (const c of resp) {
      await new Promise(resolve => setTimeout(resolve, 5));
      txt += c;
      count++;
      if (count % 10 === 0) {
        conn.sendPresenceUpdate('composing', m.chat);
      }
    }
    await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, { quoted: m, ephemeralExpiration: 24*60*60, disappearingMessagesInChat: 24*60*60 });
    return;
  }

  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${args[0]}&units=metric&appid=060a6bcfa19809c2cd4d97a212b19273`);
    const res = response.data;
    const name = res.name;
    const Country = res.sys.country;
    const Weather = res.weather[0].description;
    const Temperature = res.main.temp + "°C";
    const Minimum_Temperature = res.main.temp_min + "°C";
    const Maximum_Temperature = res.main.temp_max + "°C";
    const Humidity = res.main.humidity + "%";
    const Wind = res.wind.speed + "km/h";
    const wea = `「 📍 」PLACE: ${name}\n「 🗺️ 」COUNTRY: ${Country}\n「 🌤️ 」TIME: ${Weather}\n「 🌡️ 」TEMPERATURE: ${Temperature}\n「 💠 」MINIMUM TEMPERATURE: ${Minimum_Temperature}\n「 📛 」MAXIMUM TEMPERATURE: ${Maximum_Temperature}\n「 💦 」HUMIDITY: ${Humidity}\n「 🌬️ 」WIND: ${Wind}`.trim();

    let txt = '';
    let count = 0;
    for (const c of wea) {
      await new Promise(resolve => setTimeout(resolve, 5));
      txt += c;
      count++;
      if (count % 10 === 0) {
        conn.sendPresenceUpdate('composing', m.chat);
      }
    }
    await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, { quoted: m, ephemeralExpiration: 24*60*60, disappearingMessagesInChat: 24*60*60 });
  } catch (e) {
    let resp = `${msm} Error!\n No results were found. Please try entering an existing country or city..`;
    let txt = '';
    let count = 0;
    for (const c of resp) {
      await new Promise(resolve => setTimeout(resolve, 5));
      txt += c;
      count++;
      if (count % 10 === 0) {
        conn.sendPresenceUpdate('composing', m.chat);
      }
    }
    await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, { quoted: m, ephemeralExpiration: 24*60*60, disappearingMessagesInChat: 24*60*60 });
  }
};

handler.help = ['weather *<city/country>*'];
handler.tags = ['tools'];
handler.command = ['weather', 'climate']
export default handler;