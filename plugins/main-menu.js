import { promises as fs } from 'fs';

const imgPath = "./src/catalogo.jpg";

let handler = async (m, { conn }) => {
    try {
        if (typeof m.react === "function") {
            await m.react("🍂");
        }
        let img = await fs.readFile(imgPath);
        await conn.sendMessage(
            m.chat,
            {
                image: img,
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
        conn.reply(m.chat, "❎ Error al mostrar la imagen del menú: " + e, m);
    }
};

handler.command = ["menu", "help", "menú", "commands", "comandos", "?"];
export default handler;