const decode = require('html-entities').decode
exports.run = {
   regex: /^(?:https?:\/\/)?(?:www\.)?(?:mediafire\.com\/)(?:\S+)?$/,
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
         const regex = /^(?:https?:\/\/)?(?:www\.)?(?:mediafire\.com\/)(?:\S+)?$/;
         const extract = body ? Func.generateLink(body) : null
         if (extract) {
            const links = extract.filter(v => v.match(regex))
            if (links.length != 0) {
               if (users.limit > 0) {
                  let limit = 1
                  if (users.limit >= limit) {
                     users.limit -= limit
                  } else return client.reply(m.chat, Func.texted('audacieux', `🚩 Votre limite n'est pas suffisante pour utiliser cette fonctionnalité..`), m)
               }
               client.sendReact(m.chat, '🕒', m.key)
               let old = new Date()
               Func.hitstat('mediafire', m.sender)
               links.map(async link => {
                  const json = await Api.neoxr('/mediafire', {
                     url: link
                  })
                  if (!json.status) return client.reply(m.chat, Func.jsonFormat(json), m)
                  let text = `乂  *M E D I A F I R E *\n\n`
                  text += '	◦  *Nom* : ' + unescape(decode(json.data.filename)) + '\n'
                  text += '	◦  *Taille* : ' + json.data.size + '\n'
                  text += '	◦  *Extension* : ' + json.data.extension + '\n'
                  text += '	◦  *Mime* : ' + json.data.mime + '\n'
                  text += '	◦  *téléchargé * : ' + json.data.uploaded + '\n\n'
                  text += global.footer
                  const chSize = Func.sizeLimit(json.data.size, users.premium ? env.max_upload : env.max_upload_free)
                  const isOver = users.premium ? ` taille du fichier (${json.data.size}) dépasse la limite maximale.` : `⚠️ taille du fichier (${json.data.size}), vous ne pouvez télécharger que des fichiers d'une taille maximale de ${env.max_upload_free} Mo et pour les utilisateurs premium un maximum de ${env.max_upload} MB.`
                  if (chSize.oversize) return client.reply(m.chat, isOver, m)
                  client.sendMessageModify(m.chat, text, m, {
                     largeThumb: true,
                     thumbnail: 'https://telegra.ph/file/fcf56d646aa059af84126.jpg'
                  }).then(async () => {
                     client.sendFile(m.chat, json.data.link, unescape(decode(json.data.filename)), '', m)
                  })
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