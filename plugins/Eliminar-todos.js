//Código Creador por José Elber

import fs from 'fs/promises';

const botName = 'Jy Hyun Bot'; // Nombre predeterminado del bot
const authorizedNumber = '51950148255@s.whatsapp.net'; // Asegúrate de que el ID está en el formato correcto
let deletionLimit = 10; // Límite de eliminaciones

let handler = async (m, { conn, args, participants }) => {
    // Verificar si el comando está restringido
    if (!global.db.data.settings[conn.user.jid].restrict) throw '*? EL OWNER TIENE RESTRINGIDO (_enable restrict_ / _disable restrict_) EL USO DE ESTE COMANDO*';

    // Verificación del número autorizado
    if (m.sender !== authorizedNumber) {
        await conn.sendMessage(m.chat, { text: '*El único autorizado para usar este comando es mi creador.*\n> Jose Elber ?' }, { quoted: m });
        return; // Salir de la función si no está autorizado
    }

    const groupNoAdmins = participants.filter(p => !p.admin && p.id);
    const listUsers = groupNoAdmins.slice(0, deletionLimit).map((v) => v.id); // Limitar la cantidad de usuarios a eliminar

    if (listUsers.length === 0) throw '*No hay usuarios para eliminar.*'; // Verifica que haya usuarios para eliminar

    let pesan = args.join` `;
    let text = `*Powered by - ${botName}*`.trim();

    let txt2 = `*Eliminados Exitosamente ??*`;

    let mediaFolder = './src/Menu.jpg';

    try {
        conn.groupUpdateSubject(m.chat, pesan);
    } catch (e) {
        throw '*El título del grupo no puede exceder los 25 caracteres.*';
    }

    await conn.sendMessage(m.chat, { image: { url: mediaFolder }, caption: text, mentions: conn.parseMention(text) }, { quoted: m, ephemeralExpiration: 24 * 60 * 100, disappearingMessagesInChat: 24 * 60 * 100 });

    for (let userId of listUsers) {
        await conn.groupParticipantsUpdate(m.chat, [userId], 'remove');
    }
    m.reply(txt2);
}

handler.help = ['kickall', '-'].map(v => 'o' + v + ' @user');
handler.tags = ['owner'];
handler.command = /^(kickall)$/i;

handler.owner = true;
handler.group = true;
handler.botAdmin = true;

export default handler;
