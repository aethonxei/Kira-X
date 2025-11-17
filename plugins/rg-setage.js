import { createHash } from 'crypto';
import fetch from 'node-fetch';

const handler = async (m, { conn, command, usedPrefix, text }) => {
    const emoji = '📓', emoji2 = '❌';
    let user = global.db.data.users[m.sender];

    // Empty input validation
    if (!text?.trim()) {
        return conn.reply(m.chat, 
            `${emoji} You must enter a valid age.\n> Example » *${usedPrefix + command} 25*`,
            m
        );
    }

    // Age validation
    const edad = parseInt(text);
    if (isNaN(edad) || edad < 0 || edad > 120) {
        return conn.reply(m.chat, 
            `${emoji2} Please enter a valid age between 0 and 120 years.`,
            m
        );
    }

    // Establish the age
    user.age = edad;

    // Successful response
    return conn.reply(m.chat, 
        `${emoji} Your age has been established as: *${edad}* years!`,
        m
    );
};

// Command configuration
handler.help = ['setage'];
handler.tags = ['rg'];
handler.command = ['setage', 'edad'];

export default handler;