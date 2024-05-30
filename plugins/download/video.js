const { Youtube } = require('@neoxr/youtube-scraper')
const yt = new Youtube({
   fileAsUrl: false
})
exports.run = {
   usage: ['video'],
   hidden: ['jouervid', 'jouervideo'],
   use: 'requête',
   category: 'fonctionnalité',
   async: async (m, {
      client,
      text,
      isPrefix,
      command,
      env,
      users,
      Scraper,
      Func
   }) => {
      try {
         if (!text) return client.reply(m.chat, Func.example(isPrefix, command, 'lathi'), m)
         client.sendReact(m.chat, '🕒', m.key)
         const json = await Scraper.play(text, 'video')
         if (!json.status) return client.reply(m.chat, global.status.fail, m)
         let caption = `乂  *Y T - V I D E O*\n\n`
         caption += `	◦  *Titre* : ${json.title}\n`
         caption += `	◦  *Taille* : ${json.data.size}\n`
         caption += `	◦  *Durée* : ${json.duration}\n`
         caption += `	◦  *Qualité* : ${json.data.quality}\n\n`
         caption += global.footer
         const chSize = Func.sizeLimit(json.data.size, users.premium ? env.max_upload : env.max_upload_free)
         const isOver = users.premium ? `💀 Taille du fichier (${json.data.size}) dépasse la limite maximale.` : `⚠️ Taille du fichier (${json.data.size}), vous ne pouvez télécharger que des fichiers d'une taille maximale de ${env.max_upload_free} MB et pour les utilisateurs premium un maximum de  ${env.max_upload} MB.`
         if (chSize.oversize) return client.reply(m.chat, isOver, m)
         let isSize = (json.data.size).replace(/MB/g, '').trim()
         if (isSize > 99) return client.sendMessageModify(m.chat, caption, m, {
            largeThumb: true,
            thumbnail: await Func.fetchBuffer(json.thumbnail)
         }).then(async () => {
            await client.sendFile(m.chat, json.data.url, json.data.filename, caption, m, {
               document: true
            })
         })
         client.sendFile(m.chat, json.data.url, json.data.filename, caption, m)
      } catch (e) {
         return client.reply(m.chat, global.status.error, m)
      }
   },
   error: false,
   limit: true,
   restrict: true,
   cache: true,
   location: __filename
}
