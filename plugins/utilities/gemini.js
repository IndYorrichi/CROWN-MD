exports.run = {
   usage: ['Gemini', 'chatgpt'],
   use: 'requête',
   category: 'utilitaires',
   async: async (m, {
      client,
      text,
      isPrefix,
      command,
      Func
   }) => {
      try {
         if (!text) return client.reply(m.chat, Func.example(isPrefix, command, "qu'est-ce qu'un chat"), m)
         client.sendReact(m.chat, '🕒', m.key)
         const json = await Api.neoxr('/gemini-chat', {
            q: text
         })
         if (!json.status) return client.reply(m.chat, Func.jsonFormat(json), m)
         client.reply(m.chat, json.data.message, m)
      } catch (e) {
         client.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   error: false,
   limit: true,
   cache: true,
   location: __filename
}