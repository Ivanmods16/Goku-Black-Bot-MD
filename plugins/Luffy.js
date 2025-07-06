import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  let user = global.db.data.users[m.sender];
  let expGanar = 100;
  let expPerder = 0;
  let coinGanar = 20;
  let coinPerder = 15;
  let moneda = global.moneda || '¥enes';

  const opciones = ['piedra', 'papel', 'tijera'];
  const emojis = { piedra: '🪨', papel: '📄', tijera: '✂️' };
  let eleccionUsuario = text?.toLowerCase()?.trim();

  if (!opciones.includes(eleccionUsuario)) {
    let menu = `*Juguemos Piedra, Papel o Tijera*\n\nElige una opción escribiendo:\n${usedPrefix + command} piedra\n${usedPrefix + command} papel\n${usedPrefix + command} tijera\n\n¡O toca un botón!`;
    return await conn.sendMessage(
      m.chat,
      {
        text: menu,
        buttons: [
          { buttonId: `${usedPrefix + command} piedra`, buttonText: { displayText: `${emojis.piedra} Piedra` } },
          { buttonId: `${usedPrefix + command} papel`, buttonText: { displayText: `${emojis.papel} Papel` } },
          { buttonId: `${usedPrefix + command} tijera`, buttonText: { displayText: `${emojis.tijera} Tijera` } },
        ],
        headerType: 1,
      },
      { quoted: m }
    );
  }

  const eleccionBot = opciones[Math.floor(Math.random() * 3)];
  let resultado = '';
  let exp = 0, coin = 0;

  if (eleccionUsuario === eleccionBot) {
    resultado = '¡Empate! 😐';
    exp = 0;
    coin = 0;
  } else if (
    (eleccionUsuario === 'piedra' && eleccionBot === 'tijera') ||
    (eleccionUsuario === 'tijera' && eleccionBot === 'papel') ||
    (eleccionUsuario === 'papel' && eleccionBot === 'piedra')
  ) {
    resultado = '¡Ganaste! 🎉';
    exp = expGanar;
    coin = coinGanar;
    user.exp += expGanar;
    user.coin += coinGanar;
  } else {
    resultado = 'Perdiste 😢';
    exp = expPerder;
    coin = -coinPerder;
    user.coin -= coinPerder;
    if (user.coin < 0) user.coin = 0;
  }

  const body =
    `*Piedra, Papel o Tijera*\n\n` +
    `Tu elección: ${emojis[eleccionUsuario]} *${eleccionUsuario}*\n` +
    `Mi elección: ${emojis[eleccionBot]} *${eleccionBot}*\n\n` +
    `${resultado}\n\n` +
    `✨ *Exp*: ${exp}\n` +
    `💸 *${moneda}*: ${coin > 0 ? '+' : ''}${coin}\n`;

  await conn.sendMessage(
    m.chat,
    {
      text: body,
      buttons: [
        { buttonId: `${usedPrefix + command} piedra`, buttonText: { displayText: `${emojis.piedra} Piedra` } },
        { buttonId: `${usedPrefix + command} papel`, buttonText: { displayText: `${emojis.papel} Papel` } },
        { buttonId: `${usedPrefix + command} tijera`, buttonText: { displayText: `${emojis.tijera} Tijera` } },
      ],
      headerType: 1,
    },
    { quoted: m }
  );

  if (typeof m.react === "function") m.react('✅');
};

handler.command = ['ppt', 'piedrapapeltijera'];
handler.tags = ['juegos'];
handler.limit = 3;
handler.group = false;

export default handler;