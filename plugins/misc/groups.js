const moment = require('moment-timezone')
moment.tz.setDefault('America/Port-au-Prince').locale('id')
exports.run = {
   usage: ['groups'],
   category: 'information',
   async: async (m, {
      client,
      isPrefix,
      Func
   }) => {
      let groupList = async () => Object.entries(await client.groupFetchAllParticipating()).slice(0).map(entry => entry[1])
      let groups = await groupList()
      let rows = []
      let caption = `乂  *G R O U P - L I S T*\n\n`
      caption += `*“Bot a rejoint ${groups.length} groupes, envoyer _${isPrefix}gc_ or _${isPrefix}gcopt_ pour afficher toutes les options de configuration.”*\n\n`
      groups.map((x, i) => {
         let v = global.db.groups.find(v => v.jid == x.id)
         if (v) {
            caption += `›  *${(i + 1)}.* ${x.subject}\n`
            caption += `   *💳* : ${x.id.split`@`[0]}\n`
            caption += `${v.stay ? '   POUR TOUJOURS' : (v.expired == 0 ? '   PAS ENCORE DÉFINI' : '   ' + Func.timeReverse(v.expired - new Date() * 1))} | ${x.participants.length} | ${(v.mute ? 'DESACTIVER' : 'ACTIVER')} | ${moment(v.activity).format('DD/MM/YY HH:mm:ss')}\n\n`
         } else {
            global.db.groups.push({
               jid: x.id,
               activity: new Date * 1,
               antidelete: true,
               antilink: false,
               antivirtex: false,
               filter: false,
               left: false,
               localonly: false,
               mute: false,
               member: {},
               text_left: '',
               text_welcome: '',
               welcome: true,
               expired: 0,
               stay: false
            })
         }
      })
      caption += `${global.footer}`
      m.reply(caption)
   },
   cache: true,
   location: __filename
}