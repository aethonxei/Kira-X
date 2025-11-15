let R = Math.random;
let Fl = Math.floor;
let toM = (a) => "@" + a.split("@")[0];
function handler(m, {groupMetadata}) {
  let ps = groupMetadata.participants.map((v) => v.id);
  let a = ps[Fl(R() * ps.length)];
  let b;
  do b = ps[Fl(R() * ps.length)];
  while (b === a);
  let c;
  do c = ps[Fl(R() * ps.length)];
  while (b === a);
  let d;
  do d = ps[Fl(R() * ps.length)];
  while (b === a);
  let e;
  do e = ps[Fl(R() * ps.length)];
  while (b === a);
  let f;
  do f = ps[Fl(R() * ps.length)];
  while (b === a);
  let g;
  do g = ps[Fl(R() * ps.length)];
  while (b === a);
  let h;
  do h = ps[Fl(R() * ps.length)];
  while (b === a);
  let i;
  do i = ps[Fl(R() * ps.length)];
  while (b === a);
  let j;
  do j = ps[Fl(R() * ps.length)];
  while (b === a);
  m.reply(
    `*😍_The 5 best couples in the group_😍*
    
*_1.- ${toM(a)} & ${toM(b)}_*
- This couple is destined to be together 💙

*_2.- ${toM(c)} & ${toM(d)}_*
- This couple are two little lovebirds in love. ✨

*_3.- ${toM(e)} & ${toM(f)}_*
- Ugh, and what can I say about this couple? They should already have a family. 🤱🧑‍🍼

*_4.- ${toM(g)} & ${toM(h)}_*
- They already got married in secret 💍

*_5.- ${toM(i)} & ${toM(j)}_*
- This couple is on their honeymoon ✨🥵😍❤️*`,
    null,
    {
      mentions: [a, b, c, d, e, f, g, h, i, j],
    }
  );
}
handler.help = ["fcouple5"];
handler.tags = ["fun"];
handler.command = ["fcouple5"];
handler.register = true;
handler.group = true;

export default handler;