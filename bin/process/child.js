console.log('child process')

console.log('child', process.pid)

process.on('message', (msg) => {
    console.log(msg)
})

process.send('hello main process')