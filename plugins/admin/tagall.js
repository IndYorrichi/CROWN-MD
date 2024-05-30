exports.run = {
   usage: ['tlm'],
   hidden: ['tagall'],
   use: 'texte (facultatif)',
   category: 'admin tools',
   async: async (m, {
      client,
      text,
      participants,
      Func
   }) => {
      try {
         let member = participants.map(v => v.id)
         let readmore = String.fromCharCode(8206).repeat(4001)
         let message = (!text) ? 'Bonjour à tous, ldministrateur vous mentionne dans ' + await (await client.groupMetadata(m.chat)).subject + ' group.' : text
         client.reply(m.chat, `乂  *TOUT LE MONDE*\n\n*“${message}”*\n${readmore}\n${member.map(v => '◦  @' + v.replace(/@.+/, '')).join('\n')}`, m)
      } catch (e) {
         console.log(e)
         return client.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   admin: true,
   group: true
}