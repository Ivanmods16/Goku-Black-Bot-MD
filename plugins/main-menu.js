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

        let saludo = ucapan();
        let txt = `🌟 ${saludo}, @${m.sender.split("@")[0]} !\n\n${menuText}`;
        let mention = [m.sender];

        await conn.sendMessage(
            m.chat,
            {
                image: img,
                caption: txt,
                mentions: mention,
                contextInfo: {
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
        let txt = `🌟 ${ucapan()}, @${m.sender.split("@")[0]} !\n\nComandos disponibles:\n\n○ play\n○ sticker\n○ tiktok\n○ fb\n○ ig\n○ kick\n○ promote\n○ depromote`;
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