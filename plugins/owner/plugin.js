exports.run = {
   usage: ['brancher', 'plugdis'],
   use: 'nom du plugin',
   category: 'propriétaire',
   async: async (m, {
      client,
      args,
      isPrefix,
      command,
      plugins: plugs,
      Func
   }) => {
      let pluginDisable = global.db.setting.pluginDisable
      if (!args || !args[0]) return client.reply(m.chat, Func.example(isPrefix, command, 'tiktok'), m)
      if (command == 'plugdis') {
         let plugins = Object.keys(plugs)
         if (!plugins.includes(args[0])) return client.reply(m.chat, Func.texted('bold', `🚩 Plugin ${args[0]}.js introuvable.`), m)
         if (pluginDisable.includes(args[0])) return client.reply(m.chat, Func.texted('bold', `🚩 Plugin ${args[0]}.js a déjà été désactivé.`), m)
         pluginDisable.push(args[0])
         client.reply(m.chat, Func.texted('bold', `🚩 Plugin ${args[0]}.js désactivé avec succès.`), m)
      } else if (command == 'plugen') {
         if (!pluginDisable.includes(args[0])) return client.reply(m.chat, Func.texted('bold', `🚩 Plugin ${args[0]}.js introuvable.`), m)
         pluginDisable.forEach((data, index) => {
            if (data === args[0]) pluginDisable.splice(index, 1)
         })
         client.reply(m.chat, Func.texted('bold', `🚩 Plugin ${args[0]}.js activé avec succès.`), m)
      }
   },
   owner: true
}