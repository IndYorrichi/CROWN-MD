const os = require('os')
exports.run = {
   usage: ['serveur'],
   category: 'information',
   async: async (m, {
      client,
      setting,
      Func
   }) => {
      try {
         const json = await Func.fetchJson('http://ip-api.com/json')
         delete json.status
         delete json.query
         let caption = `乂  *S E R V E R*\n\n`
         caption += `┌  ◦  OS : ${os.type()} (${os.arch()} / ${os.release()})\n`
         caption += `│  ◦  Ram : ${Func.formatSize(process.memoryUsage().rss)} / ${Func.formatSize(os.totalmem())}\n`
         for (let key in json) caption += `│  ◦  ${Func.ucword(key)} : ${json[key]}\n`
         caption += `│  ◦  Temps de disponibilité : ${Func.toTime(os.uptime * 1000)}\n`
         caption += `└  ◦  Processeur : ${os.cpus()[0].model}\n\n`
         caption += global.footer
         client.sendMessageModify(m.chat, caption, m, {
            ads: false,
            largeThumb: true,
            thumbnail: setting.cover
         })
      } catch (e) {
         client.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   error: false
}