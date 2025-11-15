var handler = async (m, { conn, command, text }) => {

if (!text) return conn.reply(m.chat, `${emoji} Please enter someone's name.`, m)

let personalidad = `\`Name\` : ${text}
\`Good Morality\` : ${pickRandom(['6%','12%','20%','27%','35%','41%','49%','54%','60%','66%','73%','78%','84%','92%','93%','94%','96%','98,3%','99,7%','99,9%','1%','2,9%','0%','0,4%'])}
\`Bad Moral\` : ${pickRandom(['6%','12%','20%','27%','35%','41%','49%','54%','60%','66%','73%','78%','84%','92%','93%','94%','96%','98,3%','99,7%','99,9%','1%','2,9%','0%','0,4%'])}
\`Type of person\` : ${pickRandom(['Kind-hearted', 'Arrogant', 'Stingy', 'Generous', 'Humble', 'Shy', 'Cowardly', 'Meddlesome', 'Crystal', 'Non-binary XD', 'Asshole'])}
\`Always\` : ${pickRandom(['Annoying', 'In a bad mood', 'Distracted', 'Annoying', 'Gossipy', 'Always jerking off', 'Shopping', 'Watching anime', 'Chatting on WhatsApp because he is single', 'Lying around doing nothing', 'Womanizer', 'On his phone'])}
\`Intelligence\` : ${pickRandom(['9%','12%','20%','27%','35%','41%','49%','54%','60%','66%','73%','78%','84%','92%','93%','94%','96%','98,3%','99,7%','99,9%','1%','2,9%','0%','0,4%'])}
\`Bitch\` : ${pickRandom(['9%','12%','20%','27%','35%','41%','49%','54%','60%','66%','73%','78%','84%','92%','93%','94%','96%','98,3%','99,7%','99,9%','1%','2,9%','0%','0,4%'])}
\`Delinquency\` : ${pickRandom(['6%','12%','20%','27%','35%','41%','49%','54%','60%','66%','73%','78%','84%','92%','93%','94%','96%','98,3%','99,7%','99,9%','1%','2,9%','0%','0,4%'])}
\`Courage\` : ${pickRandom(['6%','12%','20%','27%','35%','41%','49%','54%','60%','66%','73%','78%','84%','92%','93%','94%','96%','98,3%','99,7%','99,9%','1%','2,9%','0%','0,4%'])}
\`Fear\` : ${pickRandom(['6%','12%','20%','27%','35%','41%','49%','54%','60%','66%','73%','78%','84%','92%','93%','94%','96%','98,3%','99,7%','99,9%','1%','2,9%','0%','0,4%'])}
\`Struggle\` : ${pickRandom(['6%','12%','20%','27%','35%','41%','49%','54%','60%','66%','73%','78%','84%','92%','93%','94%','96%','98,3%','99,7%','99,9%','1%','2,9%','0%','0,4%'])}
\`Gender\` : ${pickRandom(['Man, Woman, Homosexual, Bisexual, Pansexual, Feminist, Heterosexual, Alpha Male, Womanzone, Butch, Stick-sexual, PlayStationSexual, Mr. Manuela, Chickensexual'])}`

conn.reply(m.chat, personalidad, m)

}
handler.help = ['personality']
handler.tags = ['fun']
handler.command = ['personality']
handler.group = true;
handler.register = true

export default handler

function pickRandom(list) {
return list[Math.floor(Math.random() * list.length)]
}