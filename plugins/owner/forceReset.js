exports.run = {
   usage: ['reinitialiser'],
   category: 'propriétaire',
   async: async (m, {
      client,
      args,
      command,
      setting,
      env,
      Func
   }) => {
      try {
         global.db.users.filter(v => v.limit < env.limit && !v.premium).map(v => v.limit = args[0] ? args[0] : env.limit)
         setting.lastReset = new Date * 1
         client.reply(m.chat, Func.texted('bold', `🚩 réinitialisation réussie de la limite pour l'utilisateur libre par defaut.`), m)
      } catch (e) {
         return client.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   owner: true,
   cache: true,
   location: __filename
}