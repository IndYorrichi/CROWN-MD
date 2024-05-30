exports.run = {
   usage: ['changemenu'],
   use: '(choix)',
   category: 'propriétaire',
   async: async (m, {
      client,
      args,
      isPrefix,
      command,
      setting,
      Func
   }) => {
      try {
         if (!args || !args[0]) return m.reply(Func.example(isPrefix, command, '2'))
         if (!['1','2','3','4','5'].includes(args[0])) return client.reply(m.chat, Func.texted('bold', `🚩 Style non disponible.`), m)
         client.reply(m.chat, `🚩 le menu du bot est défini avec succès à l'aide du style*${args[0]}*.`, m).then(() => setting.style = parseInt(args[0]))
      } catch (e) {
         client.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   owner: true,
   cache: true,
   location: __filename
}