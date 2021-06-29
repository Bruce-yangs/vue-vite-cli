const { promisify } = require('util')


const clear = require('clear')
const chalk = require('chalk')
const log = content => console.log(chalk.green(content))

module.exports.clone = async function (repo, desc) {
    const download =  promisify(require('download-git-repo'))
    const ora = require('ora')
    const process = ora(`downloading...${repo}`)
    process.start()
    await download(repo, desc)
    process.succeed()

}