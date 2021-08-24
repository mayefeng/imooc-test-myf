const npminstall = require('npminstall')
const path = require('path')
const userHome = require('user-home')

npminstall({
    root: path.resolve(userHome, '.imooc-cli-dev-test'), // 模块路径
    // 实际存储的位置
    storeDir: path.resolve(userHome, '.imooc-cli-dev-test', 'node_modules'),
    registry: 'https://registry.npmjs.org',
    pkgs: [
        {name: 'foo', version: '~1.0.0'}
    ],
})