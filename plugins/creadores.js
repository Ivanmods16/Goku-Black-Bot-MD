const handler = async (m, {conn}) => {
  m.reply(global.creador);
};
handler.command = /^(creadores|creador)$/i;
export default handler;
handler.admin = true
handler.group = true
handler.botAdmin = true

global.creador = `
* ESTOS SON LOS NUMEROS DE MIS CREADORES
+1 (829) 218-4151
+1 (504) 209-8808
`;
