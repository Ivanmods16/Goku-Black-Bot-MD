import sharp from "sharp";
import { promises as fs } from 'fs';
import moment from "moment-timezone";

const imgPath = "./src/catalogo.jpg";

let handler = async (m, { conn }) => {
    try {
        if (typeof m.react === "function") {
            await m.react("🍂");
        }

        let menuText = `
Comandos disponibles:

• play
• sticker
• tiktok
• fb
• ig
• kick
• promote
• depromote
        `.trim();

        let saludo = ucapan();
        let txt = `🍄 ${saludo}, @${m.sender.split("@")[0]} !\n\n${menuText}`;
        let mention = [m.sender];

        let imager = await sharp(imgPath)
            .resize(400, 400)
            .jpeg()
            .toBuffer();

        let img = await fs.readFile(imgPath);

        await conn.sendMessage(
            m.chat,
            {
                image: img,
                caption: txt,
                jpegThumbnail: imager,
                contextInfo: {
                    mentionedJid: mention,
                    externalAdReply: {
                        title: "Luffy-Bot",
                        body: "Menú simple",
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
        let txt = `🍄 ${ucapan()}, @${m.sender.split("@")[0]} !\n\nComandos disponibles:\n\n• play\n• sticker\n• tiktok\n• fb\n• ig\n• kick\n• promote\n• depromote`;
        conn.reply(m.chat, txt, m, { mentions: [m.sender] });
        conn.reply(m.chat, "❎ Error al mostrar el menú principal: " + e, m);
    }
};

handler.command = ["menu", "help", "menú", "commands", "comandos", "?"];
export default handler;

function ucapan() {
    const time = moment.tz("America/Los_Angeles").format("HH");
    if (time >= 18) return "Good night.";
    if (time >= 15) return "Good afternoon.";
    if (time >= 10) return "Good afternoon.";
    if (time >= 4) return "Good morning.";
    return "Hello.";
}