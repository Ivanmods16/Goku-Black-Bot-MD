import { promises as fs } from 'fs';
import moment from "moment-timezone";

const imgPath = "./src/catalogo.jpg";

let handler = async (m, { conn }) => {
    try {
        if (typeof m.react === "function") await m.react("🌟");

        const botname = typeof global.botname !== "undefined" ? global.botname : "Luffy-Bot";
        const userId = m.sender;
        const uptime = clockString(process.uptime() * 1000);
        const totalreg = global.db && global.db.data && global.db.data.users ? Object.keys(global.db.data.users).length : "N/A";
        const totalCommands = typeof global.plugins === "object" ? Object.keys(global.plugins).length : "N/A";

        let img = await fs.readFile(imgPath);

        let menuText = `
¡Hola! Soy *${botname}*

ᰔᩚ Cliente: @${userId.split('@')[0]}
✦ Modo: Público
ⴵ Activa: ${uptime}
✰ Usuarios: ${totalreg}
✧ Comandos: ${totalCommands}
🜸 Baileys: Multi Device

Comandos disponibles:
✰ play
✰ sticker
✰ tiktok
✰ fb
✰ ig
✰ kick
✰ promote
✰ depromote
`.trim();

        await conn.sendMessage(
            m.chat,
            {
                image: img,
                caption: menuText,
                mentions: [userId],
                contextInfo: {
                    externalAdReply: {
                        title: botname,
                        body: saludo(),
                        thumbnail: img,
                        sourceUrl: "https://github.com/Ivanmods16/Goku-Black-Bot-MD",
                        mediaType: 1,
                        renderLargerThumbnail: true,
                    },
                }
            },
            { quoted: m }
        );
    } catch (e) {
        conn.reply(m.chat, "❎ Error al mostrar el menú principal: " + e, m);
    }
};

handler.command = ["menu", "help", "menú", "commands", "comandos", "?"];
export default handler;

function saludo() {
    const hora = moment.tz("America/Los_Angeles").format("HH");
    if (hora >= 18) return "Buenas noches.";
    if (hora >= 12) return "Buenas tardes.";
    if (hora >= 6) return "Buenos días.";
    return "Hola.";
}

function clockString(ms) {
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000);
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':');
}