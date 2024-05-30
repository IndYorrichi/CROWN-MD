const moment = require('moment-timezone')
moment.tz.setDefault(global.timezone)
exports.run = {
   usage: ['couple'],
   category: 'group',
   async: async (m, {
      client,
      participants
   }) => {
      let member = participants.map(u => u.id)
      let now = new Date * 1
      var tag1 = member[Math.floor(member.length * Math.random())]
      var tag2 = member[Math.floor(member.length * Math.random())]
      if (tag1 == tag2) {
         for (let i = 0; i < 5; i++) {
            var tag1 = member[Math.floor(member.length * Math.random())]
            var tag2 = member[Math.floor(member.length * Math.random())]
            if (tag1 != tag2) {
               break
            }
         }
      }
      client.reply(m.chat, `Meilleur couple aléatoire : @${tag1.replace(/@.+/, '')} 💞 @${tag2.replace(/@.+/, '')}, Un nouveau couple du jour pourra être choisi à _${moment(now).format('DD/MM/YYYY HH:mm')}._`)
   },
   group: true
}