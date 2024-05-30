exports.run = {
   usage: ['defaccueillir', 'defsorti'],
   hidden: ['partir planifier'],
   use: 'texte',
   category: 'admin tools',
   async: async (m, {
      client,
      text,
      isPrefix,
      command,
      Func
   }) => {
      let setup = global.db.groups.find(v => v.jid == m.chat)
      if (command == 'defaccueillir') {
         if (!text) return client.reply(m.chat, formatWel(isPrefix, command), m)
         setup.text_welcome = text
         await client.reply(m.chat, Func.texted('bold', `🚩 Définir avec succès.`), m)
      } else if (/def(sorti|left)/i.test(command)) {
         if (!text) return client.reply(m.chat, formatLef(isPrefix, command), m)
         setup.text_left = text
         await client.reply(m.chat, Func.texted('bold', `🚩 Définir avec succès.`), m)
      }
   },
   admin: true
}

const formatWel = (prefix, command) => {
   return `Désolé, je ne peux pas revenir sans SMS, et cette explication et comment l'utiliser :

*1.* +tag : pour mentionner un nouveau membre dans le message de bienvenue.
*2.* +grup : pour obtenir le nom du groupe.

• *Exemple* : ${prefix + command} Salut +tag, bienvenue dans le groupe +grup, nous espérons que vous avez apprécié notre compagnie.`
}

const formatLef = (prefix, command) => {
   return `Désolé, je ne peux pas revenir sans SMS, et cette explication et comment nous contacter :

*1.* +tag : pour mentionner le nouveau membre dans le message de gauche.
*2.* +grup : pour obtenir le nom du groupe.

• *Exemple* : ${prefix + command} Bien par +tag`
}