//Destroy.....
//Customized by aethonxei 
const roles = {
  '*Ordinary Student V*📓': 0,
  '*Ordinary Student IV*📓': 2,
  '*Ordinary Student III*📓': 4,
  '*Ordinary Student II*📓': 6,
  '*Ordinary Student I*📓': 8,

  '*Kira Follower V*💀': 10,
  '*Kira Follower IV*💀': 12,
  '*Kira Follower III*💀': 14,
  '*Kira Follower II*💀': 16,
  '*Kira Follower I*💀': 18,

  '*L’s Apprentice V*🕵️': 20,
  '*L’s Apprentice IV*🕵️': 22,
  '*L’s Apprentice III*🕵️': 24,
  '*L’s Apprentice II*🕵️': 26,
  '*L’s Apprentice I*🕵️': 28,

  '*Bearer of the Death Note V*⚰️': 30,
  '*Bearer of the Death Note IV*⚰️': 32,
  '*Bearer of the Death Note III*⚰️': 34,
  '*Bearer of the Death Note II*⚰️': 36,
  '*Bearer of the Death Note I*⚰️': 38,

  '*Agent of Kira V*🔥': 40,
  '*Agent of Kira IV*🔥': 42,
  '*Agent of Kira III*🔥': 44,
  '*Agent of Kira II*🔥': 46,
  '*Agent of Kira I*🔥': 48,

  '*Shinigami Eyes V*👁️': 50,
  '*Shinigami Eyes IV*👁️': 52,
  '*Shinigami Eyes III*👁️': 54,
  '*Shinigami Eyes II*👁️': 56,
  '*Shinigami Eyes I*👁️': 58,

  '*Shinigami Apprentice V*💀': 60,
  '*Shinigami Apprentice IV*💀': 62,
  '*Shinigami Apprentice III*💀': 64,
  '*Shinigami Apprentice II*💀': 66,
  '*Shinigami Apprentice I*💀': 68,

  '*Kira Supreme V*🌙': 70,
  '*Kira Supreme IV*🌙': 72,
  '*Kira Supreme III*🌙': 74,
  '*Kira Supreme II*🌙': 76,
  '*Kira Supreme I*🌙': 78,

  '*God of Justice V*⚡': 80,
  '*God of Justice IV*⚡': 100,
  '*God of Justice III*⚡': 200,
  '*God of Justice II*⚡': 500,
  '*God of Justice I*⚡': 1000,

  '*👑 Kira, God of the New World 👑*': 5000,
  '*☠️ The Ultimate Death Note Holder ☠️*': 10000
}

let handler = m => m
handler.before = async function (m, { conn }) {
  let user = db.data.users[m.sender]
  let level = user.level
  let role = (Object.entries(roles).sort((a, b) => b[1] - a[1]).find(([, minLevel]) => level >= minLevel) || Object.entries(roles)[0])[0]
  user.role = role
  return !0
}
export default handler