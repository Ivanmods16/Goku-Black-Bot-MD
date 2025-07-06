const fetch = require('node-fetch');

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return m.reply('Por favor escribe tu pregunta.\nEjemplo: ' + usedPrefix + command + ' ¿Cuál es la capital de Venezuela?');
  }
  try {
    const url = `https://api.dorratz.com/ai/gpt?prompt=${encodeURIComponent(text)}?country=venezuela`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('No se pudo obtener una respuesta de la API.');
    const data = await response.json();
    const reply = data.result || JSON.stringify(data);
    await conn.sendMessage(m.chat, { text: reply }, { quoted: m });
    if (typeof m.react === "function") m.react('✅');
  } catch (e) {
    await m.reply('Ocurrió un error al consultar la API.');
  }
};

handler.command = ['pregunta', 'gptvenezuela'];
handler.tags = ['ai', 'chatgpt'];
handler.limit = 5;
handler.group = false;

module.exports = handler;