const cp = require('child_process')
const path = require('path')

// console.log(cp)

// exec 主要是用来执行shell脚本，和普通命令相比，他可以是一个连续的语句
// 结果只能从回调函数里取，没有回调函数跑控制台是没有输出的
// cp.exec('ls -al | grep node_modules', function (err, stdout, stderr) {
//     console.log(err)
//     console.log(stdout)
//     console.log(stderr)
// })

// execFile用来执行一个文件
// cp.execFile('ls', ['-al'],function (err, stdout, stderr) {
//     console.log(err)
//     console.log(stdout)
//     console.log(stderr)
// })

// path.resolve('./')  ./相对的是命令执行的
// console.log(path.resolve('./', 'test.shell'))
// console.log(path.resolve(__dirname, 'test.shell'))
// 当前文件所在的文件路径：__dirname
// console.log(__filename, __dirname)

// chmod +x bin/process/test.shell   添加可执行权限
// cp.execFile(path.resolve(__dirname, 'test.shell'),['-al', '-bl'], function (err, stdout, stderr) {
//     console.log(err)
//     console.log(stdout)
//     console.log(stderr)
// })

// exec不支持传入参数arguments
// cwd改变执行路径
// timeout 多少毫秒超时
// cp.exec(path.resolve(__dirname, 'test.shell'), function (err, stdout, stderr) {
//     console.log(err)
//     console.log(stdout)
//     console.log(stderr)
// })


// exec execFile fork底层原理都是用的spawn
// const child = cp.spawn(path.resolve(__dirname, 'test.shell'), ['-al', '-bl'], {
//     cwd: path.resolve('..')
// })
// const child = cp.spawn('npm', ['install'], {
//     cwd: path.resolve('/Users/WORK/LEARN/ARCHITECT/CLI/imooc-test-myf-lib')
// })
const child = cp.spawn('npm', ['install'], {
    cwd: path.resolve('/Users/WORK/LEARN/ARCHITECT/CLI/imooc-test-myf-lib'),
    // stdio: 'pipe', // 他意味着我们创建一个子进程之后，子进程和父进程会建立起一个通道
    stdio: 'inherit', // 他将stdio传给父进程。即将输入stdin、输出stdout、error即stderr和父进程进行绑定。此时无需去监听结果直接把结果打印出来
})
// 子进程id 主进程id
// console.log(child.pid, process.pid)
// child.stdout.on('data', function(chunk) {
//     console.log('stdout', chunk.toString())
// })

// child.stderr.on('data', function(chunk) {
//     console.log('stderr', chunk.toString())
// })

// spawn是一个流式的执行方式，适合一些耗时任务（比如npm install），需要不断日志
// exec/execFile：开销比较小的任务 execFile可以传四个参数，exec主要是用来执行shell脚本的

// 此处打印日志是一次性打印的
// cp.exec('npm install',{
//     cwd: path.resolve('/Users/WORK/LEARN/ARCHITECT/CLI/imooc-test-myf-lib')
// }, function (err, stdout, stderr) {
//     console.log(err)
//     console.log(stdout)
//     console.log(stderr)
// })

// fork用来创建子进程，子进程用node进行执行
// const child = cp.fork(path.resolve(__dirname, 'child.js'))
// require和fork有个本质的不同
// fork的过程中他会启动两个Node进程：Node(main) -> Node(child)
// fork本质也是调用的spawn，spawn他会创建一个子进程对象
// 通过这个子进程对象，可以进行子进程和主进程之间的通信
// send后会出现等待,可以使用disconnect断开
// fork使用场景：用一些耗时的操作，而且这些耗时操作是通过nodejs实现的，比如下载一个文件，下载文件的时候可以不断向主进程中传递消息；还可以实现多进程的下载，比如把下载模块分为若干块，每一块下载多少比例，然后拼成一个文件
// child.send('hello child process', () => {
//     // child.disconnect()
// })
// child.on('message', (msg) => {
//     console.log(msg)
// })

// console.log('main', process.pid)


// 下面讲同步方法

// execSync可用于执行一些简单的命令 
// 这三个方法execSync会用得比较多，但他有个最大的隐患就是对里边的安全性没有做校验，比如后面加了一些rm -rf之类的就会变得非常得危险，而在execFileSync中是执行不了的，因为他不能够直接去执行shell，如果你要执行单个的命令，从安全性角度讲可以用execFileSync
// const ret = cp.execSync('ls -al|grep node_modules')
// console.log(ret.toString())

// const ret2 = cp.execFileSync('ls', ['-al'])
// console.log(ret2.toString())

// const ret3 = cp.spawnSync('ls', ['-al'])
// console.log(ret3.stdout.toString())
