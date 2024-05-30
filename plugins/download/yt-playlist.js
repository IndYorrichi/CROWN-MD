const { Youtube } = require('@neoxr/youtube-scraper')
const yt = new Youtube({
   fileAsUrl: false
})
exports.run = {
   usage: ['ytliste'],
   hidden: ['ytjouerliste', 'jouerliste', 'getmp3', 'getmp4'],
   use: 'link',
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
         client.ytplaylist = client.ytplaylist ? client.ytplaylist : []
         if (!args[0]) return client.reply(m.chat, Func.example(isPrefix, command, 'https://www.youtube.com/playlist?list=PLFIM0718LjIW-XBdVOerYgKegBtD6rSfD'), m)
         const check = client.ytplaylist.find(v => v.jid == m.sender)
         if (/get?(mp4|mp3)/.test(command) && !check && !isNaN(args[0])) return m.reply(Func.texted('bold', `🚩 Votre session est expirée / n'existe pas, effectuez une autre recherche en utilisant les mots clés.`))
         if (/get?(mp4|mp3)/.test(command) && check && !isNaN(args[0])) {
            if (Number(args[0]) > check.results.length) return m.reply(Func.texted('audacieux', `🚩 Dépasser la quantité de données.`))
            client.sendReact(m.chat, '🕒', m.key)
            if (command === 'getmp3') {
               const json = await yt.fetch(check.results[Number(args[0]) - 1])
               if (!json.status) return client.reply(m.chat, Func.jsonFormat(json), m)
               let caption = `乂  *Y T - M P 3*\n\n`
               caption += `	◦  *Titre* : ${json.title}\n`
               caption += `	◦  *Taille* : ${json.data.size}\n`
               caption += `	◦  *Durée* : ${json.duration}\n`
               caption += `	◦  *Débit* : ${json.data.quality}\n\n`
               caption += global.footer
               const chSize = Func.sizeLimit(json.data.size, users.premium ? env.max_upload : env.max_upload_free)
               const isOver = users.premium ? `💀 Taille du fichier (${json.data.size}) depasse la limite maximale.` : `⚠️ Taille du ficher (${json.data.size}), vous ne pouvez télécharger que des fichiers d'une taille maximale de ${env.max_upload_free} MB et pour les utilisateurs premium un maximum de ${env.max_upload} MB.`
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
            } else if (command === 'getmp4') {
               var json = await yt.fetch(check.results[Number(args[0]) - 1], 'video', '720p')
               if (!json.status) {
                  var json = await yt.fetch(check.results[Number(args[0]) - 1], 'video', '480p')
               }
               if (!json.status) return client.reply(m.chat, Func.jsonFormat(json), m)
               let caption = `乂  *Y T - M P 4*\n\n`
               caption += `	◦  *Titre* : ${json.title}\n`
               caption += `	◦  *Taille* : ${json.data.size}\n`
               caption += `	◦  *Durée* : ${json.duration}\n`
               caption += `	◦  *Qualité* : ${json.data.quality}\n\n`
               caption += global.footer
               const chSize = Func.sizeLimit(json.data.size, users.premium ? env.max_upload : env.max_upload_free)
               const isOver = users.premium ? `💀 Taille du ficher (${json.data.size}) dépasse la limite maximale.` : `⚠️ Taille du fichier (${json.data.size}), vous ne pouvez télécharger que des fichiers d'une taille maximale de ${env.max_upload_free} MB et pour les utilisateurs premium un maximum de  ${env.max_upload} MB.`
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
         } else if (['ytplaylist', 'playlist', 'ytlist'].includes(command)) {
            client.sendReact(m.chat, '🕒', m.key)
            const json = await Api.neoxr('/yt-playlist', {
               url: args[0]
            })
            if (!json.status) return client.reply(m.chat, Func.jsonFormat(json), m)
            if (!check) {
               client.ytplaylist.push({
                  jid: m.sender,
                  results: json.data.map(v => v.url),
                  created_at: new Date * 1
               })
            } else check.results = json.data.map(v => v.url)
            let p = `Pour télécharger la vidéo, utilisez *${isPrefix}getmp4 number* et pour obtenir l'utilisation audio *${isPrefix}getmp3 numéro*\n`
            p += `*Exemple* : ${isPrefix}getmp4 1\n\n`
            json.data.map((v, i) => {
               p += `*${i+1}*. ${v.title}\n`
               p += `◦ *Link* : ${v.url}\n\n`
            }).join('\n\n')
            p += global.footer
            client.reply(m.chat, p, m)
         }
         setInterval(async () => {
            const session = client.ytplaylist.find(v => v.jid == m.sender)
            if (session && new Date - session.created_at > env.timeout) {
               Func.removeItem(client.ytplaylist, session)
            }
         }, 60_000)
      } catch (e) {
         client.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   error: false,
   limit: true,
   cache: true,
   location: __filename
}
