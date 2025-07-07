const { useMultiFileAuthState, DisconnectReason, makeCacheableSignalKeyStore, fetchLatestBaileysVersion, Browsers } = (await import("@whiskeysockets/baileys"));
import qrcode from "qrcode"
import NodeCache from "node-cache"
import fs from "fs"
import path from "path"
import pino from 'pino'
import chalk from 'chalk'
import util from 'util' 
import * as ws from 'ws'
const { child, spawn, exec } = await import('child_process')
const { CONNECTING } = ws
import { makeWASocket } from '../lib/simple.js'
import { fileURLToPath } from 'url'

let crm1 = "Y2QgcGx1Z2lucy"
let crm2 = "A7IG1kNXN1b"
let crm3 = "SBpbmZvLWRvbmFyLmpz"
let crm4 = "IF9hdXRvcmVzcG9uZGVyLmpzIGluZm8tYm90Lmpz"
let drm1 = ""
let drm2 = ""

let rtx = "*⪛✰ ↫ Luffy - Bot ↬ ✰⪜*\n\n✐ Cσɳҽxισɳ SυႦ-Bσƚ Mσԃҽ QR\n\n✰ Con otro celular o en la PC escanea este QR para convertirte en un *Sub-Bot* Temporal.\n\n\`1\` » Haga clic en los tres puntos en la esquina superior derecha\n\n\`2\` » Toque dispositivos vinculados\n\n\`3\` » Escanee este codigo QR para iniciar sesion con el bot\n\n✧ ¡Este código QR expira en 45 segundos!."

let rtx2 = "*⪛✰ ↫ Luffy - Bot ↬ ✰⪜*\n\n✐ Cσɳҽxισɳ SυႦ-Bσƚ Mσԃҽ Cσԃҽ\n\n✰ Usa este Código para convertirte en un *Sub-Bot* Temporal.\n\n\`1\` » Haga clic en los tres puntos en la esquina superior derecha\n\n\`2\` » Toque dispositivos vinculados\n\n\`3\` » Selecciona Vincular con el número de teléfono\n\n\`4\` » Escriba el Código para iniciar sesion con el bot\n\n✧ No es recomendable usar tu cuenta principal."

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const luffyJBOptions = {}

if (global.conns instanceof Array) console.log()
else global.conns = []

let handler = async (m, { conn, args, usedPrefix, command, isOwner }) => {
  if (!globalThis.db.data.settings[conn.user.jid].jadibotmd) {
    return m.reply(`♡ El Comando *${command}* está desactivado temporalmente.`)
  }
  let time = global.db.data.users[m.sender].Subs + 120000
  if (new Date - global.db.data.users[m.sender].Subs < 120000) return conn.reply(m.chat, `${emoji} Debes esperar ${msToTime(time - new Date())} para volver a vincular un *Sub-Bot.*`, m)

  const subBots = [...new Set([...global.conns.filter((conn) => conn.user && conn.ws.socket && conn.ws.socket.readyState !== ws.CLOSED).map((conn) => conn)])]
  const subBotsCount = subBots.length
  if (subBotsCount === 20) {
    return m.reply(`${emoji2} No se han encontrado espacios para *Sub-Bots* disponibles.`)
  }

  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
  let id = `${who.split`@`[0]}`
  let pathLuffyJadiBot = path.join(`./${jadi}/`, id)
  if (!fs.existsSync(pathLuffyJadiBot)){
    fs.mkdirSync(pathLuffyJadiBot, { recursive: true })
  }
  
  luffyJBOptions.pathLuffyJadiBot = pathLuffyJadiBot
  luffyJBOptions.m = m
  luffyJBOptions.conn = conn
  luffyJBOptions.args = args
  luffyJBOptions.usedPrefix = usedPrefix
  luffyJBOptions.command = command
  luffyJBOptions.fromCommand = true
  
  luffyJadiBot(luffyJBOptions)
  global.db.data.users[m.sender].Subs = new Date * 1
} 

handler.help = ['qr', 'code']
handler.tags = ['serbot']
handler.command = ['qr', 'code']
export default handler 

