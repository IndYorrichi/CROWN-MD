exports.run = {
   usage: ['proprietaire', 'owner'],
   category: 'information',
   async: async (m, {
      client,
      env,
      Func
   }) => {
      client.sendContact(m.chat, [{
         name: env.owner_name1,
         number: env.owner1,
         about: 'Owner & Creator'
      }, {
         name: env.owner_name2,
         number: env.owner2,
         about: 'Co-Owner'
      }, {
         name: env.owner_name3,
         number: env.owner3,
         about: 'Co-Owner'
      }], m, {
         org: 'AndyMrlit Network',
         website: 'https://andymrlit.xyz',
         email: 'andysebastien14@gmail.com'
      })
   },
   error: false,
   cache: true,
   location: __filename
}
