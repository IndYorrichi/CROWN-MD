const { readFileSync: read, unlinkSync: remove } = require('fs')
const path = require('path')
const { exec } = require('child_process')
const { tmpdir } = require('os')
exports.run = {
   usage: ['enimg'],
   use: 'autocollant de réponse',
   category: 'converter',
   async: async (m, {
      client,
      Func
   }) => {
      try {
         if (!m.quoted) return client.reply(m.chat, Func.texted('bold', `🚩 Répondez à l'autocollant que vous souhaitez convertir en image/photo (non pris en charge pour l'animation d'autocollant)).`), m)
         if (m.quoted.mimetype != 'image/webp') return client.reply(m.chat, Func.texted('bold', `🚩 Répondez à l'autocollant que vous souhaitez convertir en image/photo (non pris en charge pour l'animation d'autocollant)).`), m)
         let media = await client.saveMediaMessage(m.quoted)
         let file = Func.filename('png')
         let isFile = path.join(tmpdir(), file)
         exec(`ffmpeg -i ${media} ${isFile}`, (err, stderr, stdout) => {
            remove(media)
            if (err) return client.reply(m.chat, Func.texted('bold', `🚩 Échec de la conversion.`), m)
            const buffer = read(isFile)
            client.sendFile(m.chat, buffer, '', '', m)
            remove(isFile)
         })
      } catch (e) {
         console.log(e)
         return client.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   error: false,
   limit: true,
   cache: true,
   location: __filename
}