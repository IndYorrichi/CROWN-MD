exports.run = {
   usage: ['fb'],
   hidden: ['fbdl', 'fbvid'],
   use: 'lien',
   category: 'téléchargeur',
   async: async (m, {
      client,
      args,
      isPrefix,
      command,
      users,
      env,
      Func
   }) => {
      try {
         if (!args || !args[0]) return client.reply(m.chat, Func.example(isPrefix, command, 'https://fb.watch/7B5KBCgdO3'), m)
         if (!args[0].match(/(?:https?:\/\/(web\.|www\.|m\.)?(facebook|fb)\.(com|watch)\S+)?$/)) return client.reply(m.chat, global.status.invalid, m)
         client.sendReact(m.chat, '🕒', m.key)
         const json = await Api.neoxr('/fb', {
            url: args[0]
         })
         if (!json.status) return client.reply(m.chat, Func.jsonFormat(json), m)
         let result = json.data.find(v => v.quality == 'HD' && v.response == 200)
         if (result) {
            const size = await Func.getSize(result.url)
            const chSize = Func.sizeLimit(size, users.premium ? env.max_upload : env.max_upload_free)
            const isOver = users.premium ? `💀 Taille du fichier (${size}) dépasse la limite maximale, téléchargez le vous-même via ce lien : ${await (await Scraper.shorten(result.url)).data.url}` : `⚠️ Taille du fichier (${size}), vous ne pouvez télécharger que des fichiers d'une taille maximale de ${env.max_upload_free} MB et pour les utilisateurs premium un maximum de  ${env.max_upload} MB.`
            if (chSize.oversize) return client.reply(m.chat, isOver, m)
            client.sendFile(m.chat, result.url, Func.filename('mp4'), `◦ *Qualité* : HD`, m)
         } else {
            let result = json.data.find(v => v.quality == 'SD' && v.response == 200)
            if (!result) return client.reply(m.chat, global.status.fail, m)
            const size = await Func.getSize(result.url)
            const chSize = Func.sizeLimit(size, users.premium ? env.max_upload : env.max_upload_free)
            const isOver = users.premium ? `💀 Taille du fichier (${size}) dépasse la limite maximale, téléchargez le vous-même via ce lien : ${await (await Scraper.shorten(result.url)).data.url}` : `⚠️ Taille du fichier (${size}), vous ne pouvez télécharger que des fichiers d'une taille maximale de ${env.max_upload_free} MB et pour les utilisateurs premium un maximum de  ${env.max_upload} MB.`
            if (chSize.oversize) return client.reply(m.chat, isOver, m)
            client.sendFile(m.chat, result.url, Func.filename('mp4'), `◦ *Qualité* : SD`, m)
         }
      } catch (e) {
         console.log(e)
         return client.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   error: false,
   limit: true,
   cache: true,
   location: __filename
}