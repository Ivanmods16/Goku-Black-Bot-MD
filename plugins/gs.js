import axios from 'axios';
import fs from 'fs';
import fetch from 'node-fetch';

const handler = async (m, { conn, args, usedPrefix, command }) => {
  const url = args[0];

  if (!url) {
    return m.reply(`❌ Por favor proporciona un enlace de YouTube.\n\n*Uso:* ${usedPrefix + command} <link>`);
  }

  if (!url.includes('youtu')) {
    return m.reply('❌ Ese no parece un enlace válido de YouTube.');
  }

  try {
    m.reply('⏳ Procesando video, espera un momento...');

    const api = `https://gokublack.xyz/download/ytmp4?url=${encodeURIComponent(url)}`;
    const { data } = await axios.get(api);

    if (data.status !== 'ok' || !data.url) {
      return m.reply('❌ No se pudo descargar el video. Intenta con otro enlace.');
    }

    const title = data.title || 'video';
    const videoUrl = data.url;

    // Validar tamaño antes de enviar (opcional)
    const head = await fetch(videoUrl, { method: 'HEAD' });
    const fileSizeMB = Number(head.headers.get('content-length')) / (1024 * 1024);

    if (fileSizeMB > 100) {
      return m.reply(`❌ El video es muy pesado (${fileSizeMB.toFixed(2)} MB). WhatsApp permite máximo ~100 MB.`);
    }

    await conn.sendMessage(m.chat, {
      video: { url: videoUrl },
      caption: `✅ *${title}*`,
    }, { quoted: m });

  } catch (err) {
    console.error(err);
    m.reply('❌ Ocurrió un error al procesar el video.');
  }
};

handler.command = ['ytmp4'];
handler.help = ['ytmp4 <url>'];
handler.tags = ['downloader'];
handler.limit = false; // o true si usas sistema de límite

export default handler;
