exports.run = {
   usage: ['intrus'],
   use: '(option)',
   category: 'admin tools',
   async: async (m, {
      client,
      args,
      isPrefix,
      command,
      participants,
      Func
   }) => {
      try {
         let member = participants.filter(v => !v.admin).map(v => v.id).filter(v => !v.startsWith('253') && v != client.decodeJid(client.user.id))
         if (!args || !args[0]) {
            if (member.length == 0) return client.reply(m.chat, Func.texted('bold', `🚩 Ce groupe est exempt d'étrangers.`), m)
            let teks = `✅ *${member.length}* étrangers trouvés, envoyés *${isPrefix + command} -y* pour les supprimer.\n\n`
            teks += member.map(v => '◦  @' + v.replace(/@.+/, '')).join('\n')
            client.reply(m.chat, teks, m)
         } else if (args[0] == '-y') {
            for (let jid of member) {
               await Func.delay(2000)
               await client.groupParticipantsUpdate(m.chat, [jid], 'remove')
            }
            await client.reply(m.chat, Func.texted('bold', `🚩 Fait, ${member.length} les étrangers ont été supprimés avec succès.`), m)
         }
      } catch (e) {
         client.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   admin: true,
   group: true,
   botAdmin: true
}