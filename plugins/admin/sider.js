exports.run = {
   usage: ['nonconnecter'],
   use: '(option)',
   category: 'admin tools',
   async: async (m, {
      client,
      args,
      isPrefix,
      command,
      participants,
      isBotAdmin,
      Func
   }) => {
      try {
         let member = participants.filter(u => u.admin == null).map(u => u.id)
         var day = 86400000 * 7,
            now = new Date() * 1
         var sider = []
         member.filter(jid => {
            if (!global.db.users.some(v => v.jid == jid) && typeof global.db.groups.find(v => v.jid == m.chat).member[jid] === 'undefined' && jid != client.decodeJid(client.user.id)) sider.push(jid)
         })
         var lastseen = Object.entries(global.db.groups.find(v => v.jid == m.chat).member).filter(([jid, data]) => data.lastseen).sort((a, b) => a[1].lastseen - b[1].lastseen).filter(([v, x]) => x.lastseen != 0 && ((now - x.lastseen > day) || (now - global.db.users.find(c => c.jid == v).lastseen > day)) && (global.db.users.some(c => c.jid == v) && !global.db.users.find(c => c.jid == v).premium && !global.db.users.find(c => c.jid == v).whitelist) && v != client.decodeJid(client.user.id))
         if (args && args[0] == '-y') {
            if (!isBotAdmin) return client.reply(m.chat, global.status.botAdmin, m)
            let arr = Object.entries(lastseen).map(([jid, _]) => jid).concat(sider)
            if (arr.length == 0) return client.reply(m.chat, Func.texted('bold', `🚩 Il n'y a aucun sider dans ce groupe.`), m)
            for (let jid of arr) {
               await Func.delay(2000)
               await client.groupParticipantsUpdate(m.chat, [jid], 'remove')
            }
            await client.reply(m.chat, Func.texted('bold', `🚩 Terminé, ${arr.length} siders supprimés avec succès.`), m)
         } else {
            if (sider.length == 0 && lastseen.length == 0) return client.reply(m.chat, Func.texted('bold', `🚩 Il n'y a aucun sider dans ce groupe.`), m)
            let teks = `乂  *S I D E R*\n\n`
            teks += sider.length == 0 ? '' : `“Liste de *${sider.length}* membres aucune activité.”\n\n`
            teks += sider.length == 0 ? '' : sider.map(v => '	◦  @' + v.replace(/@.+/, '')).join('\n')
            teks += '\n\n'
            teks += lastseen.length == 0 ? '' : `“Liste des membres *${lastseen.length}* non connectés depuis 1 semaine.”\n\n`
            teks += lastseen.length == 0 ? '' : lastseen.map(([v, x]) => '	◦  @' + v.replace(/@.+/, '') + '\n	     *DèrnièreVue* : ' + Func.toDate(now - x.lastseen).split('D')[0] + ' il y a quelques jours').join('\n')
            teks += `\n\n*Note* : Cette fonctionnalité sera précise lorsque le bot sera dans le groupe depuis 1 semaine, envoyez *${isPrefix + command} -y* pour le supprimer.`
            teks += `\n\n${global.footer}`
            client.reply(m.chat, teks, m)
         }
      } catch (e){
         client.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   error: false,
   admin: true,
   group: true
}