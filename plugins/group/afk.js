exports.run = {
   usage: ['afk'],
   use: 'raison (facultatif)',
   category: 'group',
   async: async (m, {
      client,
      text,
      Func
   }) => {
      try {
         let user = global.db.users.find(v => v.jid == m.sender)
         user.afk = +new Date
         user.afkReason = text
         user.afkObj = m
         let tag = m.sender.split`@` [0]
         return client.reply(m.chat, Func.texted('bold', `🚩 @${tag} est maintenant AFK!`), m)
      } catch {
         client.reply(m.chat, global.status.error, m)
      }
   },
   error: false,
   group: true
}