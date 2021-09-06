const ejs = require('ejs')
const path = require('path')

const html = '<div><%= user.name %></div>'

const options = {}

const data = {
    user: {
        name: 'myf'
    }
}

const data2 = {
    user: {
        name: 'aaa'
    }
}

// 返回compiled function，用于解析html中的ejs模板
// const template = ejs.compile(html, options)

// const compiledTemplate = template(data)
// const compiledTemplate2 = template(data2)

// console.log(compiledTemplate)
// console.log(compiledTemplate2)


// 第二种用法
// const renderedTemplte = ejs.render(html, data, options)
// console.log(renderedTemplte)


// // 第三种用法
// // 3.1 Promise
// const renderedFile = ejs.renderFile(path.resolve(__dirname, 'template.html'), data, options)
// renderedFile.then(file => console.log(file))

// 3.2 callback
const data3 = {
    user: {
        name: 'myf',
        nickname: '<div>aaa</div>'
    }
}
ejs.renderFile(path.resolve(__dirname, 'template.html'), data3, options, (err, file) => {
    console.log(file)
})
