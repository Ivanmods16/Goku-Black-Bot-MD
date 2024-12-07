//COMANDO EN PROCESO 
// TIKTOK STALK
// CODIGO CREADO POR JOSE XRL
import fetch from 'node-fetch'

let handler = async (m, { conn, text }) => {
    if (!text) return m.reply(`Ingresa el nombre de usuario de TikTok`)

    try {

        let api = await fetch(`https://deliriussapi-oficial.vercel.app/tools/tiktokstalk?q=${encodeURIComponent(text)}`)
        let json = await api.json()

        if (!json || json.length === 0 || !json.meta) {
            return m.reply(`No se encontraron resultados para: ${text}`)
        }

        let userData = json.meta; // Suponiendo que `meta` contiene la información del usuario
        let { username, nickname, bio, following, followers, likes, videos } = userData;

        let JT = `*Nombre de Usuario:* ${username}\n`;
        JT += `*NickName:* ${nickname}\n`;
        JT += `*Biografía:* ${bio}\n`;
        JT += `*Siguiendo:* ${following}\n`;
        JT += `*Seguidores:* ${followers}\n`;
        JT += `*Likes Totales:* ${likes}\n`;
        JT += `*Total de Videos:* ${videos}\n`;

        // Envío de la información del usuario al chat
        await conn.sendMessage(m.chat, JT, m)
    } catch (error) {
        console.error(error)
        m.reply(`Ocurrió un error al buscar en TikTok. Inténtalo nuevamente más tarde.`)
    }
}

handler.command = /^(tiktokstalk)$/i

export default handler
