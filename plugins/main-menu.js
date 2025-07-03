import { promises as fs } from 'fs';
import moment from "moment-timezone";

const imgPath = "./src/catalogo.jpg";

let handler = async (m, { conn }) => {
    try {
        if (typeof m.react === "function") {
            await m.react("🌟");
        }

        let img = await fs.readFile(imgPath);

        let menuText = `
Comandos disponibles:

○ 𝚙𝚕𝚊𝚢
○ 𝚜𝚝𝚒𝚌𝚔𝚎𝚛
○ 𝚝𝚒𝚔𝚝𝚘𝚔
○ 𝚏𝚋
○ 𝚒𝚐
○ 𝚔𝚒𝚌𝚔
○ 𝚙𝚛𝚘𝚖𝚘𝚝𝚎
○ 𝚍𝚎𝚙𝚛𝚘𝚖𝚘𝚝𝚎
        `.trim();

        await conn.sendMessage(
            m.chat,
            {
                image: img,
                caption: menuText,
                contextInfo: {
                    externalAdReply: {
                        title: "Luffy-Bot",
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