import axios from 'axios'

let handler = async (m, { conn, usedPrefix, command, text }) => {
  const username = `${conn.getName(m.sender)}`
  const basePrompt = `Tu nombre es Llama-IA y fuiste creada por ${etiqueta}. Tu versión actual es ${vs}. Usas el idioma Español. Llamarás a las personas por su nombre ${username}, te gusta ser divertida y te encanta aprender. Lo más importante es que debes ser amigable con la persona con la que estás hablando. ${username}`

  if (!text) {
    return conn.reply(m.chat, `${emoji} Ingrese una petición para que Llama-IA lo responda.`, m)
  }

  await m.react(rwait)
  try {
    const { key } = await conn.sendMessage(m.chat, {
      text: `🌱 Llama-IA está procesando tu petición, espera unos segundos.`
    }, { quoted: m })

    const query = `${basePrompt}. Responde lo siguiente: ${text}`
    const response = await llamaIA(query, username)

    await conn.sendMessage(m.chat, { text: response, edit: key })
    await m.react(done)

  } catch (err) {
    console.error(err)
    await m.react(error)
    await conn.reply(m.chat, '✘ Llama-IA no puede responder a esa pregunta.', m)
  }
}

handler.help = ['ia']
handler.tags = ['ai']
handler.register = true
handler.command = ['iallama']
handler.group = true

export default handler

async function llamaIA(text, user) {
  try {
    const url = `https://gokublack.xyz/ai/chatgpt?text=${encodeURIComponent(text)}&user=${encodeURIComponent(user)}`
    const response = await axios.get(url)
    return response.data.result.chat || "✘ No se obtuvo respuesta de Llama-IA."
  } catch (error) {
    console.error('Error llamando a Llama-IA:', error)
    throw error
  }
}