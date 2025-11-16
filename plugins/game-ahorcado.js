const palabras = ["cat", "dog", "bird", "elephant", "tiger", "whale", "butterfly", "turtle", "rabbit", "frog", "octopus", "squirrel", "giraffe", "crocodile", "penguin", "dolphin", "snake", "hamster", "mosquito", "bee", "Porn", "black", "television", "computer", "little bot", "reggaeton", "economy", "electronics", "facebook", "WhatsApp", "Instagram", "tiktok", "breaded meat", "president", "bot", "movies", 
]

const intentosMaximos = 6

const gam = new Map()

function elegirPalabraAleatoria() {
return palabras[Math.floor(Math.random() * palabras.length)]
}

function ocultarPalabra(palabra, letrasAdivinadas) {
    let palabraOculta = "";
    for (const letra of palabra) {
        if (letrasAdivinadas.includes(letra)) {
            palabraOculta += letra + " "; 
        } else {
            palabraOculta += "_ "; 
        }
    }
    return palabraOculta.trim(); 
}


function mostrarAhorcado(intentos) {
const dibujo = [
" ____",
" |  |",
intentos < 6 ? " |  O" : " |",
intentos < 5 ? " | /" : intentos < 4 ? " | / " : intentos < 3 ? " | / \\" : intentos < 2 ? " | / \\ " : " |",
intentos < 2 ? "_|_" : " |",
]
return dibujo.slice(0, intentosMaximos - intentos).join("\n")
}

function juegoTerminado(sender, mensaje, palabra, letrasAdivinadas, intentos) {
    if (intentos === 0) {
        gam.delete(sender);
        return `❌ You lost! The correct word was: ${palabra}\n\n${mostrarAhorcado(intentos)}`;
    } else if (!mensaje.includes("_")) {
        let expGanada = Math.floor(Math.random() * 300); //easy
        if (palabra.length >= 8) {
            expGanada = Math.floor(Math.random() * 3500); //difficult
        }
        global.db.data.users[sender].exp += expGanada;
        gam.delete(sender);
        return `You won! 🥳 You guessed the word "${palabra}".\n\n*You have won:* ${expGanada} Exp.`;
    } else {
        return `${mostrarAhorcado(intentos)}\n\n${mensaje}`;
    }
}

let handler = async (m, { conn }) => {
let users = global.db.data.users[m.sender]
if (gam.has(m.sender)) {
return conn.reply(m.chat, "You already have a game in progress. Finish that one first!", m)
}
let palabra = elegirPalabraAleatoria()
let letrasAdivinadas = []
let intentos = intentosMaximos
let mensaje = ocultarPalabra(palabra, letrasAdivinadas)
gam.set(m.sender, { palabra, letrasAdivinadas, intentos })
let text = `Guess the word:\n\n${mensaje}\n\nRemaining attempts: ${intentos}`
conn.reply(m.chat, text, m)
}

handler.before = async (m, { conn }) => {
let users = global.db.data.users[m.sender]
let juego = gam.get(m.sender)
if (!juego) return
let { palabra, letrasAdivinadas, intentos } = juego
if (m.text.length === 1 && m.text.match(/[a-zA-Z]/)) {
let letra = m.text.toLowerCase()
if (!letrasAdivinadas.includes(letra)) {
letrasAdivinadas.push(letra)
if (!palabra.includes(letra)) {
intentos--
}
}
let mensaje = ocultarPalabra(palabra, letrasAdivinadas)
let respuesta = juegoTerminado(m.sender, mensaje, palabra, letrasAdivinadas, intentos)
if (respuesta.includes("You lost!") || respuesta.includes("You won!!")) {
conn.reply(m.chat, respuesta, m)
} else {
gam.set(m.sender, { palabra, letrasAdivinadas, intentos })
conn.reply(m.chat, respuesta + `\n\nRemaining attempts: ${intentos}`, m)
}
} else {
let mensaje = ocultarPalabra(palabra, letrasAdivinadas);
let respuesta = juegoTerminado(m.sender, mensaje, palabra, letrasAdivinadas, intentos)
conn.reply(m.chat, respuesta, m)
gam.delete(m.sender)
}
}
handler.help = ['guess']
handler.tags = ['game']
handler.command = ['guess']
handler.group = true
handler.register = true

export default handler