exports.run = {
   usage: ['waifudiff'],
   use: 'rapide',
   category: 'utilitaires',
   async: async (m, {
      client,
      text,
      isPrefix,
      command,
      Func
   }) => {
      try {
         if (!text) return client.reply(m.chat, Func.example(isPrefix, command, 'cheveux longs'), m)
         client.sendReact(m.chat, '🕒', m.key)
         const json = await Api.neoxr('/waifudiff', {
            q: text
         })
         if (!json.status) return client.reply(m.chat, Func.jsonFormat(json), m)
         client.sendFile(m.chat, json.data.url, '', `◦  *Rapide* : ${json.data.prompt}`, m)
      } catch (e) {
         client.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   error: false,
   limit: true,
   cache: true,
   location: __filename
}