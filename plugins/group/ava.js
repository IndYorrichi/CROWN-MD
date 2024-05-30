exports.run = {
   usage: ['ava'],
   use: 'mentionner ou répondre',
   category: 'group',
   async: async (m, {
      client,
      text,
      Func
   }) => {
      let number = isNaN(text) ? (text.startsWith('+') ? text.replace(/[()+\s-]/g, '') : (text).split`@` [1]) : text
      if (!text && !m.quoted) return client.reply(m.chat, Func.texted('bold', `🚩 Mentionner ou répondre à la cible du chat.`), m)
      if (isNaN(number)) return client.reply(m.chat, Func.texted('bold', `🚩 Numéro invalide.`), m)
      if (number.length > 15) return client.reply(m.chat, Func.texted('bold', `🚩 Format invalide.`), m)
      try {
         if (text) {
            var user = number + '@s.whatsapp.net'
         } else if (m.quoted.sender) {
            var user = m.quoted.sender
         } else if (m.mentionedJid) {
            var user = number + '@s.whatsapp.net'
         }
      } catch (e) {} finally {
         var pic = false
         try {
            var pic = await client.profilePictureUrl(user, 'image')
         } catch {} finally {
            if (!pic) return client.reply(m.chat, Func.texted('bold', `🚩 Il/Elle n'a pas mis de photo de profil.`), m)
            client.sendFile(m.chat, pic, '', '', m)
         }
      }
   },
   error: false,
   cache: true,
   location: __filename
}