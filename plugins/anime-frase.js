import fs from 'fs';
import path from 'path';
import axios from 'axios';

let handler = async (m, { conn, usedPrefix }) => {
    let frases = [
        {
            personaje: '🦅 【 𝗝𝗜𝗚𝗢𝗥𝗢 𝗞𝗨𝗪𝗔𝗝𝗜𝗠𝗔 】 🦅',
            frase: 'You can cry, thats okay. Just dont give up! Believe in yourself... you will be rewarded without a doubt.',
            imagen: 'https://qu.ax/SGDrw.jpg',
            icono: 'https://qu.ax/uLhOy.jpg',
            canal: 'https://whatsapp.com/channel/0029VbBQ1kG8PgsPtLAabC23'
        },
        {
            personaje: '🌸【 𝐍𝐄𝐙𝐔𝐊𝐎 𝐊𝐀𝐌𝐀𝐃𝐎 】🌸',
            frase: 'Dont carry that weight for no reason; some things are beyond our control. Happiness depends only on ourselves. The only thing that matters is the present..',
            imagen: 'https://qu.ax/iUBoW.jpg',
            icono: 'https://qu.ax/XRsZZ.jpg',
            canal: 'https://whatsapp.com/channel/0029VbBQ1kG8PgsPtLAabC23'
        },
        {
            personaje: '🔥【 𝐊𝐘𝐎𝐉𝐔𝐑𝐎 𝐑𝐄𝐍𝐆𝐎𝐊𝐔 】🔥',
            frase: 'Live with pride and your head held high! And don’t let your fears and weaknesses pull you away from your goals… Keep your heart burning, no matter what happens. Keep moving forward and don’t give up, even if you’ve fallen. Remember that time waits for no one, it won’t keep you company or share your sorrows.',
            imagen: 'https://qu.ax/ldtsS.jpg',
            icono: 'https://qu.ax/HLqhy.jpg',
            canal: 'https://whatsapp.com/channel/0029VbBQ1kG8PgsPtLAabC23'
        },
        {
            personaje: '👑【 𝐋𝐄𝐋𝐎𝐔𝐂𝐇 𝐋𝐀𝐌𝐏𝐄𝐑𝐎𝐔𝐆𝐄 】👑',
            frase: 'When there is evil in this world that justice cannot defeat, would you stain your hands with evil to overcome it? Or would you remain firm and righteous even if that means surrendering to evil?.',
            imagen: 'https://qu.ax/R0v7T.jpg',
            icono: 'https://qu.ax/tv36s.jpg',
            canal: 'https://whatsapp.com/channel/0029VbBQ1kG8PgsPtLAabC23'
        },
        {
            personaje: '⭐【 𝐍𝐀𝐑𝐔𝐓𝐎 𝐔𝐙𝐔𝐌𝐀𝐊𝐈 】⭐',
            frase: 'I never give up, and I will never go back on my word — that is my Ninja Way!',
            imagen: 'https://qu.ax/zEktf.png',
            icono: 'https://qu.ax/eYQPF.jpeg',
            canal: 'https://whatsapp.com/channel/0029VbBQ1kG8PgsPtLAabC23'
        },
        {
            personaje: '👁️‍🗨️【 𝐈𝐓𝐀𝐂𝐇𝐈 𝐔𝐂𝐇𝐈𝐇𝐀 】👁️‍🗨️',
            frase: 'People live their lives following what they accept as right and true. That is how people define “reality.” But what does it mean to be “right” or “true”? They are merely vague concepts. Their “reality” may be nothing but an illusion. Can we consider that they live in their own world, shaped by their beliefs?',
            imagen: 'https://qu.ax/NjfcJ.jpg',
            icono: 'https://qu.ax/hKVCD.jpg',
            canal: 'https://whatsapp.com/channel/0029VbBQ1kG8PgsPtLAabC23'
        },
        {
            personaje: '⚡【 𝐊𝐈𝐋𝐋𝐔𝐀 𝐙𝐎𝐋𝐃𝐘𝐂𝐊 】⚡',
            frase: 'If I ignore a friend whom I have the ability to help, wouldn’t I be betraying them??.',
            imagen: 'https://qu.ax/5y0lM.jpg',
            icono: 'https://qu.ax/m7e2Y.jpg',
            canal: 'https://whatsapp.com/channel/0029VbBQ1kG8PgsPtLAabC23'
        },
        {
            personaje: '💔【 𝐌𝐀𝐊𝐈𝐌𝐀 】💔',
            frase: 'Lustful acts are more pleasurable the better you know the other person.',
            imagen: 'https://qu.ax/JETiZ.jpg',
            icono: 'https://qu.ax/GLoHn.jpg',
            canal: 'https://whatsapp.com/channel/0029VbBQ1kG8PgsPtLAabC23'
        },
        {
            personaje: '🍜【 𝐒𝐀𝐈𝐓𝐀𝐌𝐀 】🍜',
            frase: 'If you truly want to be strong, stop worrying about what others think of you. Living your life has nothing to do with what others think.',
            imagen: 'https://qu.ax/dqRiC.png',
            icono: 'https://qu.ax/tgqkZ.jpg',
            canal: 'https://whatsapp.com/channel/0029VbBQ1kG8PgsPtLAabC23'
        },
        {
            personaje: '🌱【 𝐌𝐈𝐆𝐇𝐓 𝐆𝐔𝐘 】🌱',
            frase: 'All effort is useless if you don’t believe in yourself.',
            imagen: 'https://qu.ax/eUzLi.jpg',
            icono: 'https://qu.ax/uxSvb.png',
            canal: 'https://whatsapp.com/channel/0029VbBQ1kG8PgsPtLAabC23'
        },
        {
            personaje: '♦️【 𝐓𝐀𝐍𝐉𝐈𝐑𝐎 𝐊𝐀𝐌𝐀𝐃𝐎 】♦️',
            frase: 'Life goes on; you must keep going even if you’ve lost someone, no matter how hard the blow.',
            imagen: 'https://qu.ax/zupOV.jpg',
            icono: 'https://qu.ax/JbEnl.jpg',
            canal: 'https://whatsapp.com/channel/0029VbBQ1kG8PgsPtLAabC23'
        },
        {
            personaje: '👱🏻【 𝐌𝐄𝐋𝐈𝐎𝐃𝐀𝐒 】🗡',
            frase: 'You can lie as much as you want, but you can never deceive your heart..',
            imagen: 'https://qu.ax/CrNBM.jpg',
            icono: 'https://qu.ax/OaBwM.jpg',
            canal: 'https://whatsapp.com/channel/0029VbBQ1kG8PgsPtLAabC23'
        },
        {
            personaje: '🥷【 𝐊𝐀𝐊𝐀𝐒𝐇𝐈 𝐇𝐀𝐓𝐀𝐊𝐄 】❟❛❟',
            frase: 'In the ninja world, those who break the rules are scum, that’s true, but.. those who abandon a friend.. are worse than scum.',
            imagen: 'https://qu.ax/DKlAD.jpg',
            icono: 'https://qu.ax/Ariqh.jpeg',
            canal: 'https://whatsapp.com/channel/0029VbBQ1kG8PgsPtLAabC23'
        },
        {
            personaje: '🐉【 𝐒𝐎𝐍 𝐆𝐎𝐊𝐔 】🉐',
            frase: 'If a loser makes a lot of effort, maybe they can surpass the powers of a distinguished warrior.',
            imagen: 'https://qu.ax/SnQfR.png',
            icono: 'https://qu.ax/uUcYq.jpeg',
            canal: 'https://whatsapp.com/channel/0029VbBQ1kG8PgsPtLAabC23'
        },
        {
            personaje: '🏴‍☠️【 𝐌𝐨𝐧𝐤𝐞𝐲 𝐃. 𝐋𝐮𝐟𝐟𝐲 】👒',
            frase: 'If you don’t risk your life, you can’t create a future.',
            imagen: 'https://files.catbox.moe/9ccgaf.jpg',
            icono: 'https://files.catbox.moe/2mdcxf.jpg',
            canal: 'https://whatsapp.com/channel/0029VbBQ1kG8PgsPtLAabC23'
        },
        {
            personaje: '🐼【 𝐆𝐞𝐧𝐦𝐚 𝐒𝐚𝐨𝐭𝐨𝐦 】🌹',
            frase: 'It is very easy to hurt others without realizing it, especially when you are young. What matters is not what others think of you, but how you act in response. There are people in this world who prefer solitude, but no one can truly endure it.',
            imagen: 'https://files.catbox.moe/42fduv.jpg',
            icono: 'https://files.catbox.moe/v0nxvk.jpg',
            canal: 'https://whatsapp.com/channel/0029VbBQ1kG8PgsPtLAabC23'
        },
        {
            personaje: '🉐【 𝐒𝐨𝐧 𝐆𝐨𝐤𝐮 】悟',
            frase: 'You are an amazing being, you gave your best and that’s why I admire you. You went through several transformations, you were so powerful that we all hated you. I hope you are reborn as a good guy, I’ll be waiting to fight. I will also train, train a lot to become stronger.',
            imagen: 'https://files.catbox.moe/e6qji2.png',
            icono: 'https://files.catbox.moe/oc9zwf.jpg',
            canal: 'https://whatsapp.com/channel/0029VbBQ1kG8PgsPtLAabC23'
        },
        {
            personaje: '(｡Ó﹏Ò｡)【 𝐈𝐙𝐔𝐊𝐔 𝐌𝐈𝐃𝐎𝐑𝐈𝐘𝐀 】🥦',
            frase: 'Not everything is black and white, most of the world is gray, and it’s full of anger and worry, that’s why you have to lend a hand in that direction.',
            imagen: 'https://files.catbox.moe/vtyjh0.jpg',
            icono: 'https://files.catbox.moe/9rugzk.webp',
            canal: 'https://whatsapp.com/channel/0029VbBQ1kG8PgsPtLAabC23'
        },
        {
            personaje: '🎸【 𝐇𝐢𝐭𝐨𝐫𝐢 𝐆𝐨𝐭𝐨 】🌸',
            frase: 'Introverts always bother others, no matter what we do. If we wait in a corner, we are criticized for not collaborating.',
            imagen: 'https://files.catbox.moe/64f81b.jpg',
            icono: 'https://files.catbox.moe/88xgpo.jpg',
            canal: 'https://whatsapp.com/channel/0029VbBQ1kG8PgsPtLAabC23'
        },
        {
            personaje: '👊【 𝐑𝐨𝐜𝐤 𝐋𝐞𝐞 】🥋',
            frase: 'The power of believing in yourself can be the power to change destiny.',
            imagen: 'https://files.catbox.moe/kl0gim.jpg',
            icono: 'https://files.catbox.moe/r4yx7z.jpg',
            canal: 'https://whatsapp.com/channel/0029VbBQ1kG8PgsPtLAabC23'
        },
        {
            personaje: '🏺【 𝐆𝐚𝐚𝐫𝐚 】🧑‍🦰',
            frase: 'Just because someone is important to you doesn’t necessarily mean that person is good.',
            imagen: 'https://files.catbox.moe/izrj29.jpg',
            icono: 'https://files.catbox.moe/zyrq8w.jpg',
            canal: 'https://whatsapp.com/channel/0029VbBQ1kG8PgsPtLAabC23'
        },
        {
            personaje: 'ཐི❤︎ཋྀ【 𝐏𝐀-𝐬𝐚𝐧 】🦇༉‧₊˚.',
            frase: 'Play your music for fun; if you play just for fame, you will end up suffering.',
            imagen: 'https://files.catbox.moe/uhkl02.jpg',
            icono: 'https://files.catbox.moe/vzykg3.jpg',
            canal: 'https://whatsapp.com/channel/0029VbBQ1kG8PgsPtLAabC23'
        },
        {
            personaje: '🧊【 𝐑𝐲𝐨 𝐘𝐚𝐦𝐚𝐝𝐚 】🩵ིྀ',
            frase: 'Losing your personality is like dying while still alive.',
            imagen: 'https://files.catbox.moe/8ukw2l.jpg',
            icono: 'https://files.catbox.moe/g5bisg.jpg',
            canal: 'https://whatsapp.com/channel/0029VbBQ1kG8PgsPtLAabC23'
        },
        {
            personaje: '🧊【 𝐑𝐲𝐨 𝐘𝐚𝐦𝐚𝐝𝐚 】🩵ིྀ',
            frase: 'The union of different personalities is what creates music.',
            imagen: 'https://files.catbox.moe/8ukw2l.jpg',
            icono: 'https://files.catbox.moe/g5bisg.jpg',
            canal: 'https://whatsapp.com/channel/0029VbBQ1kG8PgsPtLAabC23'
        },
        {
            personaje: '🎭【 𝐋 】🎭',
            frase: 'It’s not that I’m antisocial or lonely; it’s that I know human stupidity and I don’t want to catch it.',
            imagen: 'https://qu.ax/nmpSD.jpeg',
            icono: 'https://qu.ax/XPrwK.jpg',
            canal: 'https://whatsapp.com/channel/0029VbBQ1kG8PgsPtLAabC23'
        }
    ];

    const elegido = frases[Math.floor(Math.random() * frases.length)];
    let str = ` *${elegido.personaje}* dice:\n\n_"${elegido.frase}"_`;

    // Descargar el icono como buffer
    const thumb = await axios.get(elegido.icono, { responseType: 'arraybuffer' }).then(res => res.data);

    m.react('🍎');

    conn.sendMessage(m.chat, {
        image: { url: elegido.imagen },
        caption: str,
        contextInfo: {
            externalAdReply: {
                mediaUrl: null,
                mediaType: 3,
                showAdAttribution: true,
                title: elegido.personaje,
                body: wm,
                previewType: 0,
                thumbnail: thumb,
                sourceUrl: channel,
            },
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363420610572685@newsletter',
                newsletterName: '𖥔🍎ᩚ⋆｡˚ ꒰❄︎ ʸᵃᵍᵃᵐⁱ-ˡⁱᵍʰᵗ | ᴄʜᴀɴɴᴇʟ-ʙᴏᴛ ꒱࣭',
                serverMessageId: '-1'
            }
        }
    }, { quoted: m });
}

handler.help = ['fraseanime'];
handler.tags = ['anime'];
handler.command = ['fraseanime', 'phraseanime'];

export default handler;