exports.run = {
   usage: ['regles', 'script'],
   hidden: ['sc'],
   category: 'informations utilisateur',
   async: async (m, {
      client,
      args,
      command
   }) => {
      if (command == 'script' || command == 'repo') return client.reply(m.chat, info(), m)
      if (command == 'regles') return client.sendMessageModify(m.chat, tnc(), m, {
         largeThumb: true
      })
   },
   error: false,
   cache: true,
   location: __filename
}

let info = () => {
   return `Ce bot a été créé et développé par l'équipe ralzada dans le but d'apprendre.
   
Script gratuit :
- https://github.com/mrlit-a/crown-md

80% des données envoyées par ce bot proviennent de mon API Rest.
}

const tnc = () => {
  return `➠ Les données des utilisateurs, des groupes et des chats seront automatiquement supprimées si aucune activité n'est détectée pendant 7 jours (raison : nettoyage de la base de données).

➠ Les utilisateurs gratuits obtiennent plus de 50/jour et se réinitialiseront après 12 heures.

➠ Voici le groupe officiel et le canal officiel :
➠ Lien du canal : à venir

➠ Lien du groupe : https://chat.whatsapp.com/F3yhzMx25SWF50fBFfc55D

➠ Ne spammez pas, faites une pause de 3 secondes entre chaque commande.

➠ Ne passez pas d'appels vocaux ou vidéo (appels téléphoniques et vidéos), sinon vous serez bloqué.

➠ Ne soyez pas toxique envers les bots car vous recevrez des sanctions sous forme d'interdiction et de blocage.

➠ Ne recherchez pas et ne créez pas de contenu pour adultes (+18), par exemple : créer des autocollants à partir de photos nues ou rechercher des soupirs ASMR.

➠ Les spammeurs seront définitivement bannis pour les utilisateurs gratuits et premium (sans remboursement).

➠ Tous les Termes & Conditions sont sujets à modification à tout moment sans préavis.`
}
