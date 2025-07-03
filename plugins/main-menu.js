import { promises as fs } from 'fs';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

const imgPath = "./src/catalogo.jpg";

let handler = async (m, { conn }) => {
    try {
        if (typeof m.react === "function") {
            await m.react("🍂");
        }

        const user = db.data.users[m.sender] || {};
        const registrado = user.registered ? "Sí" : "No";
        const exp = user.exp || 0;
        const level = user.level || 0;
        const yenes = user.yenes || 0;

        const comandos = [
            "sticker", "tiktok", "ig", "fb", "play",
            "promote", "demote", "kick"
        ].map(cmd => `• ${cmd}`).join('\n');

        const info = 
`👤 Usuario: @${m.sender.split('@')[0]}
📋 Registrado: ${registrado}
🏅 Nivel: ${level}
✨ Exp: ${exp}
💴 Yenes: ${yenes}

📖 Comandos disponibles:
${comandos}
`;

        let img = await fs.readFile(imgPath);

        const pdfDoc = await PDFDocument.create();
        const jpgImage = await pdfDoc.embedJpg(img);
        const page = pdfDoc.addPage([jpgImage.width, jpgImage.height + 200]);

        page.drawImage(jpgImage, {
            x: 0,
            y: 200,
            width: jpgImage.width,
            height: jpgImage.height,
        });

        const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
        page.drawText(info, {
            x: 30,
            y: 120,
            size: 18,
            font,
            color: rgb(0, 0, 0),
            maxWidth: jpgImage.width - 60,
            lineHeight: 24
        });

        const pdfBytes = await pdfDoc.save();

        await conn.sendMessage(
            m.chat,
            {
                document: Buffer.from(pdfBytes),
                mimetype: 'application/pdf',
                fileName: 'menu.pdf',
                caption: 'Menú en PDF con información de usuario'
            },
            { quoted: m }
        );
    } catch (e) {
        conn.reply(m.chat, "❎ Error al mostrar el menú en PDF: " + e, m);
    }
};

handler.command = ["menu", "help", "menú", "commands", "comandos", "?"];
export default handler;