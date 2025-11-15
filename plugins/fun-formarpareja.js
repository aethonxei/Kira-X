const toM = (a) => '@' + a.split('@')[0];
function handler(m, {groupMetadata}) {
  const ps = groupMetadata.participants.map((v) => v.id);
  const a = ps.getRandom();
  let b;
  do b = ps.getRandom();
  while (b === a);
  m.reply(`*${toM(a)}, You should marry 💍 ${toM(b)}, you'll make a cute couple 💓*`, null, {
    mentions: [a, b],
  });
}
handler.help = ['fcouple'];
handler.tags = ['fun'];
handler.command = ['fcouple', 'fcouples'];
handler.group = true;
handler.register = true;

export default handler;