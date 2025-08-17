var handler = async (m, { conn, usedPrefix, command, args, isOwner, isAdmin, isROwner }) => {
  let isEnable = /true|enable|(turn)?on|1/i.test(command)
  let chat = global.db.data.chats[m.chat]
  let bot = global.db.data.settings[conn.user.jid] || {}
  let type = (args[0] || '').toLowerCase()
  let isAll = false

  switch (type) {
    case 'simsimi':
    case 'simi':
      if (m.isGroup && !(isAdmin || isOwner)) {
        global.dfail('admin', m, conn)
        throw false
      }
      chat.simi = isEnable
      break

    case 'detect':
      if (!m.isGroup || !(isAdmin || isOwner)) {
        global.dfail('admin', m, conn)
        throw false
      }
      chat.detect = isEnable
      break

    case 'modoadmin':
      if (m.isGroup && !(isAdmin || isOwner)) {
        global.dfail('admin', m, conn)
        throw false
      }
      chat.modoadmin = isEnable
      break

    case 'antisticker':
      if (m.isGroup && !(isAdmin || isOwner)) {
        global.dfail('admin', m, conn)
        throw false
      }
      chat.antiSticker = isEnable
      break

    case 'autosticker':
      if (m.isGroup && !(isAdmin || isOwner)) {
        global.dfail('admin', m, conn)
        throw false
      }
      chat.autosticker = isEnable
      break

    case 'antibule':
      if (m.isGroup && !(isAdmin || isOwner)) {
        global.dfail('admin', m, conn)
        throw false
      }
      chat.antibule = !isEnable
      break

    case 'nsfw':
    case '+18':
      if (m.isGroup && !(isAdmin || isOwner)) {
        global.dfail('admin', m, conn)
        throw false
      }
      chat.nsfw = isEnable
      break

    case 'restrict':
      isAll = true
      if (!isOwner) {
        global.dfail('owner', m, conn)
        throw false
      }
      bot.restrict = isEnable
      break

    case 'public':
      isAll = true
      if (!isROwner) {
        global.dfail('rowner', m, conn)
        throw false
      }
      global.opts['self'] = !isEnable
      break

    case 'pconly':
      isAll = true
      if (!isROwner) {
        global.dfail('rowner', m, conn)
        throw false
      }
      global.opts['pconly'] = isEnable
      break

    case 'gconly':
      isAll = true
      if (!isROwner) {
        global.dfail('rowner', m, conn)
        throw false
      }
      global.opts['gconly'] = isEnable
      break

    case 'autoread':
      isAll = true
      if (!isROwner) {
        global.dfail('rowner', m, conn)
        throw false
      }
      global.opts['autoread'] = isEnable
      break

    case 'modejadibot':
      isAll = true
      if (!isROwner) {
        global.dfail('rowner', m, conn)
        throw false
      }
      bot.modejadibot = isEnable
      break

    case 'status':
      isAll = true
      if (!isROwner) {
        global.dfail('rowner', m, conn)
        throw false
      }
      bot.autobio = isEnable
      break

    default:
      if (!/[01]/.test(command)) return await conn.reply(m.chat, `*🧃 OPCIONES PARA GRUPO*

_${usedPrefix + command} *nsfw*_
_${usedPrefix + command} *simi*_
_${usedPrefix + command} *detect*_
_${usedPrefix + command} *modoadmin*_
_${usedPrefix + command} *antisticker*_
_${usedPrefix + command} *autosticker*_
_${usedPrefix + command} *antibule*_

*🍧 OPCIONES DE PROPIETARIO*

_${usedPrefix + command} *restrict*_
_${usedPrefix + command} *public*_
_${usedPrefix + command} *pconly*_
_${usedPrefix + command} *gconly*_
_${usedPrefix + command} *autoread*_
_${usedPrefix + command} *modejadibot*_
_${usedPrefix + command} *status*_`, m)
      throw false
  }

  conn.sendMessage(m.chat, {
    text: `*◇ OPCIÓN:* ${type}\n*◇ ESTADO:* ${isEnable ? 'ACTIVADO' : 'DESACTIVADO'}\n*◇ PARA:* ${isAll ? 'ESTE BOT' : 'ESTE CHAT'}`
  }, { quoted: m })
}

handler.help = ['en', 'dis'].map(v => v + 'able')
handler.tags = ['nable', 'owner']
handler.command = /^((en|dis)able|(tru|fals)e|(turn)?o(n|ff)|[01])$/i

export default handler
