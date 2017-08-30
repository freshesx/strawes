const WebpackProdRunner = require('freshes-man/helpers/WebpackProdRunner')
const path = require('path')

module.exports = new WebpackProdRunner({
  cssSourceMap: false,
  cssMinimize: true,
  cssExtract: true,
  appPath: path.join(process.cwd(), 'examples'),
  testPath: path.join(process.cwd(), 'examples/test'),
  sassResources: path.join(process.cwd(), 'examples/human/config.scss')
}).run()
