const translate = require('translate-google-api')
exports.run = {
   usage: ['traduire'],
   hidden: ['tr'],
   use: 'texte',
   category: 'utilitaires',
   async: async (m, {
      client,
      text,
      isPrefix,
      command,
      Func
   }) => {
      if (!text) return client.reply(m.chat, Func.example(isPrefix, command, 'id i love you'), m)
      if (text && m.quoted && m.quoted.text) {
         let lang = text.slice(0, 2)
         try {
            let data = m.quoted.text
            let result = await translate(`${data}`, {
               to: lang
            })
            client.reply(m.chat, result[0], m)
         } catch {
            return client.reply(m.chat, Func.texted('bold', `🚩 Code de langue non pris en charge.`), m)
         }
      } else if (text) {
         let lang = text.slice(0, 2)
         try {
            let data = text.substring(2).trim()
            let result = await translate(`${data}`, {
               to: lang
            })
            client.reply(m.chat, result[0], m)
         } catch {
            return client.reply(m.chat, Func.texted('bold', `🚩 Code de langue non pris en charge.`), m)
         }
      }
   },
   error: false,
   cache: true,
   location: __filename
}