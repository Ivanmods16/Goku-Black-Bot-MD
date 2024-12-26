import { watchFile, unwatchFile } from 'fs' 
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import fs from 'fs'
import cheerio from 'cheerio'
import fetch from 'node-fetch'
import axios from 'axios'
import moment from 'moment-timezone' 

//*▬▬▬▬▬▬《🌀》▬▬▬▬▬▬▬▬▬▬▬*

//BETA: Si quiere evitar escribir el número que será bot en la consola, agregué desde aquí entonces:
//Sólo aplica para opción 2 (ser bot con código de texto de 8 digitos)
global.botNumberCode = '' //Ejemplo: +573218138672
global.confirmCode = ''

//*▬▬▬▬▬▬《⚡》▬▬▬▬▬▬▬▬▬▬▬*

global.owner = [
   ['593979133620', 'Creador 👑', true]] 

//*▬▬▬▬▬▬《🏝️》▬▬▬▬▬▬▬▬▬▬▬*

global.mods = []
global.prems = []

//*▬▬▬▬▬▬《🍃》▬▬▬▬▬▬▬▬▬▬▬*

//cambiar a true si el bot detecta sus propios comandos.
global.isBaileysFail = false
global.libreria = 'Baileys'
global.baileys = 'V 6.7.5'
global.vs = '1.0.0'
global.vsJB = '5.0'
global.nameqr = '⟁⧫FN BOT⧫⟁'
global.namebot = 'FN Bot'
global.sessions = 'YagamiSession'
global.jadi = 'YagamiJadiBot'

//*▬▬▬▬▬▬《🏵️》▬▬▬▬▬▬▬▬▬▬▬*

global.packname = 'FN bot '
global.botname = 'FN Bot'
global.wm = 'FNBot'
global.author = 'By Ricardo 👑'
global.dev = 'FN BOT '
global.textbot = 'FN : Ricardo 🚩'

//*▬▬▬▬▬▬《🍄》▬▬▬▬▬▬▬▬▬▬▬*

global.imagen1 = fs.readFileSync('./src/img/Menu.jpg')
global.imagen2 = fs.readFileSync('./src/img/Menu2.jpg')
global.imagen3 = fs.readFileSync('./src/img/Menu3.jpg')
global.welcome = fs.readFileSync('./src/img/welcome.jpg')
global.adios = fs.readFileSync('./src/img/adios.jpg')
global.catalogo = fs.readFileSync('./src/img/catalogo.jpg')
global.miniurl = fs.readFileSync('./src/img/miniurl.jpg')
global.avatar = fs.readFileSync('./src/img/avatar_contact.jpg')

//*▬▬▬▬▬▬《💫》▬▬▬▬▬▬▬▬▬▬▬*

global.grupo = '' //FN
global.grupo2 = ''
global.grupo3 = ''
global.channel = ''
global.channel2 = ''
global.channel3 = ''
global.md = '' 
global.yt = ''
global.tiktok = ''
global.correo = ''

//*▬▬▬▬▬▬《⭐》▬▬▬▬▬▬▬▬▬▬▬*

global.estilo = { key: {  fromMe: false, participant: `0@s.whatsapp.net`, ...(false ? { remoteJid: "5219992095479-1625305606@g.us" } : {}) }, message: { orderMessage: { itemCount : -999999, status: 1, surface : 1, message: 'ᴇʟ ʙᴏᴛ ᴍᴀs ᴘʀᴏ', orderTitle: 'Bang', thumbnail: catalogo, sellerJid: '0@s.whatsapp.net'}}}

//*▬▬▬▬▬▬《🐬》▬▬▬▬▬▬▬▬▬▬▬▬*

global.ch = {
ch1: '',
ch2: '',
}

//*▬▬▬▬▬▬《🕹️》▬▬▬▬▬▬▬▬▬▬▬▬*

global.cheerio = cheerio
global.fs = fs
global.fetch = fetch
global.axios = axios
global.moment = moment        

//*▬▬▬▬▬▬《🌲》▬▬▬▬▬▬▬▬▬▬▬▬*

global.multiplier = 69
global.maxwarn = '3'

//*▬▬▬▬▬▬《🌱》▬▬▬▬▬▬▬▬▬▬▬▬*

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'settings.js'"))
  import(`${file}?update=${Date.now()}`)
})
