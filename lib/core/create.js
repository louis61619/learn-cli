const program = require('commander')

const { creareProjectAction, addComponentAction, addPageAndRoute, addStoreAction } = require('./action')


const createCommands = () => {
  program
    .command('create <project> [others...]') //指令
    .description('clone reppository into  a folder') //描述
    .action(creareProjectAction) //操作
    
  program
    .command('addcpn <name>')
    .description('add vue component, 例如: renny addcpn HelloWorld -d src/components')
    .action((name) => { //program.dest讀取路徑
      addComponentAction(name, program.dest || 'src/components')
    })
  
  program
    .command('addpage <page>')
    .description('add vue page and router config, 例如: why addpage Home [-d src/pages]')
    .action((page) => {
      addPageAndRoute(page, program.dest || `src/pages`)
    })

  program
    .command('addstore <store>')
    .description('add store config')
    .action((store) => {
      addStoreAction(store, program.dest || `src/store/modules`)
    })

}



module.exports = createCommands;