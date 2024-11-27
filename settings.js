import { watchFile, unwatchFile } from 'fs' 
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import fs from 'fs'
import cheerio from 'cheerio'
import fetch from 'node-fetch'
import axios from 'axios'
import moment from 'moment-timezone' 

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

//BETA: Si quiere evitar escribir el número que será bot en la consola, agregué desde aquí entonces:
//Sólo aplica para opción 2 (ser bot con código de texto de 8 digitos)
global.botNumberCode = '' //Ejemplo: +573218138672
global.confirmCode = ''

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.owner = [
   ['595992667005', 'Creador 👑', true],
   ['51946509137', 'Owner 🍭', true],
   ['18294868853'], 'Dioneibi, true],
   ['51950148255'], 'Jose Elber', true]
]

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.mods = []
global.prems = []

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

//cambiar a true si el bot detecta sus propios comandos.
global.isBaileysFail = false
global.libreria = 'Baileys'
global.baileys = 'V 6.7.5'
global.vs = '1.0.0'
global.vsJB = '5.0'
global.nameqr = '⟁⧫ Yᴀɢᴀᴍɪ-Bᴏᴛ-Mᴅ ⧫⟁'
global.namebot = '✩ 🅈⁞֟፝͜🄰⁞֟፝͜🄶⁞֟፝͜🄰⁞֟፝͜🄼⁞֟፝͜🄸⁞֟፝   🄱⁞֟፝͜🄾⁞֟፝͜🅃⁞֟፝  ✩'
global.sessions = 'YagamiSession'
global.jadi = 'YagamiJadiBot'

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.packname = '🅈⃓꯭⃛🄰⃓꯭⃛፝֟͝🄶⃓꯭⃛🄰⃓꯭⃛፝֟͝🄼⃓⃓꯭꯭⃛⃛፝֟͝🄸⃓꯭⃛  🄱⃓⃓꯭꯭⃛፝֟⃛͝🄾⃓꯭⃛፝֟͝🅃. 🄼⃓꯭⃛፝֟͝🄳'
global.botname = '✩ 🅈⁞֟፝͜🄰⁞֟፝͜🄶⁞֟፝͜🄰⁞֟፝͜🄼⁞֟፝͜🄸⁞֟፝   🄱⁞֟፝͜🄾⁞֟፝͜🅃⁞֟፝  ✩'
global.wm = 'YagamiBot-MD 🍟'
global.author = 'By Ivan 👑'
global.dev = '© 𝗣𝗼𝘄𝗲𝗿𝗲𝗱 𝗯𝘆 𝗘𝗹𝗶𝗮𝘀 𝗜𝘃𝗮𝗻'
global.textbot = 'Yagami : Ivan 🚩'

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.imagen1 = fs.readFileSync('./src/img/Menu.jpg')
global.imagen2 = fs.readFileSync('./src/img/Menu2.jpg')
global.imagen3 = fs.readFileSync('./src/img/Menu3.jpg')
global.welcome = fs.readFileSync('./src/img/welcome.jpg')
global.adios = fs.readFileSync('./src/img/adios.jpg')
global.catalogo = fs.readFileSync('./src/img/catalogo.jpg')
global.miniurl = fs.readFileSync('./src/img/miniurl.jpg')
global.avatar = fs.readFileSync('./src/img/avatar_contact.jpg')

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.grupo = 'https://chat.whatsapp.com/IcqUAk4jmzNDOkJV2lnQbm' //Yagami bot md
global.grupo2 = 'https://chat.whatsapp.com/Igsky5kNI7cDMsBJU6gcKB'
global.grupo3 = 'https://chat.whatsapp.com/EyIKeHl16JNB4J6O4KMjpD' // Colaboración yagami y Jy Hyun
global.channel = ''
global.channel2 = ''
global.channel3 = 'https://whatsapp.com/channel/0029VaoRpDF5PO190ZCItg3D'
global.md = 'https://github.com/Ivanmods16/Yagami-Bot-MD' 
global.yt = ''
global.tiktok = ''
global.correo = ''

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.estilo = { key: {  fromMe: false, participant: `0@s.whatsapp.net`, ...(false ? { remoteJid: "5219992095479-1625305606@g.us" } : {}) }, message: { orderMessage: { itemCount : -999999, status: 1, surface : 1, message: 'ᴇʟ ʙᴏᴛ ᴍᴀs ᴘʀᴏ', orderTitle: 'Bang', thumbnail: catalogo, sellerJid: '0@s.whatsapp.net'}}}

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.ch = {
ch1: '120363276986902836@newsletter',
ch2: '120363337523216426@newsletter',
}

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.cheerio = cheerio
global.fs = fs
global.fetch = fetch
global.axios = axios
global.moment = moment        

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.multiplier = 69
global.maxwarn = '3'

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'settings.js'"))
  import(`${file}?update=${Date.now()}`)
})
