
import fetch from 'node-fetch';

const handler = async (message, { conn, command, text, isAdmin }) => {
    if (!isAdmin) {
        throw '🪽 *Only an admin can run this command*';
    }

    const groupMetadata = await conn.groupMetadata(message.chat);
    const groupOwner = global.owner[0][0] + '@s.whatsapp.net';
    const sender = message.sender;

    // Determine target user
    const targetUser = message.mentionedJid?.[0] || message.quoted?.sender || text;

    if (!targetUser) {
        return conn.reply(message.chat, '🪽 *Mention the person you want to mute/unmute*', message);
    }

    if (targetUser === groupOwner) {
        return conn.reply(message.chat, '🍎 *You cannot mute the bot creator*', message);
    }

    if (targetUser === sender) {
        return conn.reply(message.chat, '🪽 *You cannot mute yourself*', message);
    }

    // Database check
    const userData = global.db.users[targetUser];

    if (command === 'mute') {
        if (userData?.muted) {
            return conn.reply(message.chat, '🪽 *This user is already muted*', message);
        }

        global.db.users[targetUser] = { ...userData, muted: true };

        const muteNotification = {
            key: {
                participants: '@s.whatsapp.net',
                fromMe: false,
                id: 'Hello',
            },
            message: {
                locationMessage: {
                    name: 'User Muted',
                    jpegThumbnail: await (await fetch('https://telegra.ph/file/f8324d9798fa2ed2317bc.png')).buffer(),
                    vcard: `BEGIN:VCARD
VERSION:3.0
N:;Unlimited;;;
FN:Unlimited
ORG:Unlimited
TITLE:
TEL;waid=212605158422:+212605158422
X-ABLabel:Unlimited
X-WA-BIZ-DESCRIPTION:ofc
X-WA-BIZ-NAME:Unlimited
END:VCARD`
                }
            },
            participant: '@s.whatsapp.net'
        };

        conn.reply(message.chat, '*Your messages will be deleted*', muteNotification, null, { mentions: [targetUser] });
    }

    if (command === 'unmute') {
        if (!userData?.muted) {
            return conn.reply(message.chat, '🪽 *This user was not muted*', message);
        }

        global.db.users[targetUser].muted = false;

        const unmuteNotification = {
            key: {
                participants: '@s.whatsapp.net',
                fromMe: false,
                id: 'Hello',
            },
            message: {
                locationMessage: {
                    name: 'User Unmuted',
                    jpegThumbnail: await (await fetch('https://telegra.ph/file/aea704d0b242b8c41bf15.png')).buffer(),
                    vcard: `BEGIN:VCARD
VERSION:3.0
N:;Unlimited;;;
FN:Unlimited
ORG:Unlimited
TITLE:
TEL;waid=212605158422:+212605158422
X-ABLabel:Unlimited
X-WA-BIZ-DESCRIPTION:ofc
X-WA-BIZ-NAME:Unlimited
END:VCARD`
                }
            },
            participant: '@s.whatsapp.net'
        };

        conn.reply(message.chat, '*Your messages will no longer be deleted*', unmuteNotification, null, { mentions: [targetUser] });
    }
};

handler.command = ['mute', 'unmute'];
handler.admin = true;
handler.botAdmin = true;
handler.groupOnly = true;

export default handler;