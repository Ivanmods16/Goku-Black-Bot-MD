import fetch from 'node-fetch';

let handler = async (m, { conn, args, command, text }) => {
  if (!text) return m.reply('Ingresa un link de YouTube.');
  m.react("⏳");

  const API_KEY = 'russellxz';
  const URL = encodeURIComponent(text);

  let link, title, thumb, channel, resolution = 'Desconocida', timestamp = '', ago = '', videoId = '';

  try {
    let type = command.includes('mp4') ? 'video' : 'audio';
    let quality = type === 'audio' ? '128kbps' : '480p';

    if (type === 'audio') {
      try {
        let resDC = await fetch(`https://dark-core-api.vercel.app/api/download/YTMP3?key=api&url=${text}`);
        let jsonDC = await resDC.json();

        if (!jsonDC?.result?.url) throw new Error('Fallo dark-core');

        link = jsonDC.result.url;
        title = jsonDC.result.title || 'Descarga';
        thumb = jsonDC.result.thumbnail;
        channel = jsonDC.result.channel || 'Desconocido';
        resolution = '128kbps';
        timestamp = jsonDC.result.duration || 'Desconocido';
        ago = jsonDC.result.published || 'Desconocido';
        videoId = jsonDC.result.id || '';
      } catch (e1) {
        let resSyl = await fetch(`https://api.sylphy.xyz/download/ytmp3?url=${text}&apikey=sylph-30fc019324`);
        let jsonSyl = await resSyl.json();

        if (!jsonSyl?.result?.url) throw new Error('Fallo ytmp3');

        link = jsonSyl.result.url;
        title = jsonSyl.result.title || 'Descarga';
        thumb = jsonSyl.result.thumbnail;
        channel = jsonSyl.result.channel || 'Desconocido';
        resolution = '128kbps';
        timestamp = jsonSyl.result.duration || 'Desconocido';
        ago = jsonSyl.result.published || 'Desconocido';
        videoId = jsonSyl.result.id || '';
      }
    } else {
      let res = await fetch(`https://api.neoxr.eu/api/youtube?url=${URL}&type=video&quality=${quality}&apikey=${API_KEY}`);
      let json = await res.json();

      if (!json?.data?.url) throw new Error('Fallo neoxr');

      link = json.data.url;
      title = json.data.title || 'Descarga';
      thumb = json.data.thumbnail;
      channel = json.data.channel || 'Desconocido';
      resolution = json.data.quality || quality;
      timestamp = json.data.duration || 'Desconocido';
      ago = json.data.published || 'Desconocido';
      videoId = json.data.id || '';
    }
  } catch (e) {
    m.react("❌");
    return m.reply('❌ No se pudo procesar tu solicitud. Verifica el enlace o intenta más tarde.');
  }

  let tipo = command.includes('mp4') ? 'video' : 'audio';
  let icono = tipo === 'audio' ? '🎧' : '🎞️';
  let mensaje = `${icono} Descargando ${tipo}: *${title}*`;

  await conn.sendMessage(m.chat, { text: mensaje }, { quoted: m });

  if (command === 'ytmp3') {
    await conn.sendMessage(m.chat, {
      audio: { url: link },
      mimetype: 'audio/mpeg',
      fileName: `${title}.mp3`,
      ptt: false
    }, { quoted: m });
  } else {
    await conn.sendMessage(m.chat, {
      document: { url: link },
      fileName: `${title}.${tipo === 'audio' ? 'mp3' : 'mp4'}`,
      mimetype: tipo === 'audio' ? 'audio/mpeg' : 'video/mp4',
      caption: `Tu ${tipo} está listo.`
    }, { quoted: m });
  }

  m.react("✅");
};

handler.command = ['ytmp4doc', 'ytmp3doc', 'ytmp3'];
handler.register = true;
handler.tags = ['downloader'];
handler.help = ['ytmp4doc <link>', 'ytmp3doc <link>', 'ytmp3 <link>'];

export default handler;
