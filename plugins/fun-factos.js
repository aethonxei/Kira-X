const { generateWAMessageFromContent, proto } = (await import('@whiskeysockets/baileys')).default

var handler = async (m, { conn, text}) => {

conn.reply(m.chat, `${emoji2} Looking for a fact, wait a moment...`, m)

conn.reply(m.chat, `*┏━_͜͡-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡⚘-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡⚘-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡⚘-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡_͜͡━┓*\n\n❥ *"${pickRandom(global.factos)}"*\n\n*┗━_͜͡-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡⚘-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡⚘-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡⚘-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡_͜͡━┛*`, m)

}
handler.help = ['fact']
handler.tags = ['fun']
handler.command = ['fact']
handler.fail = null
handler.exp = 0
handler.group = true;
handler.register = true

export default handler

let hasil = Math.floor(Math.random() * 5000)
function pickRandom(list) {
return list[Math.floor(list.length * Math.random())]
}

global.factos = [
    "You're the reason shampoos have instructions.",
"If you were a book, you’d be the one nobody wants to read.",
"Your life is like a TV show that nobody watches.",
"You're like a typo: just there to ruin everything.",
"If you were a product, you’d be the one on sale because it doesn’t sell.",
"You're a reminder of what not to do in life.",
"Your existence is as relevant as a file in the recycle bin.",
"If you were a dish, you’d be one nobody wants to try.",
"You're the reason men are afraid of commitment.",
"Your personality is like antivirus software: nobody wants to install it.",
"You're proof that natural selection can fail.",
"If you were a color, you’d be gray: boring and lifeless.",
"Your life is like a bad movie: nobody wants to see the ending.",
"You're like a bad joke: you always make people uncomfortable.",
"If you were an animal, you’d be the pet nobody wants to adopt.",
"Your sense of humor is like bad Wi-Fi: it has no connection.",
"You're like a wilted plant: just taking up space.",
"If you were a computer virus, you’d be one that causes more problems than it solves.",
"Your image is the reason mirrors are covered.",
"You're the perfect example of how not to live life.",
"If you were a day of the week, you’d be Monday: everyone hates you.",
"You're the reason people don’t believe in true love.",
"Your life is a meme, but nobody laughs.",
"If you were an app, you’d be one nobody wants to download.",
"You're like a shadow: always there, but unwelcome.",
"Your brain is like a full hard drive: it can’t store any more.",
"You're like a derailed train: only causing chaos.",
"If you were weather, you’d be a storm: dark and destructive.",
"You're like a chain message: nobody wants you, but everyone gets you.",
"Your life is like a puzzle with pieces that never fit.",
"If you were a movie, you’d be a sequel nobody asked for."
];