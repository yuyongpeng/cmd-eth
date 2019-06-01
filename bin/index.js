#!/usr/bin/env node
/**
 * Created by yuyongpeng on 2019/5/31.
 */
var program = require('commander');
var ether = require('../ethereum')
var toml = require('toml')
var fs = require('fs')
var configs = require('../config')
var command = require('./command')

var configFile = '';

async function main(){
    program
        .version('0.0.1')
        .option('-f, --config <path>', '配置文件(default: /etc/eth.conf)','./eth.conf');

    program.on('option:config', function(){
        configFile = this.config || './test.toml';
        console.log(`file: ${configFile}`)
    });

    program
        .command('info')
        .description('获得以太坊的一些基本信息进行列表显示')
        .action(function(options){
            command.info(program.config);
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

    configFile = program.config || './test.toml';
    console.log(configFile);
    var fileContent = fs.readFileSync(configFile)
    var t = await toml.parse(fileContent)
    // console.log(t)
}
main();











