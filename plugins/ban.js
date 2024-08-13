// MI.RICH¥
 const {
 addnote,
 smd,
 sck1,
 delnote,
 allnotes,
 delallnote,
 tlang,
 botpic,
 runtime,
 prefix,
 Config,
 sleep,
} = require('../lib')
const { TelegraPh } = require('../lib/scraper')
const util = require('util')
//---------------------------------------------------------------------------
smd(
 {
  pattern: 'ban',
  category: 'banned',
  
  desc: 'Bans user from using bot.',
 },
 async (Void, citel, text, { isCreator }) => {
  if (!isCreator) return citel.reply(tlang().owner)
  try {
   let users = citel.mentionedJid ? citel.mentionedJid[0] : citel.msg.contextInfo.participant || false
   if (!users) return citel.reply(` Please mention any user ${tlang().greet}.`)
   let pushnamer = Void.getName(users)
   sck1.findOne({ id: users }).then(async usr => {
    if (!usr) {
     await new sck1({ id: users, ban: 'true' }).save()
     return citel.reply(`_Banned ${usr.name} from Using Commands._`)
    } else {
     if (usr.ban == 'true') return citel.reply(`${pushnamer} is already Banned from Using Commands`)
     await sck1.updateOne({ id: users }, { ban: 'true' })
     return citel.reply(`_Successfully Banned ${usr.name} from Using Commands._`)
    }
   })
  } catch (e) {
   console.log(e)
   return citel.reply('Please mention any user. ')
  }
 }
)
//---------------------------------------------------------------------------
smd(
 {
  pattern: 'unban',
  category: 'banned',
  
  desc: 'Unbans banned user (from using bot).',
 },
 async (Void, citel, text, { isCreator }) => {
  if (!isCreator) return citel.reply('This command is onlt for my Owner')
  try {
   let users = citel.mentionedJid ? citel.mentionedJid[0] : citel.msg.contextInfo.participant || false
   if (!users) return citel.reply('Please mention any user.')
   let pushnamer = Void.getName(users)
   sck1.findOne({ id: users }).then(async usr => {
    if (!usr) {
     console.log(usr.ban)
     return citel.reply(`${pushnamer} is unbanned.`)
    } else {
     console.log(usr.ban)
     if (usr.ban !== 'true') return citel.reply(`${usr.name} is already unbanned.`)
     await sck1.updateOne({ id: users }, { ban: 'false' })
     return citel.reply(`${usr.name} is free as a DOG now`)
    }
   })
  } catch {
   return citel.reply('Please mention any user.')
  }
 }
)
