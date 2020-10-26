const ejs = require('ejs')
const path = require('path')

const compile = (templateName, data) => {
  const templatePosition = `../templates/${templateName}`
  const templatePath = path.resolve(__dirname, templatePosition)

  console.log(templatePath)
  // ejs.renderFile(templatePath) //傳入絕對路徑

}

module.exports = {
  compile
}