const moment = require('moment-timezone')
moment.tz.setDefault(global.timezone)
exports.run = {
   usage: ['cmdstic'],
   category: 'propriétaire',
   async: async (m, {
      client,
      Func
   }) => {
      let cmdS = Object.keys(global.db.sticker)
      if (cmdS.length == 0) return client.reply(m.chat, Func.texted('bold', `🚩 pas de commandes d'autocollants.`), m)
      let teks = `乂  *C M D - L I S T*\n\n`
      for (let i = 0; i < cmdS.length; i++) {
         teks += Func.texted('bold', (i + 1) + '.') + ' ' + cmdS[i] + '\n'
         teks += '	◦  ' + Func.texted('bold', 'Texte') + ' : ' + global.db.sticker[cmdS[i]].text + '\n'
         teks += '	◦  ' + Func.texted('bold', 'Crée') + ' : ' + moment(global.db.sticker[cmdS[i]].created).format('DD/MM/YY HH:mm:ss') + '\n\n'
      }
      m.reply(teks + global.footer)
   },
   owner: true
}