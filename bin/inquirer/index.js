const inquirer = require('inquirer')

inquirer
  .prompt([
    /* Pass your questions in here */
    // {
    //     type: 'input',
    //     name: 'yourName',
    //     message: 'your name:',
    //     default: 'noname',
    //     // 做输入的校验
    //     validate: function(v) {
    //         // return v === 'myf'
    //         return typeof v === 'string'
    //     },
    //     // 展示的信息，并不是最终的结果
    //     transformer: function(v) {
    //         return `${v}(input your name)`
    //     },
    //     // filter会改变最终的结果
    //     filter: function(v) {
    //         return `name[${v}]`
    //     }
    // },
    // {
    //     type: 'number',
    //     name: 'num',
    //     message: 'your number:'
    // },
    // {
    //   type: 'confirm',
    //   name: 'choice',
    //   message: 'your choice',
    //   default: false
    // // },
    // {
    //   type: 'list',
    //   // 交互形式略有不同
    //   type: 'rawlist',
    //   name: 'choice',
    //   message: 'your choice',
    //   choices: [
    //     {
    //       value: 1,
    //       name: 'm'
    //     },
    //     {
    //       value: 2,
    //       name: 'y'
    //     },
    //     {
    //       value: 3,
    //       name: 'f'
    //     },
    //   ],
    //   // 这里对应的是顺序
    //   default: 0
    // },
    
    // {
    //   type: 'expand',
    //   name: 'choice',
    //   message: 'your choice',
    //   choices: [
    //     {
    //       key: 'R',
    //       value: 'red'
    //     },
    //     {
    //       key: 'G',
    //       value: 'green'
    //     },
    //     {
    //       key: 'B',
    //       value: 'blue'
    //     },
    //   ],
    //   default: 'red'
    // },
    // {
    //   type: 'checkbox',
    //   name: 'choice',
    //   message: 'your choice',
    //   choices: [
    //     {
    //       value: 1,
    //       name: 'm'
    //     },
    //     {
    //       value: 2,
    //       name: 'y'
    //     },
    //     {
    //       value: 3,
    //       name: 'f'
    //     },
    //   ],
    // },
    // {
    //   type: 'password',
    //   name: 'password',
    //   message: 'your password',
    // },
    {
      type: 'editor',
      name: 'editor',
      message: 'your editor',
    },
  ])
  .then((answers) => {
    // 用户输入的信息
    // Use user feedback for... whatever!!
    console.log(answers)
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });