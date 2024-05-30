const moment = require('moment-timezone')
exports.run = {
   usage: ['botstatut'],
   hidden: ['stat'],
   category: 'information',
   async: async (m, {
      client,
      blockList,
      setting,
      Func
   }) => {
      try {
         let users = global.db.users.length
         let chats = global.db.chats.filter(v => v.jid && v.jid.endsWith('.net')).length
         let groupList = async () => Object.entries(await client.groupFetchAllParticipating()).slice(0).map(entry => entry[1])
         let groups = await (await groupList()).map(v => v.id).length
         let banned = global.db.users.filter(v => v.banned).length
         let premium = global.db.users.filter(v => v.premium).length
         class Hit extends Array {
            total(key) {
               return this.reduce((a, b) => a + (b[key] || 0), 0)
            }
         }
         let sum = new Hit(...Object.values(global.db.statistic))
         let hitstat = sum.total('hitstat') != 0 ? sum.total('hitstat') : 0
         const stats = {
            users,
            chats,
            groups,
            banned,
            blocked: blockList.length,
            premium,
            hitstat,
            uptime: Func.toTime(process.uptime() * 1000)
         }
         const system = global.db.setting
         client.sendMessageModify(m.chat, statistic(Func, stats, system), m, {
            largeThumb: true,
            thumbnail: setting.cover
         })
      } catch (e) {
         client.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   error: false,
   cache: true,
   location: __filename
}

const statistic = (Func, stats, system) => {
   if (global.db.setting.style == 2) {
      return ` –  *B O T S T A T*

┌  ◦  ${Func.texted('bold', Func.formatNumber(stats.groups))} Groupes rejoints
│  ◦  ${Func.texted('bold', Func.formatNumber(stats.chats))} Discussions personnelles
│  ◦  ${Func.texted('bold', Func.formatNumber(stats.users))} Utilisateurs dans la base de données
│  ◦  ${Func.texted('bold', Func.formatNumber(stats.banned))} Utilisateurs bannis
│  ◦  ${Func.texted('bold', Func.formatNumber(stats.blocked))} Utilisateurs bloqués
│  ◦  ${Func.texted('bold', Func.formatNumber(stats.premium))} Utilisateurs Premium
│  ◦  ${Func.texted('bold', Func.formatNumber(stats.hitstat))} Commandes frappées
└  ◦  Durée : ${Func.texted('bold', stats.uptime)}

 –  *SYSTÈME*

┌  ◦  ${Func.texted('bold', system.autodownload ? '[ √ ]' : '[ × ]')}  Téléchargement automatique
│  ◦  ${Func.texted('bold', system.debug ? '[ √ ]' : '[ × ]')}  Mode débogage
│  ◦  ${Func.texted('bold', system.groupmode ? '[ √ ]' : '[ × ]')}  Mode groupe
│  ◦  ${Func.texted('bold', system.online ? '[ √ ]' : '[ × ]')}  Toujours en ligne
│  ◦  ${Func.texted('bold', system.self ? '[ √ ]' : '[ × ]')}  Mode autonome
│  ◦  ${Func.texted('bold', system.noprefix ? '[ √ ]' : '[ × ]')}  Pas de préfixe
│  ◦  Préfixe : ${Func.texted('bold', system.multiprefix ? '( ' + system.prefix.map(v => v).join(' ') + ' )' : '( ' + system.onlyprefix + ' )')}
└  ◦  Réinitialiser à : ${moment(system.lastReset).format('DD/MM/YYYY HH:mm')}

${global.footer}`
   } else {
      return `乂  *B O T S T A T*

	◦  ${Func.texted('bold', Func.formatNumber(stats.groups))} Groupes rejoints
	◦  ${Func.texted('bold', Func.formatNumber(stats.chats))} Discussions personnelles
	◦  ${Func.texted('bold', Func.formatNumber(stats.users))} Utilisateurs dans la base de données
	◦  ${Func.texted('bold', Func.formatNumber(stats.banned))} Utilisateurs bannis
	◦  ${Func.texted('bold', Func.formatNumber(stats.blocked))} Utilisateurs bloqués
	◦  ${Func.texted('bold', Func.formatNumber(stats.premium))} Utilisateurs Premium
	◦  ${Func.texted('bold', Func.formatNumber(stats.hitstat))} Commandes frappées
	◦  Durée : ${Func.texted('bold', stats.uptime)}

乂  *S Y S T E M*

	◦  ${Func.texted('bold', system.autodownload ? '[ √ ]' : '[ × ]')}  Téléchargement automatique
	◦  ${Func.texted('bold', system.debug ? '[ √ ]' : '[ × ]')}  Mode débogage
	◦  ${Func.texted('bold', system.groupmode ? '[ √ ]' : '[ × ]')}  Mode groupe
	◦  ${Func.texted('bold', system.online ? '[ √ ]' : '[ × ]')}  Toujours en ligne
	◦  ${Func.texted('bold', system.self ? '[ √ ]' : '[ × ]')}  Mode autonome
	◦  ${Func.texted('bold', system.noprefix ? '[ √ ]' : '[ × ]')}  Pas de préfixe
	◦  Préfixe : ${Func.texted('bold', system.multiprefix ? '( ' + system.prefix.map(v => v).join(' ') + ' )' : '( ' + system.onlyprefix + ' )')}
	◦  Réinitialiser à : ${moment(system.lastReset).format('DD/MM/YYYY HH:mm')}

${global.footer}`
   }
}