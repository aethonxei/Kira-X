import { createHash } from 'crypto';  
import fetch from 'node-fetch';

const handler = async (m, { conn, command, usedPrefix, text }) => {

let user = global.db.data.users[m.sender];

if (user.birth) {
return conn.reply(m.chat, `${emoji2} You already have a date set; if you want to delete the current date, use:\n> » ${usedPrefix}delbirth`, m);
}

if (!text) return conn.reply(m.chat, `${emoji} You must enter a valid date for your birthday.\n\n> ✐ Example » *${usedPrefix + command} 01/01/2000* (day/month/year)`, m);

function validarFechaNacimiento(text) {
const opcionesFecha = [
/^\d{1,2}\/\d{1,2}\/\d{4}$/ // dd/mm/yyyy or m/d/yyyy
];

let esValida = opcionesFecha.some(regex => regex.test(text));
if (!esValida) return null;

if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(text)) {
const [dia, mes, año] = text.split('/');
const meses = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
return `${parseInt(dia)} of ${meses[parseInt(mes) - 1]} of ${año}`;
}
return text;
}

let birth = validarFechaNacimiento(text);
if (!birth) {
return conn.reply(m.chat, `${emoji2} Remember to choose a valid date of birth.\n> Example: ${usedPrefix + command} 01/12/2024`, m);
}

user.birth = birth;
return conn.reply(m.chat, `${emoji} Your date of birth has been set as: *${user.birth}*!`, m);
};

handler.help = ['setbirth']
handler.tags = ['rg']
handler.command = ['setbirth', 'setcumpleaños']
export default handler;