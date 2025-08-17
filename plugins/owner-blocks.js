const handler = async (m, { text, conn, usedPrefix, command }) => {
  const emoji = '⚠️';
  const done = '✅';
  
  const lowerCmd = command.toLowerCase();
  
  if (lowerCmd === 'blocklist' || lowerCmd === 'listblock') {
    try {
      const data = await conn.fetchBlocklist();
      if (!data || !data.length) throw '❌ No hay usuarios bloqueados actualmente.';
      
      let txt = `*≡ Lista de bloqueados*\n\n*Total:* ${data.length}\n\n`;
      txt += data.map((id, i) => `${i + 1}. @${id.split('@')[0]}`).join('\n');
      return conn.reply(m.chat, txt, m, { mentions: data });
    } catch (err) {
      return conn.reply(m.chat, typeof err === 'string' ? err : '⚠️ Error al obtener la lista de bloqueados.', m);
    }
  }

  const who = m.mentionedJid?.[0] 
    || m.quoted?.sender 
    || (text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : null);
  
  const usage = `${emoji} *Uso Incorrecto:*\nEjemplo: *${usedPrefix + command} @usuario*`;
  if (!who) return conn.reply(m.chat, usage, m, { mentions: [m.sender] });

  try {
    if (lowerCmd === 'block' || lowerCmd === 'blok') {
      await conn.updateBlockStatus(who, 'block');
      return conn.reply(m.chat, `${done} *Usuario bloqueado:* @${who.split('@')[0]}`, m, { mentions: [who] });
    } else if (lowerCmd === 'unblock' || lowerCmd === 'unblok') {
      await conn.updateBlockStatus(who, 'unblock');
      return conn.reply(m.chat, `${done} *Usuario desbloqueado:* @${who.split('@')[0]}`, m, { mentions: [who] });
    }
  } catch (e) {
    console.log(e);
    return conn.reply(m.chat, `${emoji} *Error al ejecutar el comando.*`, m);
  }
};

handler.command = ['block', 'blok', 'unblock', 'unblok', 'blocklist', 'listblock'];
handler.mods = true;
handler.rowner = true;

export default handler;
