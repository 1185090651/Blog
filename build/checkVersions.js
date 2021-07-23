// console 添加颜色
const chalk = require('chalk');
// 比较版本大小
const semver = require('semver');
const packageConfig = require('../package.json');
// 获取宿主机命令
const shell = require('shelljs');

// 执行脚本函数
function exec (cmd) {
    return require('child_process').execSync(cmd).toString().trim();
}

const versionRequirements = [
    {
        name: 'node',
        currentVersion: semver.clean(process.version),
        versionRequirement: packageConfig.engines.node
    }
];

if (shell.which('npm')) {
    versionRequirements.push({
        name: 'npm',
        currentVersion: exec('npm --version'),
        versionRequirement: packageConfig.engines.npm
    });
}

module.exports = function () {
    const warnings = [];
    versionRequirements.forEach(mod => {
    // 比较宿主机版本与需求版本
        if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
            warnings.push(mod.name + ': ' +
        chalk.red(mod.currentVersion) + ' should be ' +
        chalk.green(mod.versionRequirement)
            );
        }
    });

    if (warnings.length) {
        console.log(chalk.yellow('\nTo use this template, you must update following to modules:\n'));
        warnings.forEach(warning => {
            console.log('  ' + warning);
        });
        console.log();
        // 版本过低 退出程序
        process.exit(1);
    }
};