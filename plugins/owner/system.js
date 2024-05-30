exports.run = {
   usage: ['autotelechargement', 'debug', 'modegroupe', 'multiprefixe', 'nonprefixe', 'autoread', 'prive'],
   use: 'activer / desactiver',
   category: 'propriétaires',
   async: async (m, {
      client,
      args,
      isPrefix,
      command,
      Func
   }) => {
      let system = global.db.setting
      let type = command.toLowerCase()
      if (!args || !args[0]) return client.reply(m.chat, `🚩 *statut actuel* : [ ${system[type] ? 'ACTIVER' : 'DESACTIVER'} ] (Entrer *activer* ou *desactiver*)`, m)
      let option = args[0].toLowerCase()
      let optionList = ['activer', 'desactiver']
      if (!optionList.includes(option)) return client.reply(m.chat, `🚩 *statut actuel* : [ ${system[type] ? 'ACTIVER' : 'DESACTIVER'} ] (Entrer *activer* ou *desactiver*)`, m)
      let status = option != 'activer' ? false : true
      if (system[type] == status) return client.reply(m.chat, Func.texted('bold', `🚩 ${Func.ucword(command)} a été ${option == 'activer' ? 'activer' : 'inactivé'} précédemment.`), m)
      system[type] = status
      client.reply(m.chat, Func.texted('bold', `🚩 ${Func.ucword(command)} a été ${option == 'activer' ? 'activer' : 'inactiver'} avec succès.`), m)
   },
   owner: true,
   cache: true,
   location: __filename
}