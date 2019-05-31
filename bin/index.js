/**
 * Created by yuyongpeng on 2019/5/31.
 */
var program = require('commander');
var ether = require('../ethereum')
var toml = require('toml')
var fs = require('fs')

async function main(){
    program
        .version('0.0.1')
        .option('-f, --config <path>', '配置文件(default: /etc/eth.cfg)');

    program
        .command('info')
        .description('获得以太坊的一些基本信息进行列表显示')
        .action(function(options){
            ether.getEthInfo().then(data => {
                var info = data
                console.log(info)

                configFile = program.config;
                console.log(configFile);
            })
        });

    program
        .command('exec <cmd>')
        .alias('ex')
        .description('execute the given remote cmd')
        .option("-e, --exec_mode <mode>", "Which exec mode to use")
        .action(function(cmd, options){
            console.log('exec "%s" using %s mode', cmd, options.exec_mode);
        }).on('--help', function() {
        console.log('');
        console.log('Examples:');
        console.log('');
        console.log('  $ deploy exec sequential');
        console.log('  $ deploy exec async');
    });

    program
        .command('*')
        .action(function(env){
            console.log('deploying "%s"', env);
        });

    program.parse(process.argv);

    configFile = program.config;
    console.log(configFile);
    var fileContent = fs.readFileSync(configFile)
    var t = await toml.parse(fileContent)
    console.log(t)
}
main();











