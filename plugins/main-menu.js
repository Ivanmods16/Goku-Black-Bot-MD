let handler = async (m, { conn, args }) => {
    let userId = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
    let name = conn.getName(userId)
    let _uptime = process.uptime() * 1000
    let uptime = clockString(_uptime)
    let totalreg = Object.keys(global.db.data.users).length

    let txt = `
Comandos simples. Bot en desarrollo.

Hola! Soy *${botname}* (｡•̀ᴗ-)✧
Aquí tienes la lista de comandos principales:
╭┈ ↷
│ᰔᩚ Cliente » @${userId.split('@')[0]}
│❀ Modo » Público
│ⴵ Activada » ${uptime}
│✰ Usuarios » ${totalreg}
╰─────────────────

• :･ﾟ⊹˚• \`『 DESCARGAS 』\` •˚⊹:･ﾟ•
ᰔᩚ *#play* 
> Descarga música de YouTube.
ᰔᩚ *#tiktok*
> Descarga videos de TikTok.
ᰔᩚ *#fb*
> Descarga videos de Facebook.
ᰔᩚ *#ig*
> Descarga contenido de Instagram.

• :･ﾟ⊹˚• \`『 STICKERS 』\` •˚⊹:･ﾟ•
ᰔᩚ *#sticker* 
> Crea un sticker de imagen o video.

• :･ﾟ⊹˚• \`『 GRUPOS 』\` •˚⊹:･ﾟ•
ᰔᩚ *#kick* [número/mención]
> Elimina un usuario del grupo.
ᰔᩚ *#promote* [mención]
> Dar admin a un usuario.
ᰔᩚ *#depromote* [mención]
> Quitar admin a un usuario.
`.trim()

    await conn.sendMessage(m.chat, { 
        text: txt,
        contextInfo: {
            mentionedJid: [m.sender, userId],
            isForwarded: true,
            externalAdReply: {
                title: botname,
                body: textbot,
                thumbnailUrl: banner,
                sourceUrl: redes,
                mediaType: 1,
                showAdAttribution: true,
                renderLargerThumbnail: true,
            },
        },
    }, { quoted: m })
}

handler.help = ['menu']
handler.tags = ['main']
handler.command = ['menu', 'menú', 'help']

export default handler

function clockString(ms) {
    let seconds = Math.floor((ms / 1000) % 60)
    let minutes = Math.floor((ms / (1000 * 60)) % 60)
    let hours = Math.floor((ms / (1000 * 60 * 60)) % 24)
    return `${hours}h ${minutes}m ${seconds}s`
}