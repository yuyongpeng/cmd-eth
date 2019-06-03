#!/usr/bin/env node
/**
 * Created by yuyongpeng on 2019/5/31.
 */
var program = require('commander');
var ether = require('../ethereum')
var toml = require('toml')
var fs = require('fs')
var config = require('../config')
var command = require('./command')

var configFile = '';

function parseBool(value, dummyPrevious) {
    if(value == 'false'){
        return false;
    }else{
        return Boolean(value);
    }
}

function myParseInt(value, dummyPrevious) {
    // parseInt takes a string and an optional radix
    return parseInt(value);
}

async function main(){
    program
        .version('0.0.1')
        .option('-f, --config <path>', '配置文件(default: /etc/eth.cfg)','./eth.cfg');

    program.on('option:config', function(){
        configFile = this.config || './test.toml';
        console.log(`file: ${configFile}`)
    });

    program
        .command('info')
        .description('获得以太坊的一些基本信息进行列表显示')
        .action(async function(options){
            // 解析配置文件
            await config.parse(program.config)
            // 处理命令
            await command.info(program.config)
        });

    // 获得块的详细信息
    program
        // .allowUnknownOption()
        .command('block <blockHashOrBlockNumber>')
        .alias('bk')
        .description('获得指定 块号 或者 hash 的块信息')
        // .option("-t, --transaction_data <value>", "是否返回这个区块的交易数据 (true|false) (default: false)", parseBool, false)
        .option("-t, --transaction_data <value>", "是否返回这个区块的交易数据 (true|false) (default: false)", /^(true|false)$/i, false)
        .action(async function(blockHashOrBlockNumber, options){
            // 解析配置文件
            await config.parse(program.config);
            // 处理命令
            let transaction_data = false;
            if(options.transaction_data == 'true'){
                transaction_data = true
            }
            await command.block(blockHashOrBlockNumber, transaction_data);
        });

    // 获得交易的详细信息
    program
        .command('transaction <transactionHash>')
        .alias('ta')
        .description('获得指定 交易号 的交易信息')
        .action(async function(transactionHash, options){
            // 解析配置文件
            await config.parse(program.config);

            await command.transaction(transactionHash);
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











