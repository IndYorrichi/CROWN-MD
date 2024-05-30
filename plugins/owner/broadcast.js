exports.run = {
   usage: ['bc', 'bcgc'],
   use: 'envoyer des SMS A TLM',
   category: 'propriétaire',
   async: async (m, {
      client,
      text,
      command,
      Func
   }) => {
      try {
         let q = m.quoted ? m.quoted : m
         let mime = (q.msg || q).mimetype || ''
         let chatJid = global.db.chats.filter(v => v.jid && v.jid.endsWith('.net')).map(v => v.jid)
         let groupList = async () => Object.entries(await client.groupFetchAllParticipating()).slice(0).map(entry => entry[1])
         let groupJid = await (await groupList()).map(v => v.id)
         const id = command == 'bc' ? chatJid : groupJid
         if (id.length == 0) return client.reply(m.chat, Func.texted('bold', `🚩 Erreur, l'identifiant n'existe pas.`), m)
         client.sendReact(m.chat, '🕒', m.key)
         if (text) {
            for (let jid of id) {
               await Func.delay(1500)
               await client.sendMessageModify(jid, text, null, {
                  title: global.botname,
                  thumbnail: await Func.fetchBuffer('https://telegra.ph/file/aa76cce9a61dc6f91f55a.jpg'),
                  largeThumb: true,
                  url: global.db.setting.link,
                  mentions: command == 'bcgc' ? await (await client.groupMetadata(jid)).participants.map(v => v.id) : []
               })
            }
            client.reply(m.chat, Func.texted('bold', `🚩 envoyer avec succès un message de diffusion à ${id.length} ${command == 'bc' ? 'chats' : 'groups'}`), m)
         } else if (/image\/(webp)/.test(mime)) {
            for (let jid of id) {
               await Func.delay(1500)
               let media = await q.download()
               await client.sendSticker(jid, media, null, {
                  packname: global.db.setting.sk_pack,
                  author: global.db.setting.sk_author,
                  mentions: command == 'bcgc' ? await (await client.groupMetadata(jid)).participants.map(v => v.id) : []
               })
            }
            client.reply(m.chat, Func.texted('bold', `🚩 envoyer avec succès un message de diffusion à ${id.length} ${command == 'bc' ? 'chats' : 'groups'}`), m)
         } else if (/video|image\/(jpe?g|png)/.test(mime)) {
            for (let jid of id) {
               await Func.delay(1500)
               let media = await q.download()
               await client.sendFile(jid, media, '', q.text ? '乂  *B R O A D C A S T*\n\n' + q.text : '', null, null,
                  command == 'bcgc' ? {
                     contextInfo: {
                        mentionedJid: await (await client.groupMetadata(jid)).participants.map(v => v.id)
                     }
                  } : {})
            }
            client.reply(m.chat, Func.texted('bold', `🚩 envoyer avec succès un message de diffusion à ${id.length} ${command == 'bc' ? 'chats' : 'groups'}`), m)
         } else if (/audio/.test(mime)) {
            for (let jid of id) {
               await Func.delay(1500)
               let media = await q.download()
               await client.sendFile(jid, media, '', '', null, null,
                  command == 'bcgc' ? {
                     ptt: q.ptt,
                     contextInfo: {
                        mentionedJid: await (await client.groupMetadata(jid)).participants.map(v => v.id)
                     }
                  } : {})
            }
            client.reply(m.chat, Func.texted('bold', `🚩 envoyer avec succès un message de diffusion à ${id.length} ${command == 'bc' ? 'chats' : 'groups'}`), m)
         } else client.reply(m.chat, Func.texted('bold', `🚩 Medias / texte introuvable ou média non pris en charge.`), m)
      } catch (e) {
         client.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   owner: true
}