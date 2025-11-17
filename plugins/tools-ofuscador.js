import JavaScriptObfuscator from 'javascript-obfuscator'

let handler = async (m, { conn, usedPrefix, command }) => {
  if (!m.quoted || !m.quoted.text) 
    return m.reply(`🍎 Reply to a message containing the JavaScript code you want to obfuscate..\n\nExample:\n${usedPrefix + command} (responds to a coded message)`)

  let code = m.quoted.text.trim()
  if (!code) return m.reply('🍎 The code to be obfuscated cannot be empty..')

  // Strong obfuscation
  let obfuscated = JavaScriptObfuscator.obfuscate(code, {
    compact: true,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 1,
    numbersToExpressions: true,
    simplify: true,
    stringArray: true,
    stringArrayEncoding: ['base64'],
    stringArrayThreshold: 1,
    splitStrings: true,
    splitStringsChunkLength: 5,
    renameGlobals: true,
    deadCodeInjection: true,
    deadCodeInjectionThreshold: 1,
    unicodeEscapeSequence: true
  }).getObfuscatedCode()

  // If the code is very long, you can adapt it to send as a file.
  if (obfuscated.length > 4000) {
    return conn.sendMessage(m.chat, { document: Buffer.from(obfuscated), mimetype: 'text/javascript', fileName: 'codigo-ofuscado.js' }, { quoted: m })
  }

  m.reply('✅ Code have been obfuscated:\n\n' + obfuscated)
}

handler.help = ['obfsct']
handler.tags = ['tools']
handler.command = ['obfsct', 'obfuscate']
handler.group = true

export default handler