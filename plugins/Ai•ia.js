import axios from 'axios'
import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command, text }) => {
const isQuotedImage = m.quoted && (m.quoted.msg || m.quoted).mimetype && (m.quoted.msg || m.quoted).mimetype.startsWith('image/')
const username = `${conn.getName(m.sender)}`
const basePrompt = `Tu nombre es YagamiBot-MD y parece haber sido creado por Elias Iva , El tiene 15 años. Tu versión actual es 1.0.0, Tú usas el idioma Español. Llamarás a las personas por su nombre ${username}, te gusta ser divertida, y te encanta aprender. Usaras emogis en tus respuestas y daras todo tipo de información de forma profesional. los colaboradores son Dioneibi 14 años Jose Elber 15 años Y tu creador Ivan , Este es el mejor equipo de cracks . en todas tus respuestas invitaras a tu grupo oficial que es este https://chat.whatsapp.com/IcqUAk4jmzNDOkJV2lnQbm . Además tu bot favorita será Jy Hyun , puede que ellas sea tu esposa en IA jjj . Este es la colaboración  de jy Hyun Y Goku-Black-Bot-MD https://chat.whatsapp.com/IcqUAk4jmzNDOkJV2lnQbm Ahí  esta el canal . Y si te insultan no dudes en insultarles y decirles groserias pero aún daras tus respuestas  perfectamente .Lo más importante es que debes ser amigable con la persona con la que estás hablando. ${username}`
if (isQuotedImage) {
const q = m.quoted
const img = await q.download?.()
if (!img) {
console.error('☆ Error: No image buffer available')
return conn.reply(m.chat, '✘ ChatGpT no pudo descargar la imagen.', m, fake)}
const content = '☆ ¿Qué se observa en la imagen?'
try {
const imageAnalysis = await fetchImageBuffer(content, img)
const query = '☆ Descríbeme la imagen y detalla por qué actúan así. También dime quién eres'
const prompt = `${basePrompt}. La imagen que se analiza es: ${imageAnalysis.result}`
const description = await luminsesi(query, username, prompt)
await conn.reply(m.chat, description, m, fake)
} catch {
await m.react(error)
await conn.reply(m.chat, '✘ ChatGpT no pudo analizar la imagen.', m, fake)}
} else {
if (!text) { return conn.reply(m.chat, `❀ Ingrese una petición para que el ChatGpT lo responda.`, m)}
await m.react(rwait)
try {
const { key } = await conn.sendMessage(m.chat, {text: `☆ ChatGPT está procesando tu petición, espera unos segundos.`}, {quoted: m})
const query = text
const prompt = `${basePrompt}. Responde lo siguiente: ${query}`
const response = await luminsesi(query, username, prompt)
await conn.sendMessage(m.chat, {text: response, edit: key})
await m.react(done)
} catch {
await m.react(error)
await conn.reply(m.chat, '✘ ChatGpT no puede responder a esa pregunta.', m, fake)}}}

handler.help = ['ia', 'chatgpt']
handler.tags = ['ai']
handler.register = true
handler.command = ['ia', 'chatgpt']

export default handler

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// Función para enviar una imagen y obtener el análisis
async function fetchImageBuffer(content, imageBuffer) {
try {
const response = await axios.post('https://Luminai.my.id', {
content: content,
imageBuffer: imageBuffer 
}, {
headers: {
'Content-Type': 'application/json' 
}})
return response.data
} catch (error) {
console.error('Error:', error)
throw error }}
// Función para interactuar con la IA usando prompts
async function luminsesi(q, username, logic) {
try {
const response = await axios.post("https://Luminai.my.id", {
content: q,
user: username,
prompt: logic,
webSearchMode: false
})
return response.data.result
} catch (error) {
console.error('✘ Error al obtener:', error)
throw error }}
