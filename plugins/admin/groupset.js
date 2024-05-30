exports.run = {
   usage: ['defdesc', 'defnom'],
   use: 'texte',
   category: 'admin tools',
   async: async (m, {
      client,
      text,
      isPrefix,
      command,
      Func
   }) => {
      let value = m.quoted ? m.quoted.text : text
      if (command == 'defnom') {
         if (!value) return client.reply(m.chat, Func.example(isPrefix, command, 'CHATBOT'), m)
         if (value > 25) return client.reply(m.chat, Func.texted('bold', `🚩 Le texte est trop long, maximum 25 caractères.`), m)
         await client.groupUpdateSubject(m.chat, value)
      } else if (command == 'defdesc') {
     	if (!value) return client.reply(m.chat, Func.example(isPrefix, command, `Suivez les règles si vous ne voulez pas être expulsé.`), m)
         await client.groupUpdateDescription(m.chat, value)
      }
   },
   group: true,
   admin: true,
   botAdmin: true
}