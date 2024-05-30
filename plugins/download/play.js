const { Youtube } = require('@neoxr/youtube-scraper')
const yt = new Youtube({
   fileAsUrl: false
})
exports.run = {
   usage: ['jouer', 'play'],
   use: 'requête',
   category: 'téléchargeur',
   async: async (m, {
      client,
      text,
      isPrefix,
      command,
      users,
      env,
      Func,
      Scraper
   }) => {
      try {
         if (!text) return client.reply(m.chat, Func.example(isPrefix, command, 'lathi'), m)
         client.sendReact(m.chat, '🕒', m.key)
         const json = await yt.play(text)
         if (!json.status) return client.reply(m.chat, Func.jsonFormat(json), m)
         let caption = `乂  *Y T - P L A Y*\n\n`
         caption += `	◦  *Titre* : ${json.title}\n`
         caption += `	◦  *Taille* : ${json.data.size}\n`
         caption += `	◦  *Durée* : ${json.duration}\n`
         caption += `	◦  *Débit* : ${json.data.quality}\n\n`
         caption += global.footer   
         const chSize = Func.sizeLimit(json.data.size, users.premium ? env.max_upload : env.max_upload_free)
         const isOver = users.premium ? `💀 Taille du fichier (${json.data.size}) dépasse la limite maximale.` : `⚠️ File size (${json.data.size}), vous ne pouvez télécharger que des fichiers d'une taille maximale de ${env.max_upload_free} MB et pour les utilisateurs premium un maximum de ${env.max_upload} MB.`
         if (chSize.oversize) return client.reply(m.chat, isOver, m)
         client.sendMessageModify(m.chat, caption, m, {
            largeThumb: true,
            thumbnail: json.thumbnail
         }).then(async () => {
            client.sendFile(m.chat, json.data.url, json.data.filename, '', m, {
               document: true,
               APIC: await Func.fetchBuffer(json.thumbnail)
            })
         })
      } catch (e) {
         client.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   error: false,
   restrict: true,
   limit: true,
   cache: true,
   location: __filename
}
