let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return conn.reply(m.chat, `${emoji} Please enter the error you wish to report..`, m)
    if (text.length < 10) return conn.reply(m.chat, `${emoji} Please specify the error clearly, at least 10 characters.`, m)
    if (text.length > 1000) return conn.reply(m.chat, `${emoji2} *Maximum 1000 characters to send the error.`, m)
    const teks = `*✖️ \`R E P O R T\` ✖️*

☁️ Number:
• Wa.me/${m.sender.split`@`[0]}

👤 User: 
• ${m.pushName || 'Anonymous'}

💬 Message:
• ${text}`
    await conn.reply(`${suittag}@s.whatsapp.net`, m.quoted ? teks + m.quoted.text : teks, m, { mentions: conn.parseMention(teks) })

    m.reply(`${emoji} The report was sent to my creator; any false report may result in a ban..`)
}
handler.help = ['reportar']
handler.tags = ['info']
handler.command = ['reporte', 'report', 'reportar', 'bug', 'error']

export default handler