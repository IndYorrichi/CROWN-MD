exports.run = {
   usage: ['muet'],
   use: '0 / 1',
   category: 'admin tools',
   async: async (m, {
      client,
      args,
      isPrefix,
      command,
      Func
   }) => {
      let gc = global.db.groups.find(v => v.jid == m.chat)
      let opt = [0, 1]
      if (!args || !args[0] || !opt.includes(parseInt(args[0]))) return client.reply(m.chat, `🚩 *Statut actuel* : [ ${gc.mute ? 'True' : 'False'} ] (Saisissez *1* ou *0*)`, m)
      if (parseInt(args[0]) == 1) {
         if (gc.mute) return client.reply(m.chat, Func.texted('bold', `🚩 Précédemment désactivé.`), m)
         gc.mute = true
         client.reply(m.chat, Func.texted('bold', `🚩 Coupure réussie.`), m)
      } else if (parseInt(args[0]) == 0) {
         if (!gc.mute) return client.reply(m.chat, Func.texted('bold', `🚩 Précédemment activé.`), m)
         gc.mute = false
         client.reply(m.chat, Func.texted('bold', `🚩 Réactivation du son avec succès.`), m)
      }
   },
   admin: true,
   group: true,
   cache: true,
   location: __filename
}