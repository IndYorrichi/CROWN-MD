const { Youtube } = require('@neoxr/youtube-scraper')
const yt = new Youtube({
   fileAsUrl: false
})
exports.run = {
   usage: ['ytmp3', 'ytmp4'],
   hidden: ['yta', 'ytv'],
   use: 'lien',
   category: 'téléchargeur',
   async: async (m, {
      client,
      args,
      isPrefix,
      command,
      users,
      env,
      Func,
      Scraper
   }) => {
      try {
         if (/yt?(a|mp3)/i.test(command)) {
            if (!args || !args[0]) return client.reply(m.chat, Func.example(isPrefix, command, 'https://youtu.be/zaRFmdtLhQ8'), m)
            if (!/^(?:https?:\/\/)?(?:www\.|m\.|music\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w\-_]+)\&?/.test(args[0])) return client.reply(m.chat, global.status.invalid, m)
            client.sendReact(m.chat, '🕒', m.key)
            const json = await yt.fetch(args[0])
            if (!json.status) return client.reply(m.chat, Func.jsonFormat(json), m)
            let caption = `乂  *Y T - P L A Y*\n\n`
            caption += `	◦  *Titre* : ${json.title}\n`
            caption += `	◦  *Taille* : ${json.data.size}\n`
            caption += `	◦  *Durée* : ${json.duration}\n`
            caption += `	◦  *Débit* : ${json.data.quality}\n\n`
            caption += global.footer
            const chSize = Func.sizeLimit(json.data.size, users.premium ? env.max_upload : env.max_upload_free)
            const isOver = users.premium ? `💀 Taille du fichier (${json.data.size}) dépasse la limite maximale.` : `⚠️ Taille du fichier (${json.data.size}), vous ne pouvez télécharger que des fichiers d'une taille maximale de ${env.max_upload_free} MB et pour les utilisateurs premium un maximum de  ${env.max_upload} MB.`
            if (chSize.oversize) return client.reply(m.chat, isOver, m)
            client.sendMessageModify(m.chat, caption, m, {
               largeThumb: true,
               thumbnail: await Func.fetchBuffer(json.thumbnail)
            }).then(async () => {
               client.sendFile(m.chat, json.data.url, json.data.filename, '', m, {
                  document: true,
                  APIC: await Func.fetchBuffer(json.thumbnail)
               })
            })
         } else if (/yt?(v|mp4)/i.test(command)) {
            if (!args || !args[0]) return client.reply(m.chat, Func.example(isPrefix, command, 'https://youtu.be/zaRFmdtLhQ8'), m)
            if (!/^(?:https?:\/\/)?(?:www\.|m\.|music\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w\-_]+)\&?/.test(args[0])) return client.reply(m.chat, global.status.invalid, m)
            client.sendReact(m.chat, '🕒', m.key)
            var json = await yt.fetch(args[0], 'video', '720p')
            if (!json.status) {
               var json = await yt.fetch(args[0], 'video', '480p')
            }
            if (!json.status) return client.reply(m.chat, Func.jsonFormat(json), m)
            let caption = `乂  *Y T - M P 4*\n\n`
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
         }
      } catch (e) {
         return client.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   error: false,
   limit: true,
   cache: true,
   location: __filename
}
