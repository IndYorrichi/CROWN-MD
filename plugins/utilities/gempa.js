exports.run = {
   usage: ['tremble'],
   category: 'utilitaires',
   async: async (m, {
      client,
      Func
   }) => {
      try {
         client.sendReact(m.chat, '🕒', m.key)
         let json = await Api.neoxr('/gempa')
         if (!json.status) return client.reply(m.chat, Func.jsonFormat(json), m)
         let caption = `乂  *TREMBLEMENT DE TERRE*\n\n`
         caption += `	◦  *Étoile* : ${json.data.lintang}\n`
         caption += `	◦  *ovale* : ${json.data.bujur}\n`
         caption += `	◦  *Échelle* : ${json.data.magnitudo}\n`
         caption += `	◦  *Profondeur* : ${json.data.kedalaman}\n`
         caption += `	◦  *Temps* : ${json.data.waktu}\n`
         caption += `	◦  *Centre sismique* : ${json.data.wilayah}\n\n`
         caption += global.footer
         client.sendMessageModify(m.chat, caption, m, {
            largeThumb: true,
            thumbnail: await Func.fetchBuffer(json.data.map)
         })
      } catch (e) {
         client.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   error: false
}