const fs = require('fs')

//Bot Setting
global.owner = ['6285765334291'] //Own Number
global.urlfoto = 'https://files.catbox.moe/sk48fr.jpg' //Url Foto 
global.url = 'https://whatsapp.com/channel/0029VazqfJY8KMqqrvHFrv0Y' //Url Channel dev
global.developer = "LiamOfc" //Dev Name
global.botname = "Goozuji" //Bot Name
global.version = "12.5.0" //Version Bot
global.footer = "Goo" //footer section
global.status = true //"self/public" section of the bot
global.autoreactDB = '120363378510313540' //Global auto react Channel 

//Sticker Setiings
global.packname = "Sticker By" //Pack Name 
global.author = "Theflash" // Author

global.lol = "";
global.mess = {
    owner: "𝐖𝐡𝐚𝐭𝐬?"
}

let file = require.resolve(__filename)
require('fs').watchFile(file, () => {
  require('fs').unwatchFile(file)
  console.log('\x1b[0;32m'+__filename+' \x1b[1;32mupdated!\x1b[0m')
  delete require.cache[file]
  require(file)
})
