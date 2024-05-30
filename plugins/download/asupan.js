exports.run = {
   usage: ['asupan'],
   use: 'nom dutilisateur (facultatif)',
   category: 'téléchargeur',
   async: async (m, {
      client,
      args,
      Func
   }) => {
      try {
         client.sendReact(m.chat, '🕒', m.key)
         // TikTok Username
         const json = await Api.neoxr('/asupan', {
            username: args[0] || Func.random([
               'itsbellefirst',
               'aletaanovianda',
               'faisafch',
               '0rbby',
               'cindyanastt',
               'awaa.an'
            ])
         })
         if (!json.status) return client.reply(m.chat, Func.jsonFormat(json), m)
         let caption = `乂  *A S U P A N*\n\n`
         caption += `	◦  *Auteur* : ${json.data.author.nickname} (@${json.data.author.username})\n`
         caption += `	◦  *Vues* : ${Func.h2k(json.data.stats.play_count)}\n`
         caption += `	◦  *Aime* : ${Func.h2k(json.data.stats.digg_count)}\n`
         caption += `	◦  *Actions* : ${Func.h2k(json.data.stats.share_count)}\n`
         caption += `	◦  *Commentaires* : ${Func.h2k(json.data.stats.comment_count)}\n`
         caption += `	◦  *Durée* : ${Func.toTime(json.data.duration)}\n`
         caption += `	◦  *Son* : ${json.data.music.title} - ${json.data.music.author}\n`
         caption += `	◦  *Légende* : ${json.data.caption || '-'}\n\n`
         caption += global.footer
         client.sendFile(m.chat, json.data.video, '', caption, m)
      } catch (e) {
         return client.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   error: false,
   limit: true,
   cache: true,
   location: __filename
}