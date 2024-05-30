exports.run = {
   usage: ['igstalk'],
   use: 'nom dutilisateur',
   category: 'utilitaires',
   async: async (m, {
      client,
      args,
      isPrefix,
      command,
      Func
   }) => {
      try {
         if (!args || !args[0]) return client.reply(m.chat, Func.example(isPrefix, command, 'hosico_cat'), m)
         client.sendReact(m.chat, '🕒', m.key)
         const json = await Api.neoxr('/igstalk', {
         	username: args[0]
         })
         if (!json.status) return client.reply(m.chat, Func.texted('bold', `🚩 Compte non trouvé.`), m)
         let caption = `乂  *I G - S T A L K*\n\n`
         caption += `	◦  *nom* : ${json.data.name}\n`
         caption += `	◦  *Nom d'utilisateur* : ${json.data.username}\n`
         caption += `	◦  *Des postes* : ${json.data.post}\n`
         caption += `	◦  *Suiveurs* : ${json.data.follower}\n`
         caption += `	◦  *Suivis* : ${json.data.following}\n`
         caption += `	◦  *Biographie* : ${json.data.about}\n`
         caption += `	◦  *Privé* : ${Func.switcher(json.data.private, '√', '×')}\n\n`
         caption += global.footer
         client.sendFile(m.chat, json.data.photo, 'image.png', caption, m)
      } catch (e) {
         return client.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   error: false,
   limit: true,
   cache: true,
   location: __filename
}