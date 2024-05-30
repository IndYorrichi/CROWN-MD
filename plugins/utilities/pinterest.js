exports.run = {
   usage: ['Pinterest'],
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
         if (!text) return client.reply(m.chat, Func.example(isPrefix, command, `Panda`), m)
         client.sendReact(m.chat, '🕒', m.key)
         let old = new Date()
         const json = await Api.neoxr('/Pinterest', {
            q: text
         })
         if (!json.status) return client.reply(m.chat, global.status.fail, m)
         for (let i = 0; i < 3; i++) {
            var rand = Math.floor(json.data.length * Math.random())
            client.sendFile(m.chat, json.data[rand].url, '', `🍟 *Aller chercher* : ${((new Date - old) * 1)} ms`, m)
            await Func.delay(2000)
         }
      } catch (e) {
         console.log(e)
         return client.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   error: false,
   limit: true,
   restrict: true,
   cache: true,
   location: __filename
}