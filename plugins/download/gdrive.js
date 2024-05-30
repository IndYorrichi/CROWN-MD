exports.run = {
   usage: ['gdrive'],
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
         if (!args || !args[0]) return client.reply(m.chat, Func.example(isPrefix, command, 'https://drive.google.com/file/d/1YTD7Ymux9puFNqu__5WPlYdFZHcGI3Wz/view?usp=drivesdk'), m)
         const json = await Api.neoxr('/gdrive', {
            url: args[0]
         })
         if (!json.status) return client.reply(m.chat, Func.jsonFormat(json), m)
         const size = await Func.getSize(json.data.url)
         const chSize = Func.sizeLimit(size, users.premium ? env.max_upload : env.max_upload_free)
         const isOver = users.premium ? `💀 Taille du fichier (${size}) dépasse la limite maximale., téléchargez le vous-même via ce lien : ${await (await Scraper.shorten(json.data.url)).data.url}` : `⚠️ Taille du fichier (${size}), vous ne pouvez télécharger que des fichiers d'une taille maximale de ${env.max_upload_free} MB et pour les utilisateurs premium un maximum de  ${env.max_upload} MB.`
         if (chSize.oversize) return client.reply(m.chat, isOver, m)
         client.sendFile(m.chat, json.data.url, '', '', m)
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