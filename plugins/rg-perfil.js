import moment from 'moment-timezone'
import PhoneNumber from 'awesome-phonenumber'
import fetch from 'node-fetch'

let handler = async (m, { conn }) => {
  let userId
  if (m.quoted?.sender) {
    userId = m.quoted.sender
  } else if (m.mentionedJid?.[0]) {
    userId = m.mentionedJid[0]
  } else {
    userId = m.sender
  }

  let user = global.db.data.users[userId]
  if (!user) {
    return m.reply('⚠️ The user does not exist in the database.')
  }

  try {
    let name
    try {
      name = await conn.getName(userId)
    } catch {
      name = "𖤐 Unnamed 𖤐"
    }

    let cumpleanos = user.birth || '𖠿 Not specified'
    let genero = user.genre || '𖠿 not specified'

    let parejaId = user.marry || null
    let parejaTag = '✘ Nobody'
    let mentions = [userId]
    if (parejaId && global.db.data.users[parejaId]) {
      parejaTag = `⚝ @${parejaId.split('@')[0]}`
      mentions.push(parejaId)
    }

    let description = user.description || '˖ ࣪⊹ No description'
    let exp = user.exp || 0
    let nivel = user.level || 0
    let role = user.role || '✧ No rank'
    let coins = user.coin || 0
    let bankCoins = user.bank || 0

    let perfil = await conn.profilePictureUrl(userId, 'image')
      .catch(() => 'https://files.catbox.moe/fr0li2.jpeg)

    let profileText = `
﹙𖤍﹚︩︪ ⌗ ${name} 𝖯𝖱𝖮𝖥𝖨𝖫𝖤
ㅤㅤ⎯ ⎯ ⎯ ⎯ ⎯ ⎯ ⎯ ⎯ ⎯ ⎯  
⧉ 𖦹 𝖴𝗌𝖾𝗋 » @${userId.split('@')[0]}
⧉ 𖦹 𝖣𝖾𝗌𝖼𝗋𝗂𝗉𝗍𝗂𝗈𝗇 » ${description}

⧉ 𖦹 𝖠𝗀𝖾 » ${user.age || '𖠿 Unknown'}
⧉ 𖦹 𝖡𝗂𝗋𝗍𝗁𝖽𝖺𝗒 » ${cumpleanos}
⧉ 𖦹 𝖦𝖾𝗇𝖽𝖾𝗋 » ${genero}
⧉ 𖦹 𝖬𝖺𝗋𝗋𝗂𝖾𝖽/𝖳𝗈 » ${parejaTag}
ㅤㅤ⎯ ⎯ ⎯ ⎯ ⎯ ⎯ ⎯ ⎯ ⎯ ⎯  
⧉ 𖦹 𝖫𝖾𝗏𝖾𝗅 » ${nivel}
⧉ 𖦹 𝖤𝗑𝗉 » ${exp.toLocaleString()}
⧉ 𖦹 𝖱𝖺𝗇𝗄 » ${role}

⧉ 𖦹 𝖢𝗈𝗂𝗇𝗌 » ${coins.toLocaleString()} ${m.moneda}
⧉ 𖦹 𝖡𝖺𝗇𝗄 » ${bankCoins.toLocaleString()} ${m.moneda}
⧉ 𖦹 𝖯𝗋𝖾𝗆𝗂𝗎𝗆 » ${user.premium ? '✔ Active' : '✘ Inactive'}
ㅤㅤ⎯ ⎯ ⎯ ⎯ ⎯ ⎯ ⎯ ⎯ ⎯ ⎯  
> ⋆｡°✩ 𝖮𝗐𝗇𝖾𝗋 𝗈𝖿 ᴛʜᴇ ʙᴏᴛ: ${dev} ⋆｡°✩
`.trim()

    await conn.sendMessage(
      m.chat,
      {
        text: profileText,
        contextInfo: {
          mentionedJid: mentions,
          externalAdReply: {
            title: '𝘺𝘰𝘶𝘳 𝘱𝘳𝘰𝘧𝘪𝘭𝘦 (*•̀ᴗ•́*)و ̑̑',
            body: "﹙𖤍﹚ 𝘶𝘴𝘦𝘳 𝘪𝘯𝘧𝘰𝘳𝘮𝘢𝘵𝘪𝘰𝘯.",
            thumbnailUrl: perfil,
            mediaType: 1,
            renderLargerThumbnail: true
          }
        }
      },
      { quoted: m }
    )
  } catch (e) {
    await m.reply(`⚠️ Error loading profile:\n\n${e.message}`)
  }
}

handler.help = ['profile', 'pf']
handler.tags = ['rg']
handler.command = ['profile', 'pf']

export default handler