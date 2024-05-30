exports.run = {
   regex: /^(?:https?:\/\/(web\.|www\.|m\.)?(facebook|fb)\.(com|watch)\S+)?$/,
   async: async (m, {
      client,
      body,
      users,
      setting,
      env,
      Func,
      Scraper
   }) => {
      try {
         const regex = /^(?:https?:\/\/(web\.|www\.|m\.)?(facebook|fb)\.(com|watch)\S+)?$/;
         const extract = body ? Func.generateLink(body) : null
         if (extract) {
            const links = extract.filter(v => v.match(regex))
            if (links.length != 0) {
               if (users.limit > 0) {
                  let limit = 1
                  if (users.limit >= limit) {
                     users.limit -= limit
                  } else return client.reply(m.chat, Func.texted('audacieux', `🚩Votre limite n'est pas suffisante pour utiliser cette fonctionnalité.`), m)
               }
               client.sendReact(m.chat, '🕒', m.key)
               let old = new Date()
               Func.hitstat('fb', m.sender)
               links.map(async link => {
                  let json = await Api.neoxr('/fb', {
                     url: link
                  })
                  if (!json.status) return client.reply(m.chat, Func.jsonFormat(json), m)
                  let result = json.data.find(v => v.quality == 'HD' && v.response == 200)
                  if (result) {
                     const size = await Func.getSize(result.url)
                     const chSize = Func.sizeLimit(size, users.premium ? env.max_upload : env.max_upload_free)
                     const isOver = users.premium ? `💀taille du fichier (${size}) dépasse la limite maximale, téléchargez-le vous-même via ce lien : ${await (await Scraper.shorten(result.url)).data.url}` : `⚠️ Taille du fichier (${size}),vous ne pouvez télécharger que des fichiers d'une taille maximale de ${env.max_upload_free} Mo et pour les utilisateurs premium un maximum de ${env.max_upload} MB.`
                     if (chSize.oversize) return client.reply(m.chat, isOver, m)
                     client.sendFile(m.chat, result.url, Func.filename('mp4'), `◦ *qualité* : HD`, m)
                  } else {
                     let result = json.data.find(v => v.quality == 'SD' && v.response == 200)
                     if (!result) return client.reply(m.chat, global.status.fail, m)
                     const size = await Func.getSize(result.url)
                     const chSize = Func.sizeLimit(size, users.premium ? env.max_upload : env.max_upload_free)
                     const isOver = users.premium ? `💀 taille du fichier (${size}) dépasse la limite maximale, téléchargez-le vous-même via ce lien : ${await (await Scraper.shorten(result.url)).data.url}` : `⚠️ Taille du fichier (${size}), vous ne pouvez télécharger que des fichiers d'une taille maximale de ${env.max_upload_free} Mo et pour les utilisateurs premium un maximum de ${env.max_upload} MB.`
                     if (chSize.oversize) return client.reply(m.chat, isOver, m)
                     client.sendFile(m.chat, result.url, Func.filename('mp4'), `◦ *qualité* : SD`, m)
                  }
               })
            }
         }
      } catch (e) {
         return client.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   limit: true,
   download: true
}