exports.run = {
   usage: ['durer'],
   hidden: ['run'],
   category: 'information',
   async: async (m, {
      client,
      Func
   }) => {
      let _uptime = process.uptime() * 1000
      let uptime = Func.toTime(_uptime)
      client.reply(m.chat, Func.texted('bold', `Dure pendant : [ ${uptime} ]`), m)
   },
   error: false
}