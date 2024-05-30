exports.run = {
   usage: ['desactiver', 'activer'],
   use: 'commandes',
   category: 'propriétaire',
   async: async (m, {
      client,
      args,
      isPrefix,
      command,
      plugins,
      Func
   }) => {
      let cmd = global.db.setting
      if (!args || !args[0]) return client.reply(m.chat, Func.example(isPrefix, command, 'tiktok'), m)
      let commands = Func.arrayJoin(Object.values(Object.fromEntries(Object.entries(plugins).filter(([name, prop]) => prop.run.usage))).map(v => v.run.usage))
      if (!commands.includes(args[0])) return client.reply(m.chat, Func.texted('bold', `🚩 Commande ${isPrefix + args[0]} n'existe pas.`), m)
      if (command == 'desactiver') {
         if (cmd.error.includes(args[0])) return client.reply(m.chat, Func.texted('bold', `🚩 ${isPrefix + args[0]} la commande a été précédemment désactivée.`), m)
         cmd.error.push(args[0])
         client.reply(m.chat, Func.texted('bold', `🚩 Commande ${isPrefix + args[0]} désactivé avec succès.`), m)
      } else if (command == 'activer') {
         if (!cmd.error.includes(args[0])) return client.reply(m.chat, Func.texted('bold', `🚩 Commande ${isPrefix + args[0]} n'existe pas.`), m)
         cmd.error.forEach((data, index) => {
            if (data === args[0]) cmd.error.splice(index, 1)
         })
         client.reply(m.chat, Func.texted('bold', `🚩 Commande ${isPrefix + args[0]} activé avec succès.`), m)
      }
   },
   owner: true
}