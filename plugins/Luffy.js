import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply(`Escribe lo que quieres buscar.\nEjemplo: ${usedPrefix + command} anime alya`);
  try {
    const url = `https://api.dorratz.com/v2/pix-ai?prompt=${encodeURIComponent(text)}`;
    const res = await fetch(url);
    const data = await res.json();
    if (!data.status || !data.result || !data.result.url) return m.reply('No se encontró ninguna imagen.');
    await conn.sendMessage(
      m.chat,
      { image: { url: data.result.url }, caption: `Esto fue encontrado:` },
      { quoted: m }
    );
    if (typeof m.react === 'function') m.react('✅');
  } catch {
    await m.reply('Error al consultar la API.');
  }
};

handler.command = ['pixai', 'pixart'];
handler.tags = ['imagenes', 'ai'];
handler.limit = 3;

export default handler;