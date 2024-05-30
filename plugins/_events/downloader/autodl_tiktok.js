exports.run = {
   regex: /^(?:https?:\/\/)?(?:www\.|vt\.|vm\.|t\.)?(?:tiktok\.com\/)(?:\S+)?$/,
   async: async (m, {
      client,
      body,
      users,
      setting,
      prefixes,
      Func,
      isPrem
   }) => {
      try {
         const regex = /^(?:https?:\/\/)?(?:www\.|vt\.|vm\.|t\.)?(?:tiktok\.com\/)(?:\S+)?$/;
         const extract = body ? Func.generateLink(body) : null
         if (extract) {
            const links = extract.filter(v => Func.ttFixed(v).match(regex))
            if (links.length != 0) {
               if (users.limit > 0) {
                  let limit = 1
                  if (users.limit >= limit) {
                     users.limit -= limit
                  } else return client.reply(m.chat, Func.texted('bold', `🚩 votre limite n'est pas suffisant pour utiliser cette fonctionnalité.`), m)
               }
               client.sendReact(m.chat, '🕒', m.key)
               let old = new Date()
               Func.hitstat('tiktok', m.sender)
               links.map(async link => {
                  const json = await Api.neoxr('/tiktok', {
                     url: Func.ttFixed(link)
                  })
                  if (!json.status) return m.reply(Func.jsonFormat(json))
                  if (json.data.video) return client.sendFile(m.chat, json.data.video, 'video.mp4', `🍟 *aller chercher* : ${((new Date - old) * 1)} ms`, m)
                  if (json.data.photo) {
                     for (let p of json.data.photo) {
                        client.sendFile(m.chat, p, 'image .jpg', `🍟 *aller chercher* : ${((new Date - old) * 1)} ms`, m)
                        await Func.delay(1500)
                     }
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