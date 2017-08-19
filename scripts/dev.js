const WebpackDevRunner = require('freshes-man/helpers/WebpackDevRunner')
const path = require('path')

module.exports = new WebpackDevRunner({
  appPath: path.join(process.cwd(), 'examples'),
  testPath: path.join(process.cwd(), 'examples/test'),
  sassResources: path.join(process.cwd(), 'examples/human/config.scss'),
  port: 8010,
  proxyTable: {
    '/v2': {
      target: 'https://api.douban.com',
      changeOrigin: true
    }
  }
}).run()
