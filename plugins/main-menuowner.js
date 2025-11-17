import moment from 'moment-timezone';

let handler = async (m, { conn, args }) => {
let owner = `
һ᥆ᥣᥲ! s᥆ᥡ  *${botname}*  ٩(˘◡˘)۶
ᥲ𝗊ᥙí 𝗍іᥱᥒᥱs ᥣᥲ ᥣіs𝗍ᥲ ძᥱ ᥴ᥆mᥲᥒძ᥆s ძᥱ m᥆ძs ᥡ ᥆ᥕᥒᥱrs

»  ⊹˚• \`OWNERS\` •˚⊹

❀ ᥴ᥆mᥲᥒძ᥆s ძᥱ m᥆ძᥱrᥲᥴіóᥒ ᥡ ᥴ᥆ᥒ𝗍r᥆ᥣ ᥲ᥎ᥲᥒzᥲძ᥆ ⍴ᥲrᥲ ᥆ᥕᥒᥱrs.
ᰔᩚ *#addowner • #delowner*
> ✦ Add or remove a number from the owners list.
ᰔᩚ *#codigo*
> ✦ Create a token or code to redeem codes.
ᰔᩚ *#backup • #copia*
> ✦ Create a backup of the Bot's *db*.
ᰔᩚ *#bcgc*
> ✦ Send a message to all groups where the Bot is located..
ᰔᩚ *#cleanfiles*
> ✦ Delete temporary files.
ᰔᩚ *#addcoins • #añadircoin*
> ✦ Add coins to a user.
ᰔᩚ *#userpremium • #addprem*
> ✦ Grant premium status to a user.
ᰔᩚ *#delprem #remove*
> ✦ Remove premium status from a user.
ᰔᩚ *#addexp • #añadirxp*
> ✦ Add XP to a user.
ᰔᩚ *#autoadmin*
> ✦ The bot will automatically grant admin privileges only if the bot is an admin.
ᰔᩚ *#listban • #banlist*
> ✦ List of banned users and chats.
ᰔᩚ *#banuser*
> ✦ Ban a user.
ᰔᩚ *#unbanuser*
> ✦ Unban a user.
ᰔᩚ *#dsowner • #delai*
> ✦ Remove unnecessary session files.
ᰔᩚ *#cleartmp • #vaciartmp*
> ✦ Remove unnecessary files from the tmp folder.
ᰔᩚ *#block • #unblock*
> ✦ Block or unblock a user from the Bot number.
ᰔᩚ *#listblock • #blocklist*
> ✦ View list of blocked users.
ᰔᩚ *#removecoin • #quitarcoin*
> ✦ Remove coins from a user.
ᰔᩚ *#deletedatauser • #resetuser*
> ✦ Reset a user's data.
ᰔᩚ *#removexp • #quitarxp*
> ✦ Remove XP from a user.
ᰔᩚ *#newgc #creargc*
> ✦ Create a new group from the Bot's number.
ᰔᩚ *#deletefile*
> ✦ Delete files from the Bot
ᰔᩚ *#get • #fetch*
> ✦ View the status of a web page.
ᰔᩚ *#plugin • #getplugin*
> ✦ Extract a plugin from the Bot files.
ᰔᩚ *#grouplist • #listgroup*
> ✦ See the list of groups the Bot is a member of.
ᰔᩚ *#join • #invite*
> ✦ Add the Bot to a group using the invitation link.
ᰔᩚ *#leave • #salir*
> ✦ Remove the Bot from a group.
ᰔᩚ *#let*
> ✦ Send a message that lasts for 1 hour.
ᰔᩚ *#prefix*
> ✦ View or change the Bot prefix.
ᰔᩚ *#resetprefix*
> ✦ Reset Bot prefix.
ᰔᩚ *#reiniciar • #restart*
> ✦ Restart the Bot server.
ᰔᩚ *#reunion • #meeting*
> ✦ Send a meeting notice to the owners.
ᰔᩚ *#savejs • #savefile*
> ✦ Save a file to one of the Bot's paths.
ᰔᩚ *#saveplugin*
> ✦ Save a plugin in the Bot's commands folder.
ᰔᩚ *#setbanner*
> ✦ Change the image of the Bot's main menu.
ᰔᩚ *#setavatar*
> ✦ Change the catalog image.
ᰔᩚ *#addcmd • #setcmd*
> ✦ Save a sticker/image as text or command.
ᰔᩚ *#delcmd*
> ✦ Remove the text/command from the Bot.
ᰔᩚ *#cmdlist • #listcmd*
> ✦ See list of texts/commands.
ᰔᩚ *#setimage • #setpfp*
> ✦ Change the Bot's profile picture.
ᰔᩚ *#setmoneda*
> ✦ Change the Bot's currency.
ᰔᩚ *#setname*
> ✦ Change the Bot's Name
ᰔᩚ *#setbio • #setstatus*
> ✦ Change the Bot's bio.
ᰔᩚ *#update*
> ✦ Update the Bot to the latest version of GitHub.
`.trim();

await conn.sendMessage(m.chat, {
text: owner,
contextInfo: {
externalAdReply: {
title: packname,
body: dev,
thumbnailUrl: banner,
mediaType: 1,
showAdAttribution: true,
renderLargerThumbnail: true
}
}
}, { quoted: m });
};

handler.help = ['mods'];
handler.tags = ['main'];
handler.command = ['dev', 'owners'];
handler.rowner = true;

export default handler;
