let handler = async (m, { conn, text }) => {
   if (!text) return conn.reply(m.chat, `${emoji} Please enter the new bio you want to add for me..`, m)
     try {
                await conn.updateProfileStatus(text).catch(_ => _)
                conn.reply(m.chat, `${emoji} Information Successfully Changed...`, m)
} catch {
       throw 'Well, Error...'
     }
}
handler.help = ['setstatus <teks>']
handler.tags = ['owner']
handler.command = ['setstatus', 'setbio']
handler.rowner = true

export default handler