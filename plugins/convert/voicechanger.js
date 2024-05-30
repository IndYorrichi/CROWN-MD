const { Converter } = new(require('@neoxr/wb'))
const fs = require('fs')
const { exec } = require('child_process')
exports.run = {
   usage: ['basse', 'soufflé', 'tamia', 'profond', 'oreillette', 'rapide', 'gros', 'nocturne', 'inverse', 'robot', 'lent', 'lisse'],
   use: 'réponse audio',
   category: 'voice changer',
   async: async (m, {
      client,
      command,
      Func
   }) => {
      try {
         if (!m.quoted) return client.reply(m.chat, Func.texted('bold', `🚩 Répondez audio pour utiliser cette commande.`), m)
         let mime = ((m.quoted ? m.quoted : m.msg).mimetype || '')
         let set
         if (/basse/.test(command)) set = '-af equalizer=f=94:width_type=o:width=2:g=30'
         if (/soufflé/.test(command)) set = '-af acrusher=.1:1:64:0:log'
         if (/profond/.test(command)) set = '-af atempo=4/4,asetrate=44500*2/3'
         if (/oreillette/.test(command)) set = '-af volume=12'
         if (/rapide/.test(command)) set = '-filter:a "atempo=1.63,asetrate=44100"'
         if (/graisse/.test(command)) set = '-filter:a "atempo=1.6,asetrate=22100"'
         if (/noyau nocturne/.test(command)) set = '-filter:a atempo=1.06,asetrate=44100*1.25'
         if (/inverse/.test(command)) set = '-filter_complex "areverse"'
         if (/robot/.test(command)) set = '-filter_complex "afftfilt=real=\'hypot(re,im)*sin(0)\':imag=\'hypot(re,im)*cos(0)\':win_size=512:overlap=0.75"'
         if (/lent/.test(command)) set = '-filter:a "atempo=0.7,asetrate=44100"'
         if (/lisse/.test(command)) set = '-filter:v "minterpolate=\'mi_mode=mci:mc_mode=aobmc:vsbmc=1:fps=120\'"'
         if (/tamia/.test(command)) set = '-filter:a "atempo=0.5,asetrate=65100"'
         if (/audio/.test(mime)) {
            client.sendReact(m.chat, '🕒', m.key)
            const buffer = await Converter.toAudio(await m.quoted.download(), 'mp3')
            const parse = await Func.getFile(buffer)
            let ran = Func.filename('mp3')
            exec(`ffmpeg -i ${parse.file} ${set} ${ran}`, async (err, stderr, stdout) => {
               fs.unlinkSync(parse.file)
               if (err) return client.reply(m.chat, Func.texted('bold', `🚩 Échec de la conversion.`), m)
               let buff = fs.readFileSync(ran)
               if (m.quoted.ptt) return client.sendFile(m.chat, buff, 'audio.mp3', '', m, {
                  ptt: true
               }).then(() => {
                  fs.unlinkSync(ran)
               })
               client.sendFile(m.chat, buff, 'audio.mp3', '', m).then(() => {
                  fs.unlinkSync(ran)
               })
            })
         } else {
            client.reply(m.chat, Func.texted('bold', `🚩 Répondez audio pour utiliser cette commande.`), m)
         }
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
