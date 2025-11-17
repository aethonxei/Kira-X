const protectedOwners = [
  '212605158422'
];

const newsletterJid  = '120363420610572685@newsletter';
const newsletterName = '⏤͟͞ू⃪፝͜⁞⟡『 Support-Channel 』࿐⟡';

const handler = async (m, { conn, text, args, usedPrefix, command }) => {
  try {
    console.log('Handler fired:', command, text, args);

    // Changed: synchronous getName
    let name;
    try {
      name = conn.getName(m.sender);
    } catch (e) {
      name = m.sender;
    }

    const contextInfo = {
      mentionedJid: [m.sender],
      isForwarded: true,
      forwardingScore: 999,
      forwardedNewsletterMessageInfo: {
        newsletterJid,
        newsletterName,
        serverMessageId: -1
      }
    };

    const emojiAdd = '✨';
    const emojiDel = '❌';
    const noTarget = `${emojiAdd} Please mention or reply to the user you want ${command === 'addowner' ? 'añadir' : 'quitar'} as an owner.`;

    // Determine JID of target
    let who = m.mentionedJid?.[0]
      || m.quoted?.sender
      || (text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : null);

    console.log('Target who:', who);

    if (!who) return conn.reply(m.chat, noTarget, m, { mentions: [m.sender], contextInfo });

    // REMOVE SUFFIX (only the number))
    const onlyNumber = who.replace(/[@:].*$/, '');

    console.log('Just number:', onlyNumber);
    console.log('global.owner current:', JSON.stringify(global.owner));

    if (command === 'addowner') {
      if (global.owner.find(o => o[0] === onlyNumber)) {
        return conn.reply(m.chat, `🍎 ${onlyNumber} is already an owner, ${name}~`, m, { contextInfo });
      }

      // Changed: synchronous getName
      let contactName;
      try {
        contactName = conn.getName(who);
      } catch (e) {
        contactName = onlyNumber;
      }

      const entry = [ onlyNumber, contactName, true ];
      global.owner.splice(protectedOwners.length, 0, entry);
      console.log('global.owner after adding:', JSON.stringify(global.owner));
      await conn.reply(
        m.chat,
        `${emojiAdd} has been added to *${contactName}* as an Owner.\n\n` +
        `📋 The list of owners now looks like this:\n` +
        `\`\`\`${JSON.stringify(global.owner, null, 2)}\`\`\``,
        m,
        { mentions: [who], contextInfo }
      );
    }

    if (command === 'delowner') {
      if (protectedOwners.includes(onlyNumber)) {
        return conn.reply(
          m.chat,
          `🚫 you cannot remove the original and main owner; he is protected..`,
          m,
          { contextInfo }
        );
      }
      const idx = global.owner.findIndex(o => o[0] === onlyNumber);
      if (idx !== -1) {
        const removed = global.owner[idx][1];
        global.owner.splice(idx, 1);
        console.log('global.owner after removing:', JSON.stringify(global.owner));
        await conn.reply(
          m.chat,
          `${emojiDel} has been removed *${removed}* from the list of Owners.`,
          m,
          { mentions: [who], contextInfo }
        );
      } else {
        await conn.reply(
          m.chat,
          `${emojiDel} That number is not on the Owners list.`,
          m,
          { contextInfo }
        );
      }
    }

  } catch (e) {
    console.error('Error in the handler:', e);
    return conn.reply(m.chat, 'An unexpected error occurred: ' + e, m);
  }
};

handler.command = ['addowner', 'delowner'];
handler.rowner = true;
handler.help = ['addowner <@user>', 'delowner <@user>'];
handler.tags = ['owner'];

export default handler;