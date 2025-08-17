const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `ingrese el prefijo que quieres\n\nej: ${usedPrefix + command} #`;

  let escapedPrefix = text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  global.prefix = new RegExp('^' + escapedPrefix);

  await m.reply(`*Se actualizo el prefijo:* [ ${text} ]`);
};

handler.help = ['setprefix'].map((v) => v + ' [prefijo]');
handler.tags = ['owner'];
handler.command = /^(setprefix)$/i;

export default handler;