import fetch from 'node-fetch';

function getFlag(code = '') {
  if (!code) return '';
  // Convierte código país a bandera (por ejemplo, "ES" => 🇪🇸)
  return code
    .toUpperCase()
    .replace(/./g, char => 
      String.fromCodePoint(127397 + char.charCodeAt())
    );
}

let handler = async (m, { conn, text, usedPrefix, command }) => {
  let number = text;
  if (m.mentionedJid && m.mentionedJid.length > 0) {
    number = m.mentionedJid[0].replace(/\D/g, '');
  }
  if (!number) 
    return m.reply(`Envía el número o menciona a un usuario.\nEjemplo: ${usedPrefix + command} 34613288116`);

  try {
    const url = `https://delirius-apiofc.vercel.app/tools/country?text=${encodeURIComponent(number)}`;
    const res = await fetch(url);
    const data = await res.json();
    if (!data.status || !data.result || !data.result.country) return m.reply('No se pudo identificar el país.');
    const flag = getFlag(data.result.code);
    let nameMention = '';
    if (m.mentionedJid && m.mentionedJid.length > 0) {
      nameMention = `@${number}`;
    }
    await conn.sendMessage(
      m.chat, 
      { 
        text: `${flag} El país es: ${data.result.country} ${nameMention}`.trim(),
        mentions: m.mentionedJid ? m.mentionedJid : []
      }, 
      { quoted: m }
    );
    if (typeof m.react === 'function') m.react('✅');
  } catch {
    await m.reply('Error al consultar la API.');
  }
};

handler.command = ['pais', 'country'];
handler.tags = ['utilidad'];
handler.limit = 3;

export default handler;