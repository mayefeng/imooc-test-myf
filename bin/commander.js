#!/usr/bin/env node

// const lib = require('imooc-test-myf-lib')

// console.log(lib.sum(1,2))

// console.log('welcome imooc-test！！!!')

const commander = require('commander')
const pkg = require('../package.json')

// 获取commander的单例
// 想实现一些复用直接用program
// program就是一个脚手架的实例
// const { program } = commander

// 手动实例化一个Commander实例
const program = new commander.Command()

program
    // .name(Object.keys(pkg?.bin)[0])  // name会自动获取也可以手动传入
    .usage('<command> [options]')
    .version(pkg.version)
    .option('-d, --debug', '是否开启调试模式', false)
    .option('-e, --envName <envName>', '获取环境变量名称')
    // .parse(process.argv)

// console.log(program.opts().debug)
// console.log(program.opts().envName)
// // 直接打出帮助的信息
// program.outputHelp()

// console.log(program.opts())

// command注册命令的两种方式
// 1、command api注册命令
const clone =  program.command('clone <source> [destination]'); // 如果加了<>就是一个必须要传入的项，[]表示一个可选项
clone
    .description('clone a repository')
    .option('-f, --force', '是否强制克隆')
    .action((source, destination, cmdObj) => {
        console.log('do clone', source, destination)
        console.log(cmdObj.force)
    })

// 2、addCommand 注册子命令
const service = new commander.Command('service') // 完成了一个叫service的命令注册
service
    .command('start [port]')
    .description('start service at some port')
    .action((port) => {
        console.log('do service start', port)
    })
// 不能连写 
service
    .command('stop')
    .description('stop service')
    .action(() => {
        console.log('stop service')
    })

program.addCommand(service)

// 类似于Yargs.demandCommand
// program
//     .arguments('<cmd> [options]')
//     .description('test command', {
//         cmd: 'command to run',
//         options: 'options for command'
//     })
//     .action((cmd, options) => {
//         console.log(cmd, options)
//     })

// 多个脚手架之间串行使用
// imooc-test install init => imooc-cli-dev-myf init
program
    .command('install [name]', 'install package', {
        executableFile: 'imooc-cli-dev-myf',
        // isDefault: true, // 默认状态下去执行这个install，而不再命中上面这个cmd
        hidden: true // 在-h中看不到这个命令，做command的隐藏
    })
    .alias('i')

// 高级定制1：自定义help信息
// 直接打出帮助的信息
// program.outputHelp()
// 获取help信息
// console.log(program.helpInformation())
// 方式一
// program.helpInformation = () => '1\n'
// progarm是一个EventEmitter对象，事件监听
// 方式二
// program.on('--help', () => {
//     console.log('your help information')
// })

// 高级定制2：实现debug模式，监听到debug走到这个回调中
program.on('option:debug', () => {
    // console.log('debug', program.opts().debug)
    if (program.opts().debug) {
        // 他是早于我们命令执行之前处理的
        process.env.LOG_LEVEL = 'verbose'
    }
    console.log(process.env.LOG_LEVEL)
})

// 高级定制3：对未知命令进行监听
// 凡是进入这个回调都是未定义的命令
program.on('command:*', (obj) => {
    console.log(obj)
    console.error(`未知的命令：${obj[0]}`)
    console.log(program.commands[0].name())
    const availabelCommands = program.commands.map(cmd => cmd.name())
    console.log(`可用命令：${availabelCommands.join(',')}`)
})


program.parse(process.argv)
