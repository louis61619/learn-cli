const ejs = require('ejs')
const path = require('path')
const fs = require('fs')

const compile = (templateName, data) => {
  const templatePosition = `../templates/${templateName}`
  const templatePath = path.resolve(__dirname, templatePosition)

  // ejs.renderFile(templatePath) //傳入絕對路徑

  return new Promise((resolve, reject) => {
    ejs.renderFile(templatePath, { data }, {}, (err, result) => {
      if (err) {
        console.log(err);
        reject(err)
        return
      }

      resolve(result)
    })
  })
}

// fs.mkdirSync(targetDir, { recursive: true });
const createDirSync = (pathName) => {
  if(fs.existsSync(pathName)) { //判斷文件夾是否存在 如果存在返回TRUE
    return true
  } else {
    //遞規判斷
    if (createDirSync(path.dirname(pathName))) { //一直往文件夾的上層找，如果找到才繼續執行
      console.log(pathName)
      fs.mkdirSync(pathName); //找到的話就創建文件夾，然後?
      return true;
    }
  }

}

const writeToFile = (pathName, content) => {
  //判斷文件夾是否存在，如果不存在，創建對應的文件夾
  // if(createDirSync(path.dirname(pathName))) { //我的寫法，直接傳上一層路徑
  //   return fs.promises.writeFile(pathName, content)
  // }

  //(老師的寫法)
  return fs.promises.writeFile(pathName, content)
}

module.exports = {
  compile,
  writeToFile,
  createDirSync
}