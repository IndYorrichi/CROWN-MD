exports.run = {
   usage: ['group'],
   use: 'ouvrir / fermer',
   category: 'admin tools',
   async: async (m, {
      client,
      args,
      isPrefix,
      command,
      Func
   }) => {
      if (!args || !args[0]) return client.reply(m.chat, Func.texted('bold', `🚩 Entrez l'argument fermer ou ouvrir.`), m)
      if (args[0] == 'ouvrir') {
         await client.groupSettingUpdate(m.chat, 'not_announcement')
      } else if (args[0] == 'fermer') {
         await client.groupSettingUpdate(m.chat, 'announcement')
      }
   },
   group: true,
   admin: true,
   botAdmin: true
}