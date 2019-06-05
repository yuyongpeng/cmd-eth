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
    console.log(process.cwd())
    program
        .version('0.0.1')
        .option('-f, --config <path>', '配置文件(default: ./eth.cfg)', __dirname + '/../eth.cfg')
        .option('-a, --abi <path>', 'abi文件(default: ./abi.json)', __dirname + '/../abi.json');

    program.on('option:config', function(){
        configFile = this.config || './eth.cfg';
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
            await config.parse(program.config, program.abi);
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

    // 获event的详细信息
    program
        .command('event <eventName> <fromBlock> <toBlock>')
        .alias('ev')
        .description('获得指定 event 的信息')
        .option("-f, --from <value>", "开始的区块 (default: 0)", 0)
        .option("-t, --to <value>", "结束的区块 (default: 50000)", 500000)
        .action(async function(eventName, fromBlock, toBlock, options){
            // 解析配置文件
            let cfg = await config.parse(program.config, program.abi);
            // 处理命令
            await command.event(eventName, fromBlock, toBlock);
        });

    program
        .command('*')
        .action(function(env){
            console.log('deploying "%s"', env);
        });



    program.parse(process.argv);
}

main();











