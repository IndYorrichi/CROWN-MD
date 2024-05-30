exports.run = {
   usage: ['+cacher', '-cacher'],
   category: 'propriétaire',
   async: async (m, {
      client,
      text,
      prefix,
      command,
      setting,
      ctx,
      Func
   }) => {
      try {
         const categories = [...new Set(Object.values(Object.fromEntries(Object.entries(ctx.plugins).filter(([name, prop]) => prop.run.category))).map(v => v.run.category))]
         if (!text) return client.reply(m.chat, Func.example(prefix, command, 'features'), m)
         if (!categories.includes(text.toLowerCase().trim())) return client.reply(m.chat, Func.texted('bold', `🚩 ${text} la catégorie n'existe pas.`), m)
         if (command == '+cacher') {
            if (setting.hidden.includes(text.toLowerCase().trim())) return client.reply(m.chat, Func.texted('bold', `🚩 Categories ${text} auparavant été masqué.`), m)
            setting.hidden.push(text.toLowerCase().trim())
            client.reply(m.chat, Func.texted('bold', `🚩 ${text} categorie masqué avec succès.`), m)
         } else if (command == '-cacher') {
            if (!setting.hidden.includes(text.toLowerCase().trim())) return client.reply(m.chat, Func.texted('bold', `🚩 ${text} la catégorie n'existe pas.`), m)
            setting.hidden.forEach((data, index) => {
               if (data === text.toLowerCase().trim()) setting.hidden.splice(index, 1)
            })
            client.reply(m.chat, Func.texted('bold', `🚩 ${text} la catégorie a été retiré de la liste masquée.`), m)
         }
      } catch (e) {
         client.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   owner: true,
   cache: true,
   location: __filename
}