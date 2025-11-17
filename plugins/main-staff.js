let handler = async (m, { conn, command, usedPrefix }) => {
let img = './src/catalogo.jpg'
let staff = `ᥫ᭡ *DEV TEAM* ❀
✰ *Owner* » Aethon Xei
✦ *Bot* » ׄ❀ׅᮢ໋۬۟   ׁ ᮫᩠𝑲𝒊𝒓𝒂-𝑿  ꫶֡ᰵ࡙𝒍🍎̵໋ׄᮬ͜🂱
⚘ *Version* » ${vs}
❖ *Library* » ${libreria} ${baileys}
> ✧ GitHub » https://github.com/aethonxei

✰ *Collaborator 1* » Ryuzaki
✦ *Role* » Assistant and a developer. 
> ✧ Chat » wa.me/+212773075537

✰ *Collaborator 2* » Move
✦ *Role* » Support/assistant, editor.
> ✧ Chat » wa.me/+212667876859
`
await conn.sendFile(m.chat, img, 'yuki.jpg', staff.trim(), m)
}
  
handler.help = ['mods']
handler.command = ['collaborators', 'mods']
handler.register = true
handler.tags = ['main']

export default handler