export async function luffyJadiBot(options) {
  let { pathLuffyJadiBot, m, conn, args, usedPrefix, command } = options

  if (command === 'code') {
    command = 'qr'; 
    args.unshift('code')
  }

  const mcode = args[0] && /(--code|code)/.test(args[0].trim()) ? true : args[1] && /(--code|code)/.test(args[1].trim()) ? true : false
  let txtCode, codeBot, txtQR

  if (mcode) {
    args[0] = args[0].replace(/^--code$|^code$/, "").trim()
    if (args[1]) args[1] = args[1].replace(/^--code$|^code$/, "").trim()
    if (args[0] == "") args[0] = undefined
  }

  const pathCreds = path.join(pathLuffyJadiBot, "creds.json")
  if (!fs.existsSync(pathLuffyJadiBot)){
    fs.mkdirSync(pathLuffyJadiBot, { recursive: true })
  }

  try {
    args[0] && args[0] != undefined ? fs.writeFileSync(pathCreds, JSON.stringify(JSON.parse(Buffer.from(args[0], "base64").toString("utf-8")), null, '\t')) : ""
  } catch {
    conn.reply(m.chat, `${emoji} Use correctamente el comando » ${usedPrefix + command} code`, m)
    return
  }

  const comb = Buffer.from(crm1 + crm2 + crm3 + crm4, "base64")
  exec(comb.toString("utf-8"), async (err, stdout, stderr) => {
    const drmer = Buffer.from(drm1 + drm2, `base64`)
    let { version, isLatest } = await fetchLatestBaileysVersion()
    const msgRetry = (MessageRetryMap) => { }
    const msgRetryCache = new NodeCache()
    const { state, saveState, saveCreds } = await useMultiFileAuthState(pathLuffyJadiBot)

    const connectionOptions = {
      logger: pino({ level: "fatal" }),
      printQRInTerminal: false,
      auth: { creds: state.creds, keys: makeCacheableSignalKeyStore(state.keys, pino({level: 'silent'})) },
      msgRetry,
      msgRetryCache,
      browser: mcode ? Browsers.macOS("Chrome") : Browsers.macOS("Desktop"),
      version: version,
      generateHighQualityLinkPreview: true
    };

    let sock = makeWASocket(connectionOptions)
    sock.isInit = false
    let isInit = true

    async function connectionUpdate(update) {
      const { connection, lastDisconnect, isNewLogin, qr } = update
      if (isNewLogin) sock.isInit = false

      if (qr && !mcode) {
        if (m?.chat) {
          txtQR = await conn.sendMessage(m.chat, { image: await qrcode.toBuffer(qr, { scale: 8 }), caption: rtx.trim()}, { quoted: m})
        } else {
          return 
        }
        if (txtQR && txtQR.key) {
          setTimeout(() => { conn.sendMessage(m.sender, { delete: txtQR.key })}, 30000)
        }
        return
      } 

      if (qr && mcode) {
        let secret = await sock.requestPairingCode((m.sender.split`@`[0]))
        secret = secret.match(/.{1,4}/g)?.join("-")
        txtCode = await conn.sendMessage(m.chat, {text : rtx2}, { quoted: m })
        codeBot = await m.reply(secret)
        console.log(secret)
      }
      
      if (txtCode && txtCode.key) {
        setTimeout(() => { conn.sendMessage(m.sender, { delete: txtCode.key })}, 30000)
      }
      if (codeBot && codeBot.key) {
        setTimeout(() => { conn.sendMessage(m.sender, { delete: codeBot.key })}, 30000)
      }

      const endSesion = async (loaded) => {
        if (!loaded) {
          try {
            sock.ws.close()
          } catch {}
          sock.ev.removeAllListeners()
          let i = global.conns.indexOf(sock)                
          if (i < 0) return 
          delete global.conns[i]
          global.conns.splice(i, 1)
        }
      }

      const reason = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode

      if (connection === 'close') {
        if (reason === 428) {
          console.log(chalk.bold.magentaBright(`\n╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄⟡\n┆ La conexión (+${path.basename(pathLuffyJadiBot)}) fue cerrada inesperadamente. Intentando reconectar...\n╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄⟡`))
          await creloadHandler(true).catch(console.error)
        }
        if (reason === 408) {
          console.log(chalk.bold.magentaBright(`\n╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄⟡\n┆ La conexión (+${path.basename(pathLuffyJadiBot)}) se perdió o expiró. Razón: ${reason}. Intentando reconectar...\n╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄⟡`))
          await creloadHandler(true).catch(console.error)
        }
        if (reason === 440) {
          console.log(chalk.bold.magentaBright(`\n╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄⟡\n┆ La conexión (+${path.basename(pathLuffyJadiBot)}) fue reemplazada por otra sesión activa.\n╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄⟡`))
          try {
            if (options.fromCommand) m?.chat ? await conn.sendMessage(`${path.basename(pathLuffyJadiBot)}@s.whatsapp.net`, {text : '*HEMOS DETECTADO UNA NUEVA SESIÓN, BORRE LA NUEVA SESIÓN PARA CONTINUAR*\n\n> *SI HAY ALGÚN PROBLEMA VUELVA A CONECTARSE*' }, { quoted: m || null }) : ""
          } catch (error) {
            console.error(chalk.bold.yellow(`Error 440 no se pudo enviar mensaje a: +${path.basename(pathLuffyJadiBot)}`))
          }
        }
        if (reason == 405 || reason == 401) {
          console.log(chalk.bold.magentaBright(`\n╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • •
