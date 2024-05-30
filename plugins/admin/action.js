exports.run = {
   usage: ['ajouter', 'promouvoir', 'retrograder', 'retirer'],
   use: 'mentionner ou répondre',
   category: 'admin tools',
   async: async (m, {
      client,
      text,
      isPrefix,
      command,
      participants,
      Func
   }) => {
      let input = text ? text : m.quoted ? m.quoted.sender : m.mentionedJid.length > 0 ? m.mentioneJid[0] : false
      if (!input) return client.reply(m.chat, Func.texted('bold', `🚩 Mentionner ou répondre à la cible du chat.`), m)
      let p = await client.onWhatsApp(input.trim())
      if (p.length == 0) return client.reply(m.chat, Func.texted('bold', `🚩 Numéro invalide.`), m)
      let jid = client.decodeJid(p[0].jid)
      let number = jid.replace(/@.+/, '')
      if (command == 'retirer') {
         let member = participants.find(u => u.id == jid)
         if (!member) return client.reply(m.chat, Func.texted('bold', `🚩 @${number} déjà parti ou n'existe pas dans ce groupe.`), m)
         client.groupParticipantsUpdate(m.chat, [jid], 'remove').then(res => m.reply(Func.jsonFormat(res)))
      } else if (command == 'ajouter') {
         // if (!isOwner) return client.reply(m.chat, global.status.owner, m)
         let member = participants.find(u => u.id == jid)
         if (member) return client.reply(m.chat, Func.texted('bold', `🚩 @${number} déjà dans ce groupe.`), m)
         client.groupParticipantsUpdate(m.chat, [jid], 'ajouter').then(res => m.reply(Func.jsonFormat(res)))
      } else if (command == 'retrograder') {
         let member = participants.find(u => u.id == jid)
         if (!member) return client.reply(m.chat, Func.texted('bold', `🚩 @${number} déjà parti ou n'existe pas dans ce groupe.`), m)
         client.groupParticipantsUpdate(m.chat, [jid], 'demote').then(res => m.reply(Func.jsonFormat(res)))
      } else if (command == 'promouvoir') {
         let member = participants.find(u => u.id == jid)
         if (!member) return client.reply(m.chat, Func.texted('bold', `🚩 @${number} déjà parti ou n'existe pas dans ce groupe.`), m)
         client.groupParticipantsUpdate(m.chat, [jid], 'promote').then(res => m.reply(Func.jsonFormat(res)))
      }
   },
   group: true,
   admin: true,
   botAdmin: true
}
