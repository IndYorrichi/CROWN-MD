exports.run = {
   usage: ['q'],
   use: 'répondre au chat',
   category: 'group',
   async: async (m, {
      client,
      store
   }) => {
      try {
         if (!m.quoted) return client.reply(m.chat, Func.texted('bold', `🚩 Répondre au message contenant des citations.`), m)
         const msg = await store.loadMessage(m.chat, m.quoted.id)
         if (msg.quoted === null) return client.reply(m.chat, Func.texted('bold', `🚩 Le message ne contient pas de guillemets.`), m)
         return client.copyNForward(m.chat, msg.quoted.fakeObj)
      } catch (e) {
         client.reply(m.chat, `🚩 Impossible de charger le message.`, m)
      }
   },
   error: false,
   cache: true,
   location: __filename
}