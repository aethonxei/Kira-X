//CREADO POR @gata_dios

let fila, columna, sopaNube, sopaPalabra, sopaDir, userSP, cambioLetra, coin = null
let intentos = 0
let handler = async (m, { conn, text, usedPrefix, command}) => {

if (!userSP) { 
userSP = m.sender.split("@")[0]
await conn.reply(m.chat, `@${m.sender.split("@")[0]} Registrado en el juego.`, m, { mentions: [m.sender] })
}

async function generarSopaDeLetras() {
const LADO = 16 // If it's too high or too low, it can cause an error; leave it as is.
let sopaDeLetras = new Array(LADO);

for (let i = 0; i < LADO; i++) {
sopaDeLetras[i] = new Array(LADO)
}

const PALABRAS = ['ALGORITHMS', 'ANDROID', 'ANIME', 'ARCHITECT', 'ART', 'ASTRONOMY', 'AVATAR', 'BIOLOGY', 'CARTOGRAPHY', 'KINEMATICS', 'SCIENCE', 'CODE', 'CROSSWORD', 'CROSSWORDPUZZLE', 'PAINTING', 'DESIGNER', 'ECONOMICS', 'EINSTEIN', 'ENCYCLOPEDIA', 'STATES', 'STUDIOS', 'SUDOKU', 'TAICHI', 'TECHNOLOGY', 'TERMINATOR', 'TETRIS', 'LEGENDZELDA', 'TIKTOK', 'TURING', 'UNIVERSE', 'VIDEO GAMES', 'VIRUS', 'WARCRAFT', 'WHATSAPP', 'XBOX', 'XENOVERSE', 'YOGA', 'YOUTUBE', 'ZELDA', 'ZENON', 'ANATOMY', 'ATHLETICS', 'BACTERIA', 'BOTANY', 'CATALOG', 'DANCE', 'DETECTION', 'DRAGONBALL', 'ELECTRONICS', 'SPACE', 'EVOLUTION', 'GHOSTS', 'FICTION', 'PHOTOGRAPHY', 'GATABOT', 'GEOGRAPHY', 'GITHUB', 'HIPHOP', 'HISTORY', 'INNOVATION', 'GARDENING', 'KARATE', 'LANGUAGE', 'LITERATURE', 'MAGIC', 'MARVEL', 'MATRICES', 'MUSIC', 'SWIMMING', 'NEUROLOGY', 'NUMEROLOGY', 'ORNITHOLOGY', 'PAINTBALL', 'PIZZA', 'POLITICS', 'MAYBE', 'WATCHMAKING', 'ROBOTICS', 'HEALTH', 'SCIFI', 'SEXLOGY', 'SIMPSONS', 'SYSTEMS', 'TALENT', 'TAROT', 'TOPOGRAPHY', 'TRADITION', 'TRIVIA', 'URBANISM', 'UTOPIAN', 'VETERINARY', 'TRAVEL', 'ZOOLOGY', 'NARUTO', 'DRAGONBALL', 'ONEPIECE', 'ATTACKTITAN', 'DEATHNOTE', 'BLEACH', 'FULLMETAL', 'SWORDONLINE', 'FAIRYTAIL', 'HEROACADEMIA', 'DEMONSLAYER', 'BLACKCLOVER', 'HUNTER', 'TOKYO', 'BOKUNOHERO', 'COWBOYBEBOP', 'CODEGEASS', 'EVANGELION', 'KIMETSU', 'STEINS', 'GINTAMA', 'YUYUHAKUSHO', 'GURREN', 'JOJOBIZARRE', 'ONEPUNCHMAN', 'KON', 'CLANNAD', 'HAIKYUU', 'AKIRA', 'GHOSTSHELL', 'YOURLIE', 'SAILORMOON', 'POKEMON', 'DIGIMON', 'PRINCESS', 'SPIRITED', 'MOCASTLE', 'MYTOTORO',
'PAINTING', 'DRAW', 'SKETCH', 'WATERCOLOR', 'SCULPTURE', 'PORTRAIT', 'ABSTRACT', 'LANDSCAPE', 'CRAFTS', 'STAMPING', 'WORKSHOPS', 'CERAMICS', 'PRINTING', 'DRAFTSMAN', 'GALLERIES', 'PHOTOGRAPH', 'PRINTED', 'MUSEUMS', 'ARTISTS', 'COMICS', 'ARTWORKS', 'SETDESIGN', 'ACRYLIC', 'ENGRAVINGS', 'HISTORY', 'FINEART', 'PAINTERS', 'PORTRAITS', 'FIGURATIVE', 'IMPRESSION', 'OIL', 'PAPERCUT', 'BRUSHES', 'SCULPTOR', 'CLAY', 'PHOTOGRAPHER', 'ACRYLICS', 'AIRBRUSH', 'SCULPTURES', 'RELIEFS', 'PIGMENTS', 'CHARCOAL', 'PRINTING', 'PHOTOGRAPHY', 'PORTRAITIST', 'VINYL', 'EPOXY', 'PHOTOGRAPHY', 'CRAFTSWOMEN', 'WORKSHOPTEACHER', 'BLACKART', 'ARTISTIC', 'WHITEBOARD', 'GISELLES', 'STATUES', 'STILLLIFE', 'PORTRAY', 'WATERCOLORS', 'SCULPTOR', 'TRIPTYCHS', 'PHOTOMURAL', 'ALTARS', 'STILLLIFES', 'ENGRAVER', 'ARTCOURSE', 'CRAFTS', 'DRAFTSMAN', 'LAMINATES', 'SCULPTRESSES', 'BRUSHTROKE', 'CARDBOARD', 'STENCIL', 'PRINTMAKER', 'PRIMER', 'POINTILLISM', 'LITHOGRAPH', 'OILON', 'WEAVING', 'DYEHOUSES', 'TIZIANOVA', 'FLOWERART', 'FINEARTS', 'BRONZES', 'PHOTOGRAPHERS', 'MUSEUMCURATOR', 'PAINTINGON', 'PORTRAITING', 'TROMPELOEIL', 'ARTZONE', 'ACRYLICS', 'SCULPTURES', 'PRINTING', 'PHOTOMONTAGE', 'MURALISTS', 'LANDSCAPING', 'PAINTERS', 'PREHISTORIC', 'PORTRAYING', 'TEMPLATES', 'WATERCOLORIST', 'AIRBRUSHES', 'BAROQUE', 'STILLLIFEPAINTER', 'CHARCOALS', 'CARDBOARDS', 'ARTCOURSES', 'DRAFTSMEN', 'STENCILS', 'PHOTOGRAPHERS', 'ENGRAVERS', 'LAMINATOR', 'LITHOGRAPHERS', 'OILGRAPHY', 'PAPERMACHE', 'WHITEBOARDS', 'BRUSHTROKES', 'POINTILLISM', 'ALTARPINTER', 'WORKSHOPTEACHERS', 'WEAVINGS', 'TIZIANOS', 'AVANTGARDE', 'VINYLADH', 'STATUETTE',
'RUNWAY', 'DRESSES', 'MODELS', 'PRINTING', 'FOOTWEAR', 'COSTUMEJEWELRY', 'ACCESSORY', 'BOUTIQUE', 'TREND', 'NEEDLE', 'THREAD', 'FASHION', 'BRANDS', 'TEXTILE', 'CUT', 'PRINTING', 'LOOK', 'CONFECTION', 'SEWING', 'ACCESSORY', 'PRINTING', 'FASHIONISTA', 'GLAMOUR', 'RANGE', 'SHINE', 'PRINTING', 'FABRIC', 'PRINTING', 'PASSION', 'STORE', 'CLOTHING', 'SHOE', 'FASHIONSHOW', 'SEW', 'DRESSMAKER', 'JACKET', 'LEATHER', 'SHIRT', 'PRINTING', 'TSHIRT', 'HAIRSTYLE', 'MAKEUP', 'STYLE', 'OUTFIT', 'MAGAZINE', 'FORTNITE', 'OVERWATCH', 'LEAGUEOFLEGENDS', 'DOTA', 'WARFRAME', 'DESTINY', 'MINECRAFT', 'HEARTHSTONE', 'WORLDWAR', 'COUNTERSTRIKE', 'ROBLOX', 'RUNESCAPE', 'TERRARIA', 'PALADINS', 'SMITE', 'ARCHEAGE', 'GUILDWARS', 'BLACKDESERT', 'TERA', 'ALBIONONLINE', 'BRAWLHALLA', 'APEXLEGENDS', 'VALORANT', 'TEAMFIGHT', 'PUBG', 'HALOGUARD', 'SEAOFTHIEVES', 'STARCRAFT', 'HEROESSTORY', 'WOWCLASSIC', 'OLDSCROLLO', 'DIABLO', 'FINALFANTASY', 'ESCAPEFROM', 'RUST', 'AMONGUS', 'IMPOSTER', 'FALLGUYS', 'PHASMOPHOBIA', 'ROCKETLEAGUE', 'FORHONOR', 'MEXICO', 'BRAZIL', 'FRANCE', 'GERMANY', 'ITALY', 'JAPAN', 'CHINA', 'RUSSIA', 'CANADA', 'AUSTRALIA', 'SPAIN', 'ARGENTINA', 'COLOMBIA', 'PORTUGAL', 'SWITZERLAND', 'SWEDEN', 'NORWAY', 'NETHERLANDS', 'BELGIUM', 'DENMARK', 'POLAND', 'HUNGARY', 'AUSTRIA', 'CROATIA', 'SERBIA', 'ROMANIA', 'BULGARIA', 'GREECE', 'TURKEY', 'EGYPT', 'MOROCCO', 'SOUTHAFRICA', 'NIGERIA', 'KENYA', 'ETHIOPIA', 'CHILE', 'PERU', 'ECUADOR', 'BOLIVIA', 'PARAGUAY', 'URUGUAY', 'CUBA', 'JAMAICA', 'HAITI', 'PUERTORICO', 'DOMINICANREPUBLIC', 'VENEZUELA', 'NICARAGUA', 'GUATEMALA', 'ELSALVADOR', 'HONDURAS', 'PANAMA', 'COSTARICA', 'BELIZE', 'IRELAND', 'ENGLAND', 'SCOTLAND', 'WALES', 'USA', 'ROMANIA', 'UKRAINE', 'NEWZEALAND', 'FIJI', 'SAMOA', 'TONGA', 'VANUATU', 'KIRIBATI', 'MICRONESIA', 'PALAU', 'NAURU', 'TUVALU', 'SOLOMON', 'TUVALU', 'SURINAME', 'GUYANA', 'PERU', 'BRAZIL', 'MEXICO', 'ARGENTINA', 'COLOMBIA', 'VENEZUELA', 'CHILE', 'ECUADOR', 'BOLIVIA', 'URUGUAY', 'PARAGUAY', 'COSTARICA', 'HONDURAS', 'NICARAGUA', 'PANAMA', 'GUATEMALA', 'ELSALVADOR',
'MARKET', 'EMPLOYMENT', 'INFLATION', 'PRODUCT', 'CONSUMPTION', 'TAX', 'CURRENCY', 'BANKING', 'TAXATION', 'CREDIT', 'FINANCE', 'BUSINESS', 'TRADE', 'EXPORT', 'IMPORT', 'DEVALUATION', 'DEMAND', 'SUPPLY', 'RECESSION', 'DEFLATION', 'INVESTMENT', 'GROWTH', 'DEBT', 'DEFICIT', 'STIMULUS', 'STOCKEX', 'FOREX', 'TARIFF', 'SUBSIDY', 'SURPLUS', 'CYCLE', 'FUND', 'VALUE', 'PROFIT', 'SALARY', 'MONOPOLY', 'OLIGOPOLY', 'MARKETING', 'COMMERCIAL', 'BALANCE', 'EMPLOYER', 'MERCHANT', 'PROTECTION', 'MULTINATIONAL', 'TARIFF', 'ENTREPRENEUR', 'CAPITALISM', 'SOCIALISM', 'GLOBAL', 'NEOLIBERAL', 'COOPERATIVE', 'WORLD', 'ECONOMY', 'COMPETITION', 'STATE', 'SUSTAINABLE', 'INNOVATION', 'INCENTIVE', 'MARKETING', 'INVESTMENT', 'MANUFACTURER', 'MARKETING', 'DISTRIBUTION', 'LOAN', 'NEGOTIATION', 'SURPLUS', 'DEVALUE', 'DEVALOR', 'CRISIS', 'STARTUP', 'SALE', 'RENT', 'PROFIT', 'BANKING', 'FINANCE', 'QUOTE', 'REMITTANCE', 'INSURANCE', 'FIDUCIARY', 'TREASURY', 'COMMISSION', 'PRODUCTION', 'ECONOMIST', 'BUY', 'SELLER', 'MONETARY', 'DISCOUNT', 'SMUGGLING', 'CADASTRE', 'UNIONISM', 'COVER', 'CAPITAL', 'SAVINGS', 'EXPENSE', 'BANKER', 'CASH', 'ENTREPRENEUR', 'COMMERCIAL', 'EXPENSES', 'INCOME', 'ECONOMETRICS', 'MERGER', 'BUYSELL', 'AUCTION', 'BROKER', 'AUCTION', 'BALANCE', 'BIDDER', 'DEMANDER', 'COMPANY', 'ETHICS', 'CONTRACT', 'RATE', 'COST', 'INDUSTRY', 'SUPPLIER', 'PROMISSORYNOTE', 'CYCLOPS', 'CONSUMER', 'PRODUCTION', 'SELL', 'DEVALUATION', 'CHEAPEN', 'INSOLVENCY', 'LIQUIDATION', 'AMORTIZATION', 'SHAREHOLDER', 'INTEREST', 'PRODUCER', 'PRICES', 'SPECULATION', 'MATERIAL', 'PREMIUM', 'IMPORTER', 'EXPORTER', 'AMOUNT', 'EXPORT', 'ACCOUNTING',
'STADIUM', 'WORLD CUP', 'TOP SCORER', 'TROPICAL', 'KANGAROO', 'TIGER CAT', 'NEBULA', 'ANDROMEDA', 'JUNGLE', 'SATELLITE', 'COLISEUM', 'AMAZON', 'PUMA', 'CAMEL', 'MAGELLAN', 'MOON', 'COMET', 'ORION', 'JUPITER', 'RAINBOW', 'ELEPHANT', 'CROATIA', 'TOWER', 'GALAXY', 'BALL', 'ATLANTIC', 'MOUNTAIN RANGE', 'ZEBRA', 'TIGER', 'ROCK', 'METEOR', 'CAT', 'RACECOURSE', 'LEOPARD', 'MARS', 'VENUS', 'DUST', 'BURJKHALIFA', 'EIFFELTOWER', 'PISATOWER', 'ABUDHABI', 'NAIROBI', 'NETHERLANDS', 'ISRAEL', 'SINGAPORE', 'SWEDEN', 'BRAZIL', 'BALEARIC', 'MOUNTAIN', 'GLACIER', 'RIVER', 'LAKE', 'CAVERN', 'LEMON', 'APPLE', 'ORANGE', 'CROCODILE', 'RHINOCEROS', 'BEETLE', 'PENGUIN', 'TOUCAN', 'TURTLE', 'CHIMPANZEE', 'GIRAFFE', 'KANGAROO', 'WALLABY', 'BAT', 'SAVANNA', 'DUNE', 'ROOSTER', 'RABBIT', 'MARSHAL', 'SAPPHIRE', 'RUBY', 'EMERALD', 'ASTEROID', 'STAR', 'PLANET', 'COMPUTER', 'INTERNET', 'ROBOT', 'SATELLITE', 'ALIEN', 'NASA', 'SPACEX', 'ELONMUSK', 'NEPTUNE', 'URANUS', 'MERCURY', 'PLUTO', 'SPACE', 'BLACKHOLE', 'CONSTELLATION', 'CELLO', 'GUITAR', 'PIANO', 'CONCERT', 'COMPOSER', 'MUSIC', 'SOUND', 'VOICE', 'FACEBOOK', 'INSTAGRAM', 'TWITTER', 'SPOTIFY', 'APPLEMUSIC', 'SOUNDCLOUD', 'DEEZER', 'TIDAL', 'PANDORA', 'NETFLIX', 'AMAZONPRIME', 'DISNEY', 'HBO', 'HULU', 'YOUTUBETV', 'ESPN', 'TWITCH', 'REDDIT', 'LINKEDIN', 'SNAPCHAT', 'TELEGRAM', 'SKYPE', 'ZOOM', 'TIKTOPDANCE', 'STORIES', 'TRENDS', 'FILTERS', 'VLOGS', 'PLAYLISTS', 'TAYLORSWIFT', 'ARIANAGRANDE', 'LADYGAGA', 'BILLIEEILISH', 'DUALIPA', 'HARRYSTYLES', 'POSTMALONE', 'JUSTINBIEBER', 'EDSHEERAN', 'SHAWNMENDES', 'LEWISCAPALDI', 'JONAS', 'KATYPERRY', 'RIHANNA', 'ADELE', 'LIZZO', 'CARDIB', 'MILEYCYRUS', 'SELENAGOMEZ', 'JENNIFERLOPEZ', 'DICAPRIO', 'TOMHANKS', 'ANGELINA', 'BRADPITT', 'MERYLSTREEP', 'NICOLEKIDMAN', 'EMMASTONE', 'JOHNTRAVOLTA', 'TOMCRUISE', 'JULIAROBERTS', 'CHRIS', 'SCARLETT', 'ROBERTDOWNEY', 'DWAYNE', 'JIMPARSONS', 'SOFIAVERGARA', 'HARINGTON', 'EMILIACLARKE', 'PETER', 'VIOLADAVIS', 'BRIELARSON', 'TOMHOLLAND', 'DAISYRIDLEY', 'JOHNBOYEGA', 'DAVIDHARBOUR', 'BOBBYBROWN', 'THEGODFATHER', 'GOODFELLAS', 'PULPFICTION', 'THESHINING', 'JAWS', 'STARWARS', 'HARRYPOTTER', 'LORDOFTHERINGS', 'THEMATRIX', 'FIGHTCLUB', 'FORRESTGUMP', 'THETERMINATOR', 'THELIONKING', 'FROZEN', 'COCO', 'TOYSTORY', 'AVENGERS', 'IRONMAN', 'BLACKPANTHER', 'SPIDERMAN', 'CAPTAINAMERICA', 'THOR', 'BATMAN', 'SUPERMAN', 'WONDERWOMAN', 'BREAKINGBAD', 'THECROWN', 'STRANGER', 'WALKINGDEAD', 'WESTWORLD', 'MANDALORIAN', 'TIGERKING', 'THEOFFICE']
const PALABRA = PALABRAS[Math.floor(Math.random() * PALABRAS.length)]

let filaInicial = Math.floor(Math.random() * LADO)
let columnaInicial = Math.floor(Math.random() * LADO)
const DIRECCIONES = ["horizontal", "vertical", "diagonalRight", "diagonalLeft"]
const DIRECCION = DIRECCIONES[Math.floor(Math.random() * DIRECCIONES.length)]

let palabraAgregada = false
while (!palabraAgregada) {
filaInicial = Math.floor(Math.random() * LADO)
columnaInicial = Math.floor(Math.random() * LADO)

// Algorithm to guarantee the word 
let palabraEntra = true;
for (let i = 0; i < PALABRA.length; i++) {
if (DIRECCION === "horizontal" && (columnaInicial + i >= LADO)) {
palabraEntra = false
break;
} else if (DIRECCION === "vertical" && (filaInicial + i >= LADO)) {
palabraEntra = false
break;
} else if (DIRECCION === "diagonalRight" && (filaInicial + i >= LADO || columnaInicial + i >= LADO)) {
palabraEntra = false
break;
} else if (DIRECCION === "diagonalLeft" && (filaInicial + i >= LADO || columnaInicial - i < 0)) {
palabraEntra = false
break;
}
}

// If the word fits, add it to the word search.
if (palabraEntra) {
for (let i = 0; i < PALABRA.length; i++) {
if (DIRECCION === "horizontal") {
sopaDeLetras[filaInicial][columnaInicial + i] = PALABRA.charAt(i)
} else if (DIRECCION === "vertical") {
sopaDeLetras[filaInicial + i][columnaInicial] = PALABRA.charAt(i)
} else if (DIRECCION === "diagonalRight") {
sopaDeLetras[filaInicial + i][columnaInicial + i] = PALABRA.charAt(i)
} else {
sopaDeLetras[filaInicial + i][columnaInicial - i] = PALABRA.charAt(i)
}
}
palabraAgregada = true;
}
}

// Design 
const LETRAS_POSIBLES = "ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓜⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏ"
const numerosUni = ["⓿", "❶", "❷", "❸", "❹", "❺", "❻", "❼", "❽", "❾", "❿", "⓫", "⓬", "⓭", "⓮", "⓯", "⓰", "⓱", "⓲", "⓳", "⓴"]
let sopaDeLetrasConBordes = ""
sopaDeLetrasConBordes += "     " + [...Array(LADO).keys()].map(num => numerosUni[num]).join(" ") + "\n"
//sopaDeLetrasConBordes += "   *╭" + "┄".repeat(LADO) + '┄┄' + "╮*\n"

for (let i = 0; i < LADO; i++) {
let fila = numerosUni[i] + " "

for (let j = 0; j < LADO; j++) {
if (sopaDeLetras[i][j]) {
fila += sopaDeLetras[i][j] + " "
} else {
let letraAleatoria = LETRAS_POSIBLES.charAt(Math.floor(Math.random() * LETRAS_POSIBLES.length))
fila += letraAleatoria + " "
}
}
fila += ""
sopaDeLetrasConBordes += fila + "\n"
}
//sopaDeLetrasConBordes += "   *╰" + "┄".repeat(LADO) + '┄┄' + "╯*"
sopaDeLetrasConBordes = sopaDeLetrasConBordes.replace(/[a-zA-Z]/g, letra => LETRAS_POSIBLES[letra.charCodeAt() - 65] || letra)

await m.reply(`☁️ *WORD SEARCH* ☁️
*Word:* \`\`\`"${PALABRA}"\`\`\`
*You have 3 minutes to find the correct answer!!*

*Write the row number of the first letter _"${PALABRA.charAt(0)}"_ of the word _"${PALABRA}"_ Has _${intentos}_ attempts!!*

*Example:*
${emoji} \`\`\`${usedPrefix + command} 28\`\`\`
➡️ \`\`\`Row 2\`\`\`    ⬇️ \`\`\`Column 8\`\`\``.trim())
await m.reply(`☁️ *${PALABRA.split("").join(" ")}* ☁️\n\n` + sopaDeLetrasConBordes.trimEnd())
fila = filaInicial 
columna = columnaInicial
sopaNube = sopaDeLetrasConBordes
sopaPalabra = PALABRA 
sopaDir = DIRECCION.replace(/([A-Z])/g, ' $1').toLowerCase().replace(/^./, str => str.toUpperCase())
}

// Game conditions
cambioLetra = sopaDir
let tagUser = userSP + '@s.whatsapp.net'
if (userSP != m.sender.split("@")[0]) {
await conn.reply(m.chat, `*@${tagUser.split("@")[0]} He is currently playing word search.*`, m, { mentions: [tagUser] })
return
}
if (intentos === 0) {
intentos = 3  
generarSopaDeLetras()
resetUserSP(sopaDir)

async function resetUserSP() {
await new Promise((resolve) => setTimeout(resolve, 2 * 60 * 1000)) // 2 min
if (intentos !== 0) {
await conn.reply(m.chat, `*@${m.sender.split("@")[0]} You have one minute left!!* 😨`, m, { mentions: [m.sender] })
}
await new Promise((resolve) => setTimeout(resolve, 3 * 60 * 1000)) // 3 min
if (intentos !== 0) {
await conn.reply( m.chat, `*@${m.sender.split("@")[0]} Time has run out!!* 😧\n\n*The word _"${sopaPalabra}"_ It was located at the address _${sopaDir}_ From the row _${fila}_ And Column _${columna}_*`, m, { mentions: [m.sender] })
fila = null, columna = null, sopaNube = null, sopaPalabra = null, sopaDir = null, userSP = null, cambioLetra = null
intentos = 0
}
}}else {
if (`${fila}${columna}` == text) {
if (sopaPalabra.length <= 4) {
diamante = 4
} else if (sopaPalabra.length <= 8) {
diamante = 8
} else if (sopaPalabra.length <= 11) {
diamante = 24
} else {
diamante = 32
}
global.db.data.users[m.sender].coin += coin

await m.reply(`\`\`\`${emoji} You have won ${m.moneda} ${rpgshop.emoticon('limit')}!!\`\`\`\n\n*Correct!! the word _"${sopaPalabra}"_ It was located at the address _${cambioLetra}_ From the row _${fila}_ And Column _${columna}_*`)
fila = null, columna = null, sopaNube = null, sopaPalabra = null, sopaDir = null, userSP = null, cambioLetra = null
intentos = 0
return
}else{
if (intentos === 1) {
fila = null, columna = null, sopaNube = null, sopaPalabra = null, sopaDir = null, userSP = null, cambioLetra = null
intentos = 0
await m.reply(`${emoji2} *You've run out of attempts!! the word _"${sopaPalabra}"_ was located at the address _${cambioLetra}_ From the row _${fila}_ And Column _${columna}_*`)
return  
} else {
intentos -= 1
await m.reply(`${emoji2} *Incorrect. You have left _${intentos}_ Attempts!!*${intentos === 1 ? '' : `\n*Word to find:* \`\`\`${sopaPalabra}\`\`\``}\n\n${intentos === 1 ? `\`\`\`👾 Clue!!\`\`\`\n*The word _${sopaPalabra}_ is located at the address _"${cambioLetra}"_*\n\n` : ''}${sopaNube}`)
return
}}
}}
handler.help = ['sopa', 'buscarpalabras']; 
 handler.tags = ['game']; 
handler.command = ['wordfind', 'wordsearch', 'soup', 'sopa', 'buscarpalabra']
handler.group = true
handler.register = true

export default handler