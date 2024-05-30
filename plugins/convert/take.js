exports.run = {
   usage: ['take'],
   hidden: ['wm'],
   use: 'nom du pack | auteur',
   category: 'converter',
   async: async (m, {
      client,
      text,
      isPrefix,
      Func
   }) => {
      try {
         if (!text) return client.reply(m.chat, Func.texted('bold', `🚩 Donner un texte pour faire un filigrane.`), m)
         let [packname, ...author] = text.split`|`
         author = (author || []).join`|`
         let q = m.quoted ? m.quoted : m
         let mime = (q.msg || q).mimetype || ''
         if (!/webp/.test(mime)) return client.reply(m.chat, Func.texted('bold', `🚩 Répondez à l'autocollant dont vous souhaitez modifier le filigrane.`), m)
         let img = await q.download()
         if (!img) return client.reply(m.chat, global.status.wrong, m)
         client.sendSticker(m.chat, img, m, {
            packname: packname || '',
            author: author || ''
         })
      } catch (e) {
         console.log(e)
         return client.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   error: false,
   premium: true,
   limit: true,
   cache: true,
   location: __filename
}