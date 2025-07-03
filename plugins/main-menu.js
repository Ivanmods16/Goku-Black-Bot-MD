import sharp from "sharp";
import { promises as fs } from 'fs';
import moment from "moment-timezone";

const docPath = "./src/catalogo.jpg";
const imgPath = "./src/catalogo.jpg";

let handler = async (m, { conn, usedPrefix }) => {
    try {
        m.react && m.react("🍂");
        let name = await conn.getName(m.sender);

        global.menutext = `
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

        let cap = global.menutext;
        let txt = `🍄 ${ucapan()}, @${m.sender.split("@")[0]} !\n\n${cap}`;
        let mention = conn.parseMention ? conn.parseMention(txt) : [];

        let imager = await sharp(docPath)
            .resize(400, 400)
            .jpeg()
            .toBuffer();

        let img = await fs.readFile(imgPath);

        await conn.sendMessage(
            m.chat,
            {
                document: img,
                fileName: "Luffy-Bot.png",
                mimetype: "image/png",
                caption: txt,
                fileLength: 1900,
                jpegThumbnail: imager,
                contextInfo: {
                    mentionedJid: mention,
                    isForwarded: true,
                    forwardingScore: 999,
                    externalAdReply: {
                        title: "",
                        body: `あ ${global.w(m.chat, "❎ Error al mostrar el menú principal : " + e, m);
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

global.wm = global.wm || "Luffy-Bot";
global.repositorio = global.repositorio || "https://github.com/Luffy-Bot";
global.footer = global.footer || "Luffy-Bot • Menú";