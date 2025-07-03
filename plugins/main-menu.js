import sharp from "sharp";
import { promises as fs } from 'fs';
import moment from "moment-timezone";

const imgPath = "./src/catalogo.jpg";
const pdfPath = "./src/catalogo.pdf";

let handler = async (m, { conn }) => {
    try {
        if (typeof m.react === "function") {
            await m.react("🌟");
        }

        let imgBuffer = await fs.readFile(imgPath);
        await sharp(imgBuffer)
            .resize(900)
            .jpeg()
            .toFile('./src/catalogo.jpg');
        await sharp('./src/catalogo.jpg')
            .pdf()
            .toFile(pdfPath);

        let pdfBuffer = await fs.readFile(pdfPath);

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

        let saludo = ucapan();
        let txt = `🌟 ${saludo}, @${m.sender.split("@")[0]} !\n\n${menuText}`;
        let mention = [m.sender];

        await conn.sendMessage(
            m.chat,
            {
                document: pdfBuffer,
                fileName: "MENU-LUFFY-BOT.pdf",
                mimetype: "application/pdf",
                jpegThumbnail: imgBuffer,
                contextInfo: {
                    mentionedJid: mention,
                    externalAdReply: {
                        title: "Luffy-Bot",
                        body: "Menú PDF",
                        thumbnail: imgBuffer,
                        sourceUrl: "https://github.com/Ivanmods16/Goku-Black-Bot-MD",
                        mediaType: 1,
                        renderLargerThumbnail: true,
                    },
                }
            },
            { quoted: m }
        );

        await conn.sendMessage(m.chat, { text: txt, mentions: mention }, { quoted: m });

        await fs.unlink('./src/catalogo.jpg');

    } catch (e) {
        let txt = `🌟 ${ucapan()}, @${m.sender.split("@")[0]} !\n\nComandos disponibles:\n\n○ play\n○ sticker\n○ tiktok\n○ fb\n○ ig\n○ kick\n○ promote\n○ depromote`;
        conn.reply(m.chat, txt, m, { mentions: [m.sender] });
        conn.reply(m.chat, "❎ Error al mostrar el menú principal (PDF): " + e, m);
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