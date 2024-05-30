const axios = require('axios')
exports.run = {
   regex: /^(?:https?:\/\/)?(?:www\.|m\.|music\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w\-_]+)\&?/,
   async: async (m, {
      client,
      body,
      users,
      env,
      setting,
      prefixes,
      Func,
      Scraper
   }) => {
      try {
         const regex = /^(?:https?:\/\/)?(?:www\.|m\.|music\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w\-_]+)\&?/;
         const extract = body ? Func.generateLink(body) : null
         if (extract) {
            const links = extract.filter(v => v.match(regex))
            if (links.length != 0) {
               if (users.limit > 0) {
                  let limit = 1
                  if (users.limit >= limit) {
                     users.limit -= limit
                  } else return client.reply(m.chat, Func.texted('audacieux', `🚩 Votre limite n'est pas suffisante pour utiliser cette fonctionnalité.`), m)
               }
               client.sendReact(m.chat, '🕒', m.key)
               let old = new Date()
               Func.hitstat('ytmp4', m.sender)
               links.map(async link => {
                  const json = await Scraper.youtube(link, 'video')
                  if (!json.status) return client.reply(m.chat, Func.jsonFormat(json), m)
                  let caption = `乂  *Y T - M P 4*\n\n`
                  caption += `	◦  *Titre* : ${json.title}\n`
                  caption += `	◦  *taille* : ${json.data.size}\n`
                  caption += `	◦  *Durée* : ${json.duration}\n`
                  caption += `	◦  *Qualité* : ${json.data.quality}\n\n`
                  caption += global.footer
                  const chSize = Func.sizeLimit(json.data.size, users.premium ? env.max_upload : env.max_upload_free)
                  const isOver = users.premium ? `💀 Taille du fichier (${json.data.size})dépasse la limite maximale.` : `⚠️ Taille du fichier vous ne pouvez télécharger que des fichiers d'une taille maximale de(${json.data.size}), vous ne pouvez télécharger que des fichiers d'une taille maximale de ${env.max_upload_free} Mo et pour les utilisateurs premium un maximum de${env.max_upload} Mo.`
                  if (chSize.oversize) return client.reply(m.chat, isOver, m)
                  let isSize = (json.data.size).replace(/MB/g, '').trim()
                  if (isSize > 99) return client.sendMessageModify(m.chat, caption, m, {
                     largeThumb: true,
                     thumbnail: await Func.fetchBuffer(json.thumbnail)
                  }).then(async () => {
                     await client.sendFile(m.chat, json.data.buffer, json.data.filename, caption, m, {
                        document: true
                     })
                  })
                  client.sendFile(m.chat, json.data.buffer, json.data.filename, caption, m)
               })
            }
         }
      } catch (e) {
         console.log(e)
         return client.reply(m.chat, global.status.error, m)
      }
   },
   limit: true,
   download: true
}