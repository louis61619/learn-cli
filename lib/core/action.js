const { promisify } = require('util');

const download = promisify(require('download-git-repo'))
const open = require('open')

const { vueRepo } = require('../config/repo-config')
const terminal = require('../utils/terminal');
const { compile } = require('../utils/utils')

//通過 promisify (函數) 轉成 promise 並使用 async 寫代碼
const creareProjectAction = async (project) => {
  console.log("renny help you create your project~")
  //1.clone項目
  await download(vueRepo, project, { clone: true });

  //2.執行npm install
  const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm'; //platform代表的是平台 Win32是window環境，在window上執行的是window.cmd
  await terminal.spawn(npm, ['install'], { cwd: `./${project}` });

  //3.執行npm run serve 不能使用await 因為會被阻塞
  terminal.spawn(npm, ['run', 'serve'], { cwd: `./${project}` })

  //4.打開瀏覽器
  open('http://localhost:8080/')
}

//添加組件的action 
const addComponentAction = (name, dest) => {
  //1.有對應的ejs模塊
  compile("vue-component.ejs")
  //2.編寫ejs模板代碼 result
  //3.將result寫入到.vue文件中
  //4.放入文件夾

}

module.exports = {
  creareProjectAction,
  addComponentAction
}