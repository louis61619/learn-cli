const program = require('commander');

const helpOptions = () => {
  //增加自己的option(定義可選參數)
  program.option('-w --why', 'a why cli');
  program.option('-d --dest <dest>', 'a destination folder, 例如: -d /src/components')

  program.on('--help', function () { //監聽事件
    console.log("")
    console.log("Other:")
    console.log(" other option~")
  })
}

module.exports = {helpOptions}
