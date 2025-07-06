import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply(`Envía el número para buscar el país.\nEjemplo: ${usedPrefix + command} 34613288116`);
  try {
    const url = `https://delirius-apiofc.vercel.app/tools/country?text=${encodeURIComponent(text)}`;
    const res = await fetch(url);
    const data = await res.json();
    if (!data.status || !data.result) return m.reply('No se pudo identificar el país.');
    await conn.sendMessage(m.chat, { text: `El país es: ${data.result}` }, { quoted: m });
    if (typeof m.react === 'function') m.react('✅');
  } catch {
    await m.reply('Error al consultar la API.');
  }
};

handler.command = ['pais', 'infocountry'];
handler.tags = ['utilidad'];
handler.limit = 3;

export default handler;