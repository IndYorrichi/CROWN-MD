exports.run = {
   regex: /pin(?:terest)?(?:\.it|\.com)/,
   async: async (m, {
      client,
      body,
      users,
      setting,
      Func
   }) => {
      try {
         const regex = /pin(?:terest)?(?:\.it|\.com)/;
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
               Func.hitstat('pin', m.sender)
               links.map(async link => {
                  let json = await Api.neoxr('/pin', {
                  	url: link
                  })
                  if (!json.status) return client.reply(m.chat, Func.jsonFormat(json), m)
                  if (/jpg|mp4/.test(json.data.type)) return client.sendFile(m.chat, json.data.url, '', `🍟 *Aller chercher* : ${((new Date - old) * 1)} ms`, m)
                  if (json.data.type == 'gif') return client.sendFile(m.chat, json.data.url, '', `🍟 *Aller chercher* : ${((new Date - old) * 1)} ms`, m, {
                     gif: true
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