exports.run = {
   usage: ['rejoindre'],
   use: 'lien de groupe',
   category: 'propriétaire',
   async: async (m, {
      client,
      args,
      isPrefix,
      command,
      Func
   }) => {
      try {
         if (!args || !args[0]) return client.reply(m.chat, Func.example(isPrefix, command, 'https://chat.whatsapp.com/codeInvite'), m)
         let link = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i
         let [_, code] = args[0].match(link) || []
         if (!code) return client.reply(m.chat, global.status.invalid, m)
         let id = await client.groupAcceptInvite(code)
         if (!id.endsWith('g.us')) return client.reply(m.chat, Func.texted('bold', `🚩 désolé, je ne peux pas rejoindre ce groupe :(`), m)
         let member = await (await client.groupMetadata(id)).participants.map(v => v.id)
         return client.reply(m.chat, `🚩 rejointe!`, m)
      } catch {
         return client.reply(m.chat, Func.texted('bold', `🚩 désolé, je ne peux pas rejoindre ce groupe :(`), m)
      }
   },
   owner: true
}