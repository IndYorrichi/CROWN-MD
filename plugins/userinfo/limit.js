exports.run = {
   usage: ['limite'],
   category: 'informations utilisateur',
   async: async (m, {
      client,
      isPrefix,
      Func
   }) => {
      let user = global.db.users.find(v => v.jid == m.sender)
      if (user.limit < 1) return client.reply(m.chat, `🚩 L'utilisation de votre bot a atteint la limite et sera réinitialisée à 00h00.\n\nPour obtenir plus de limites, passez à un forfait premium. *${isPrefix}premium*`, m)
      client.reply(m.chat, `🍟 Your limit : [ *${Func.formatNumber(user.limit)}* ]${!user.premium ? `\n\nPour obtenir plus de limites, passez à un forfait premium. *${isPrefix}premium*` : ''}`, m)
   },
   error: false
}