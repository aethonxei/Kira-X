let handler = async (m, { conn, text }) => {
if (!text) return m.reply(`${emoji} Enter a name for the group.`)
try{
m.reply(`${emoji2} Creating a group...`)
let group = await conn.groupCreate(text, [m.sender])
let link = await conn.groupInviteCode(group.gid)
m.reply('https://chat.whatsapp.com/' + url)
} catch (e) {
m.reply(`${msm} An error occurred.`)
}
}
handler.help = ['groupcreate <name>']
handler.tags = ['mods']
handler.command = ['creategc', 'newgc', 'creategroup', 'groupcreate']
handler.rowner = true
handler.register = true

export default handler