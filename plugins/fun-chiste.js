const { generateWAMessageFromContent, proto } = (await import('@whiskeysockets/baileys')).default

var handler = async (m, { conn, text}) => {

conn.reply(m.chat, `${emoji2} Looking for a joke? Wait a moment....`, m)

conn.reply(m.chat, `*┏━_͜͡-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡⚘-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡⚘-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡⚘-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡_͜͡━┓*\n\n❥ *"${pickRandom(global.chiste)}"*\n\n*┗━_͜͡-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡⚘-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡⚘-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡⚘-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡_͜͡━┛*`, m)

}
handler.help = ['joke']
handler.tags = ['fun']
handler.command = ['joke']
handler.fail = null
handler.exp = 0
handler.group = true;
handler.register = true

export default handler

let hasil = Math.floor(Math.random() * 5000)
function pickRandom(list) {
return list[Math.floor(list.length * Math.random())]
}

global.chiste = ["Why don’t scientists trust atoms? Because they make up everything..", "Why did the scarecrow win an award? Because he was outstanding in his field.", "Why did the bicycle fall over? Because it was two-tired..", "Why don’t skeletons fight each other? They don’t have the guts.", "What do you call cheese that isn’t yours? Nacho cheese..", "Why did the math book look sad? Because it had too many problems.", "Why can’t your nose be 12 inches long? Because then it would be a foot..", "Why did the golfer bring two pairs of pants? In case he got a hole in one.", "Why did the tomato turn red? Because it saw the salad dressing..", "How do you organize a space party? You planet.", "Why did the coffee file a police report? It got mugged..", "What do you call fake spaghetti? An impasta.", "Why did the chicken join a band? Because it had the drumsticks..", "Why did the computer go to the doctor? It caught a virus.", "Why don’t oysters share their pearls? Because they’re shellfish..", "Why did the cookie go to the hospital? Because he felt crummy.", "Why do bees have sticky hair? Because they use honeycombs..", "Why don’t elephants use computers? Because they’re afraid of the mouse.", "Why was the math lecture so long? The professor kept going off on a tangent..", "Why did the skeleton go to the party alone? He had no body to go with."]