exports.run = {
   usage: ['lenomdubot'],
   use: 'texte',
   category: 'propriétaire',
   async: async (m, {
      client,
      text,
      isPrefix,
      command,
      Func
   }) => {
      try {
         if (!text) return client.reply(m.chat, Func.example(isPrefix, command, 'crown bot'), m)
         if (text.length > 25) return client.reply(m.chat, `🚩 le texte est trop long, maximum 25 caractères.`, m)
         client.authState.creds.me.name = text
         await props.save(global.db)
         return client.reply(m.chat, `🚩 nom changé avec succès.`, m)
      } catch {
         return client.reply(m.chat, Func.texted('bold', `🚩 le nom n'a pas pu changer.`), m)
      }
   },
   owner: true
}