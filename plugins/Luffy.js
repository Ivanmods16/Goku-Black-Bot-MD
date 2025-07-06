import fetch from 'node-fetch';

const FLAGS = {
  'España': '🇪🇸',
  'Argentina': '🇦🇷',
  'México': '🇲🇽',
  'Venezuela': '🇻🇪',
  'Colombia': '🇨🇴',
  'Chile': '🇨🇱',
  'Perú': '🇵🇪',
  'Paraguay': '🇵🇾',
  'Uruguay': '🇺🇾',
  'Bolivia': '🇧🇴',
  'Ecuador': '🇪🇨',
  'Brasil': '🇧🇷',
  'Estados Unidos': '🇺🇸',
  // Código en desarrollo 
};

let handler = async (m, { conn, text, usedPrefix, command, args, mentions }) => {
  let number = text;

  if (m.mentionedJid && m.mentionedJid.length > 0) {
    let mentioned = m.mentionedJid[0];
    number = mentioned.replace(/[^\d]/g, '');
    if (number.startsWith('0')) number = number.slice(1);
    if (number.length < 8) return m.reply('No se pudo extraer el número del usuario mencionado.');
  }

  if (!number) 
    return m.reply(`Envía el número o menciona a un usuario.\nEjemplo: ${usedPrefix + command} 34613288116`);

  try {
    const url = `https://delirius-apiofc.vercel.app/tools/country?text=${encodeURIComponent(number)}`;
    const res = await fetch(url);
    const data = await res.json();
    if (!data.status || !data.result) return m.reply('No se pudo identificar el país.');
    const flag = FLAGS[data.result] || '';
    let nameMention = '';
    if (m.mentionedJid && m.mentionedJid.length > 0) {
      nameMention = `@${number}`;
    }
    await conn.sendMessage(
      m.chat, 
      { 
        text: `${flag ? flag + ' ' : ''}El país es: ${data.result} ${nameMention}`.trim(),
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