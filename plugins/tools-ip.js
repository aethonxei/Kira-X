import axios from 'axios'

let handler = async (m, { conn, text }) => {
//await m.reply('🧑🏻‍💻 Searching...')
let bot = '🍎 Please wait a moment....'
conn.reply(m.chat, bot, m)
  if (!text) return conn.reply(m.chat, `${emoji} Please enter an *IP* address.`, m)

  axios.get(`http://ip-api.com/json/${text}?fields=status,message,country,countryCode,region,regionName,city,district,zip,lat,lon,timezone,isp,org,as,mobile,hosting,query`).then ((res) => {
    const data = res.data

      if (String(data.status) !== "success") {
        throw new Error(data.message || "Failed")
      }
    let ipsearch = `
☁️ *I N F O - I P* ☁️

IP : ${data.query}
Country : ${data.country}
Country Code : ${data.countryCode}
Province : ${data.regionName}
Province Code : ${data.region}
City : ${data.city}
District : ${data.district}
Zip code : ${res.data.zip}
Time Zone : ${data.timezone}
ISP : ${data.isp}
Organization : ${data.org}
AS : ${data.as}
Mobile : ${data.mobile ? "Yes" : "No"}
Hosting : ${data.hosting ? "Yes" : "No"}
`.trim()

conn.reply(m.chat, ipsearch, m)
})
}

handler.help = ['ip <ip address>']
handler.tags = ['owner']
handler.command = ['ip']

export default handler
