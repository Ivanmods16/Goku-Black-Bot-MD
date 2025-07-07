import fs from "fs"
import path from "path"
import pino from 'pino'
import qrcode from "qrcode"
import NodeCache from "node-cache"
import chalk from 'chalk'
import { makeWASocket } from '../lib/simple.js'
import { useMultiFileAuthState, makeCacheableSignalKeyStore, fetchLatestBaileysVersion, DisconnectReason } from "@whiskeysockets/baileys"
import { exec } from "child_process"

const premiumUsers = [
  '51987654321',
  '521234567890'
]

const handler = async (m, { conn, args, usedPrefix, command, isOwner }) => {
  let who = m.sender.replace(/[^0-9]/g, '')
  const isPremium = isOwner || premiumUsers.includes(who)

  if (!isPremium) {
    return m.reply(`❌ Esta función es *solo para usuarios Premium o el Owner*.\n\n💎 Si deseas acceso, contáctanos.`)
  }

  let id = `${who}`
  let pathGataJadiBot = path.join("./jadibts/", id)
  if (!fs.existsSync(pathGataJadiBot)) {
    fs.mkdirSync(pathGataJadiBot, { recursive: true });
  }

  let mcode = args.includes('--code') || args.includes('code')
  let pathCreds = path.join(pathGataJadiBot, "creds.json")

  // Si pasa code base64 como argumento
  if (args[0] && args[0] !== '--code') {
    try {
      let decoded = Buffer.from(args[0], "base64").toString("utf-8")
      fs.writeFileSync(pathCreds, JSON.stringify(JSON.parse(decoded), null, '\t'))
    } catch (e) {
      return m.reply("❌ Código inválido o malformado.")
    }
  }

  const { state, saveCreds } = await useMultiFileAuthState(pathGataJadiBot)
  const msgRetry = (MessageRetryMap) => { }
  const msgRetryCache = new NodeCache()

  let sock = makeWASocket({
    printQRInTerminal: false,
    auth: {
      creds: state.creds,
      keys: makeCacheableSignalKeyStore(state.keys, pino({ level: 'silent' }))
    },
    logger: pino({ level: 'silent' }),
    version: (await fetchLatestBaileysVersion()).version,
    msgRetry,
    msgRetryCache,
    browser: mcode ? ['Ubuntu', 'Chrome', '110.0.0.0'] : ['LoliBot-MD', 'Chrome', '2.0.0'],
    getMessage: async () => ({ conversation: "Hola" })
  })

  sock.ev.on('connection.update', async (update) => {
    const { connection, lastDisconnect, isNewLogin, qr } = update

    if (qr && !mcode) {
      const qrimg = await qrcode.toBuffer(qr, { scale: 8 })
      await conn.sendMessage(m.chat, { image: qrimg, caption: `🔰 Escanea este código QR para conectarte como Sub Bot\n⚠️ Expira en 45 segundos` }, { quoted: m })
    }

    if (qr && mcode) {
      try {
        const secret = await sock.requestPairingCode(m.sender.split`@`[0])
        await conn.sendMessage(m.chat, { text: `🔐 Tu código de emparejamiento:\n\n*${secret}*\n\n⚠️ Solo válido por tiempo limitado.` }, { quoted: m })
      } catch {
        m.reply("❌ No se pudo generar el código. Intenta más tarde.")
      }
    }

    if (connection === 'open') {
      global.conns.push(sock)
      await conn.sendMessage(m.chat, { text: `✅ Sub Bot conectado con éxito\n💻 Usuario: wa.me/${m.sender.split`@`[0]}` }, { quoted: m })

      if (!args[0] && fs.existsSync(pathCreds)) {
        const base64Code = Buffer.from(fs.readFileSync(pathCreds)).toString("base64")
        await conn.sendMessage(m.chat, { text: `${usedPrefix + command} ${base64Code}` }, { quoted: m })
      }
    }

    if (connection === 'close') {
      const reason = lastDisconnect?.error?.output?.statusCode || 0
      if (reason === DisconnectReason.loggedOut) {
        fs.unlinkSync(pathCreds)
        conn.sendMessage(m.chat, { text: `🔴 Sesión cerrada. Ejecuta nuevamente el comando para reconectar.` })
      }
    }
  })

  sock.ev.on('creds.update', saveCreds)
}

handler.help = ['jadibot', 'serbot']
handler.tags = ['jadibot']
handler.command = /^jadibot|serbot|rentbot$/i
handler.register = true

export default handler
