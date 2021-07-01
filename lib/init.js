#! /usr/bin/env node 
const { promisify } = require('util')
const figlet = promisify(require('figlet'))
const clear = require('clear')
const chalk = require('chalk')
const log = content => console.log('\r\n'+ chalk.green(content))
const { clone } = require('./download')
const open = require('open')
const spawn = require('cross-spawn');

//对接输出流
const spawns = async (...args) => {
    // const { spawn } = require('child_process')
    // .spawn(process.platform === 'win32' ? 'npm.cmd' : npm, args, {
    //     // stdio: 'inherit',
    //     cwd: projectPath
    //   })
    return new Promise(resolve => {
        const proc = spawn(...args)
        proc.stdout.pipe(process.stdout)
        proc.stderr.pipe(process.stderr)
        proc.on('close', (code) =>{
            // resolve()
            // 执行失败
            if(code !== 0) {
                console.log(chalk.red('Error occurred while installing dependencies!'));
                process.exit(1);
            }
            // 执行成功
            else {
                console.log(chalk.cyan('Install finished'))   
                resolve()
            }
        })
    })
}

// const spawn = async (...args) => {
//     const { spawn } = require('child_process')
//     // .spawn(process.platform === 'win32' ? 'npm.cmd' : npm, args, {
//     //     // stdio: 'inherit',
//     //     cwd: projectPath
//     //   })
//     return new Promise(resolve => {
//         const proc = spawn(...args)
//         proc.stdout.pipe(process.stdout)
//         proc.stderr.pipe(process.stderr)
//         proc.on('close', (code) =>{
//             // resolve()
//             // 执行失败
//             if(code !== 0) {
//                 console.log(chalk.red('Error occurred while installing dependencies!'));
//                 process.exit(1);
//             }
//             // 执行成功
//             else {
//                 console.log(chalk.cyan('Install finished'))   
//                 resolve()
//             }
//         })
//     })
// }



module.exports = async name => {
    clear()
    const data = await figlet.textSync('Vue Vite', {
        font: 'Ghost',
        horizontalLayout: 'default',
        verticalLayout: 'default',
        width: 130,
        whitespaceBreak: true
      })
    // const data = await figlet('Vite  Project')
    log(data)

    //clone
    log(`create project: ${name} `)
    clone('github:Bruce-yangs/vue-sell', name)

    // Automatic installation dependency 自动安装依赖
    log('Project installation dependency...')
    // await spawn('npm',['install'], {cwd: `./${name}`})
    // await spawn(process.platform === 'win32' ? 'npm.cmd' : 'npm',['install'], {cwd: `./${name}`})

    // await spawns('npm',['install'], {cwd: `./${name}`})
    // await spawns(/* process.platform === 'win32' ? 'npm.cmd' : */ 'npm',['install'], { stdio: 'inherit',/*  shell: process.platform === 'win32', */cwd: `./${name}`})


    /* new spawn */

    // 执行安装

    // const child = await spawn(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['install'], { 
    //     stdio: 'inherit' ,
    //     cwd: `./${name}`
    // });
    // // 监听执行结果
    // child.on('close', function(code) {
    //     // 执行失败
    //     if(code !== 0) {
    //         console.log(chalk.red('Error occurred while installing dependencies!'));
    //         process.exit(1);
    //     }
    //     // 执行成功
    //     else {
    //         console.log(chalk.cyan('Install finished'))   
    //     }
    // })

    
//     log(`
// Successfully created project ${chalk.cyan(name)}
// ==============================
//     cd ${chalk.cyan(name)}
//     npm i
//     npm run dev
// ==============================
//     `)

    //start http://localhost:8088/
    // await spawn(process.platform === 'win32' ? 'npm.cmd' : 'npm',['run','dev'], {cwd: `./${name}`})
    // open('http://localhost:8088')

}