const { promisify } = require('util');
const path = require('path')

const download = promisify(require('download-git-repo'))
const open = require('open')

const { vueRepo } = require('../config/repo-config')
const terminal = require('../utils/terminal');
const { compile, writeToFile, createDirSync } = require('../utils/utils')

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
const addComponentAction = async (name, dest) => {
  //1.有對應的ejs模塊 //2.編寫ejs模板代碼 result
  const result = await compile("vue-component.ejs", {name, lowerName: name.toLowerCase()})
  console.log(result)
  
  //3.將result寫入到.vue文件中 //4.放入文件夾
  const targetPath = path.resolve(dest, `${name}.vue`)
  // console.log(targetPath)
  writeToFile(targetPath, result)
  
}

//添加組件和路由
const addPageAndRoute = async (name, dest) => {
  //1.編譯ejs模板
  const pageResult = await compile('vue-component.ejs', {name, lowerName: name.toLowerCase()})
  const routeResult = await compile('vue-router.js.ejs', {name, lowerName: name.toLowerCase()})

  //2.寫入文件(我的寫法)
  // const targetPagePath = path.resolve(dest, `${name}.vue`)
  // const targetRoutePath = path.resolve(dest, 'router.js')
  // writeToFile(targetPagePath, pageResult);
  // writeToFile(targetRoutePath, routeResult)

  //src/pages/name
  const targetDest = path.resolve(dest, name.toLowerCase())

  //寫入文件(老師的寫法)
  if(createDirSync(targetDest)) {
    const targetPagePath = path.resolve(targetDest, `${name}.vue`)
    const targetRoutePath = path.resolve(targetDest, 'router.js')
    writeToFile(targetPagePath, pageResult);
    writeToFile(targetRoutePath, routeResult)
  }
}

const addStoreAction = async (name, dest) => {
  //編譯的過程
  const sotreResult = await compile('vue-store.js.ejs', {})
  const typeResult = await compile('vue-types.js.ejs', {})

  const targetDest = path.resolve(dest, name.toLowerCase())

  //創建文件
  if(createDirSync(targetDest)) {
    const targetStorePath = path.resolve(targetDest, `${name}.js`)
    const targetTyepPath = path.resolve(targetDest, 'types.js')
    writeToFile(targetStorePath, sotreResult);
    writeToFile(targetTyepPath, typeResult)
  }
}

module.exports = {
  creareProjectAction,
  addComponentAction,
  addPageAndRoute,
  addStoreAction
}