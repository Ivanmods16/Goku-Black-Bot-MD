import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply(`Escribe tu pregunta.\nEjemplo: ${usedPrefix + command} ¿Quién es el presidente de Venezuela?`);
  try {
    const url = `https://api.dorratz.com/ai/gpt?prompt=${encodeURIComponent(text)}?country=venezuela`;
    const res = await fetch(url);
    const data = await res.json();
    let respuesta = data.result || 'No se obtuvo una respuesta válida.';
    await conn.sendMessage(m.chat, { text: respuesta }, { quoted: m });
    if (typeof m.react === 'function') m.react('✅');
  } catch {
    await m.reply('Error al consultar la API.');
  }
};

handler.help = ['luffy <texto>'];
handler.tags = ['ai'];
handler.command = ['luffy'];
handler.limit = 5;

export default handler;