import fetch from 'node-fetch'

let handler = async (m, { conn, text }) => {
if (!text) return m.reply(`${emoji} Enter the name of a movie\n> *Example: /cuevana Deadpool*.`)

try {
let api = await fetch(`https://delirius-apiofc.vercel.app/search/cuevana?q=${encodeURIComponent(text)}`)
let json = await api.json()

let JT = '📽️ Cuevana  -  Search 📽️';
json.data.forEach((app, index) => {
      JT += `\n\n═══════════════════════`;
      JT += `\n☁️ *No. :* ${index + 1}`
      JT += `\n🖼️ *Image:* ${app.image}`
      JT += `\n⚜️ *Title:* ${app.title}`
      JT += `\n📚 *Description:* ${app.description}`
      JT += `\n🔗 *Link:* ${app.link}`
}) 

m.reply(JT)
} catch (error) {
console.error(error)
}}

handler.command = ['cuevanasearch', 'cuevana']

export default handler