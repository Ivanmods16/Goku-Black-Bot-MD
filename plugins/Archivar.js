//Codigo Creado Por José Elber
//Testeado por ivan

let handler = async (m, { conn }) => {
conn.chatArchive(m.chat, true)
conn.reply(m.chat, '🚩 Chat archivado correctamente. Puedes encontrarlo en la sección de chats archivados.', m)
}

handler.help = ['archive']
handler.tags = ['owner']
handler.command = ['archive']
handler.owner = true

export default handler
