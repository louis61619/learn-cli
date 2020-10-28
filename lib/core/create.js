const program = require('commander')

const { creareProjectAction, addComponentAction } = require('./action')

const createCommands = () => {
  program
    .command('create <project> [others...]') //指令
    .description('clone reppository into  a folder') //描述
    .action(creareProjectAction) //操作
    
  program
    .command('addcpn <name>')
    .description('add vue component, 例如: renny addcpn HelloWorld -d src/components')
    .action((name) => {
      addComponentAction(name, program.dest || 'src/components')
    })

}



module.exports = createCommands;