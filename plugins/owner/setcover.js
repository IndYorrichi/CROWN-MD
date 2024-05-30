exports.run = {
   usage: ['couverture'],
   hidden: ['couvre'],
   use: 'changer la photo du bot',
   category: 'propriétaire',
   async: async (m, {
      client,
      Func,
      Scraper
   }) => {
      let setting = global.db.setting
      try {
         let q = m.quoted ? m.quoted : m
         let mime = (q.msg || q).mimetype || ''
         if (!/image/.test(mime)) return client.reply(m.chat, Func.texted('bold', `🚩 Image introuvable.`), m)
         client.sendReact(m.chat, '🕒', m.key)
         let img = await q.download()
         if (!img) return client.reply(m.chat, global.status.wrong, m)
         let link = await Scraper.uploadImage(img)
         if (!link.status) return m.reply(Func.jsonFormat(link))
         setting.cover = link.data.url
         client.reply(m.chat, Func.texted('bold', `🚩 couverte défini avec succès.`), m)
      } catch (e) {
         return client.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   owner: true,
   cache: true,
   location: __filename
}