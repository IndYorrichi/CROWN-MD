exports.run = {
   usage: ['setwm'],
   use: 'nom du pack | auteur',
   category: 'propriétaire',
   async: async (m, {
      client,
      text,
      isPrefix,
      command,
      Func
   }) => {
      try {
         let setting = global.db.setting
         if (!text) return client.reply(m.chat, Func.example(isPrefix, command, 'autocollant par | @crownbot'), m)
         let [packname, ...author] = text.split`|`
         author = (author || []).join`|`
         setting.sk_pack = packname || ''
         setting.sk_author = author || ''
         client.reply(m.chat, Func.texted('bold', `🚩 filigrane d'autocollant défini avec succès.`), m)
      } catch (e) {
         client.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   owner: true,
   cache: true,
   location: __filename
}