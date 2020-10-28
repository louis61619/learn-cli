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

const writeToFile = (path, content) => {
  return fs.promises.writeFile(path, content)
}

module.exports = {
  compile,
  writeToFile
}