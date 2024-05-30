exports.run = {
   usage: ['profil'],
   use: 'mentionner ou répondre',
   category: 'informations utilisateur',
   async: async (m, {
      client,
      text,
      isPrefix,
      blockList,
      env,
      Func
   }) => {
      let number = isNaN(text) ? (text.startsWith('+') ? text.replace(/[()+\s-]/g, '') : (text).split`@` [1]) : text
      if (!text && !m.quoted) return client.reply(m.chat, Func.texted('bold', `🚩 Mentionner ou répondre à la cible du chat.`), m)
      if (isNaN(number)) return client.reply(m.chat, Func.texted('bold', `🚩 Numéro invalide.`), m)
      if (number.length > 15) return client.reply(m.chat, Func.texted('bold', `🚩 Format invalide.`), m)
      var pic = await Func.fetchBuffer('./media/image/default.jpg')
      try {
         if (text) {
            var user = number + '@s.whatsapp.net'
         } else if (m.quoted.sender) {
            var user = m.quoted.sender
         } else if (m.mentionedJid) {
            var user = number + '@s.whatsapp.net'
         }
      } catch (e) {} finally {
         let target = global.db.users.find(v => v.jid == user)
         if (typeof target == 'undefined') return client.reply(m.chat, Func.texted('bold', `🚩 Impossible de trouver les données utilisateur.`), m)
         try {
            var pic = await Func.fetchBuffer(await client.profilePictureUrl(user, 'image'))
         } catch (e) {} finally {
            let blocked = blockList.includes(user) ? true : false
            let now = new Date() * 1
            let lastseen = (target.lastseen == 0) ? 'Never' : Func.toDate(now - target.lastseen)
            let usebot = (target.usebot == 0) ? 'Never' : Func.toDate(now - target.usebot)
            let caption = `乂  *U S E R - P R O F I L E*\n\n`
            caption += `	◦  *Nom* : ${target.name}\n`
            caption += `	◦  *Limite* : ${Func.formatNumber(target.limit)}\n`
            caption += `	◦  *état touché* : ${Func.formatNumber(target.hit)}\n`
            caption += `	◦  *Avertissement* : ${((m.isGroup) ? (typeof global.db.groups.find(v => v.jid == m.chat).member[user] != 'undefined' ? global.db.groups.find(v => v.jid == m.chat).member[user].warning : 0) + ' / 5' : target.warning + ' / 5')}\n\n`
            caption += `乂  *U S E R - S T A T U S*\n\n`
            caption += `	◦  *Bloqué* : ${(blocked ? '√' : '×')}\n`
            caption += `	◦  *banni* : ${(new Date - target.ban_temporary < env.timer) ? Func.toTime(new Date(target.ban_temporary + env.timeout) - new Date()) + ' (' + ((env.timeout / 1000) / 60) + ' min)' : target.banned ? '√' : '×'}\n`
            caption += `	◦  *Utiliser en privé* : ${(global.db.chats.map(v => v.jid).includes(user) ? '√' : '×')}\n`
            caption += `	◦  *Utilsateur Premium* : ${(target.premium ? '√' : '×')}\n`
            caption += `	◦  *Expiration* : ${target.expired == 0 ? '-' : Func.timeReverse(target.expired - new Date() * 1)}\n\n`
            caption += global.footer
            client.sendMessageModify(m.chat, caption, m, {
               largeThumb: true,
               thumbnail: pic
            })
         }
      }
   },
   error: false,
   cache: true,
   location: __filename
}