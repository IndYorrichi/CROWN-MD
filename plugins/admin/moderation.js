exports.run = {
   usage: ['antisuppression', 'antilien', 'antivirtex', 'stickauto', 'vv', 'sorti', 'filtre', 'localuniquement', 'accueillir'],
   use: 'activer / désactiver',
   category: 'admin tools',
   async: async (m, {
      client,
      args,
      isPrefix,
      command,
      isBotAdmin,
      Func
   }) => {
      try {
         let setting = global.db.groups.find(v => v.jid == m.chat)
         let type = command.toLowerCase()
         if (!isBotAdmin && /antilink|antivirtex|filter|localonly/.test(type)) return client.reply(m.chat, global.status.botAdmin, m)
         if (!args || !args[0]) return client.reply(m.chat, `🚩 *Statut actuel* : [ ${setting[type] ? 'ACTIVER' : 'DESACTIVER'} ] (Entrez *Activer* ou *Désactiver*)`, m)
         let option = args[0].toLowerCase()
         let optionList = ['activer', 'desactiver']
         if (!optionList.includes(option)) return client.reply(m.chat, `🚩 *Statut actuel* : [ ${setting[type] ? 'ACTIVER' : 'DESACTIVER'} ] (Entrez *Activer* ou *Desactiver*)`, m)
         let status = option != 'activer' ? false : true
         if (setting[type] == status) return client.reply(m.chat, Func.texted('bold', `🚩 ${Func.ucword(command)} a été ${option == 'on' ? 'activer' : 'desactiver'} précédemment.`), m)
         setting[type] = status
         client.reply(m.chat, Func.texted('bold', `🚩 ${Func.ucword(command)} a été ${option == 'on' ? 'activer' : 'desactiver'} avec succès.`), m)
      } catch (e) {
         return client.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   admin: true,
   group: true,
   cache: true,
   location: __filename
}