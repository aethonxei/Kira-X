import { createHash } from 'crypto';
import fetch from 'node-fetch';

const handler = async (m, { conn, command, usedPrefix, text }) => {
    const emoji = '✨', emoji2 = '❌';
    let user = global.db.data.users[m.sender];

    // Validation of unregistered user
    if (!user) {
        return conn.reply(m.chat, 
            `${emoji2} You are not registered, there is nothing to delete.`,
            m
        );
    }

    // Confirmation before deleting
    const confirmar = text?.toLowerCase();
    if (confirmar !== 'yed') {
        return conn.reply(m.chat, 
            `${emoji2} Are you sure you want to reset your registration? Type *${usedPrefix + command} yes* to confirm.`,
            m
        );
    }

    // Delete the record
    delete global.db.data.users[m.sender];

    // Successful response
    return conn.reply(m.chat, 
        `${emoji} Your record has been successfully deleted!`,
        m
    );
};

// Command configuration
handler.help = ['unreg'];
handler.tags = ['rg'];
handler.command = ['unreg', 'deregistrar'];

export default handler;