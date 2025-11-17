const handler = async (m, {conn, isROwner, text}) => {
  const delay = (time) => new Promise((res) => setTimeout(res, time));
  const getGroups = await conn.groupFetchAllParticipating();
  const groups = Object.entries(getGroups).slice(0).map((entry) => entry[1]);
  const anu = groups.map((v) => v.id);
  const pesan = m.quoted && m.quoted.text ? m.quoted.text : text;
  if (!pesan) throw `${emoji} You forgot the text.`;
  for (const i of anu) {
    await delay(500);
    conn.relayMessage(i,
        {liveLocationMessage: {
          degreesLatitude: 35.685506276233525,
          degreesLongitude: 139.75270667105852,
          accuracyInMeters: 0,
          degreesClockwiseFromMagneticNorth: 2,
          caption: '⭐️ M E S S A G E ⭐️\n\n' + pesan + `${packname}`,
          sequenceNumber: 2,
          timeOffset: 3,
          contextInfo: m,
        }}, {}).catch((_) => _);
  }
  m.reply(`${emoji} *𝖬𝖾𝗌𝗌𝖺𝗀𝖾 𝖲𝖾𝗇𝗍 𝖳𝗈:* ${anu.length} *Group/s*`);
};
handler.help = ['broadcastgroup', 'bcgc'];
handler.tags = ['owner'];
handler.command = ['bcgc'];
handler.owner = true;

export default handler;