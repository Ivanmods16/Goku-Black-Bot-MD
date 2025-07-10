import fetch from 'node-fetch'
import { creatHash} from 'crypto'
let handler = async (m, { conn, usedPrefix, command }) => {
    if (!m.isGroup) throw 'Este comando solo funciona en grupos.'
    if (!m.quoted) throw 'Por favor, menciona a alguien o envía un mensaje para saludar.'
  let user = global.db.data.users[m.sender]
  let name = conn.getName(m.sender)
  let greeting = `Hola ${name}, ¿cómo estás? REGISTRATE para disfrutar de más funciones.\n\n ejemplo: ${usedPrefix}reg name.edad`
  
  if (user.registered === false) {
    greeting += `\n\nPor favor, regístrate usando el comando: ${usedPrefix}register`
  } else {
    greeting += `\n\n¡Espero que tengas un gran día!`
  }
  
  conn.reply(m.chat, greeting, m)
handler.help = ['hola']
handler.tags = ['greet']
handler.command = /^(hola)$/i
handler.register = true
export default handler;
