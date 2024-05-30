exports.run = {
   usage: ['+cmdstic', '-cmdstic'],
   use: 'texte / commande',
   category: 'rejoindre',
   async: async (m, {
      client,
      text,
      command,
      Func
   }) => {
      if (command == '+cmdstic') {
         if (!m.quoted || !/webp/.test(m.quoted.mimetype)) return client.reply(m.chat, Func.texted('bold', `🚩 autocollant de réponse qui sera utilisé comme commande d'autocollant.`), m)
         if (!text) return client.reply(m.chat, Func.texted('bold', `🚩 Berikan teks atau command.`), m)
         let hash = m.quoted.fileSha256.toString().replace(/,/g, '')
         if (typeof global.db.sticker[hash] != 'indefie') return client.reply(m.chat, `${Func.texted('bold', `🚩 l'autocollant est déjà dans la base de données avec du texte / commande`)} : ${Func.texted('monospace', global.db.sticker[hash].text)}`, m)
         global.db.sticker[hash] = {
            text: text,
            created: new Date() * 1
         }
         client.reply(m.chat, `${Func.texted('bold', `🚩 autocollant défini abeg succès sous forme de texte / commande`)} : ${Func.texted('monospace', text)}`, m)
      } else if (command == '-cmdstic') {
         if (!m.quoted || !/webp/.test(m.quoted.mimetype)) return client.reply(m.chat, Func.texted('bold', `🚩 autocollant de réponse qui sera supprimé de la liste des commandes d'autocollants.`), m)
         let hash = m.quoted.fileSha256.toString().replace(/,/g, '')
         if (typeof global.db.sticker[hash] == 'indéfinie') return client.reply(m.chat, Func.texted('bold', `🚩 l'autocollant n'est pas dans la base de données.`), m)
         delete global.db.sticker[hash]
         client.reply(m.chat, Func.texted('bold', `🚩 commande d'autocollant supprimée avec succès.`), m)
      }
   },
   owner: true
}