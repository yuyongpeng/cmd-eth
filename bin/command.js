/**
 * Created by yuyongpeng on 2019/6/1.
 */

var config = require('../config')
var ether = require('../ethereum')

/**
 * 命令行 info 的处理 ( 获取以太坊的一些基础信息 )
 * @returns {Promise.<{lastBlockNumber: *}>}
 */
async function info(){
    let {lastBlockNumber, gasPrice, isMinning, conbase} = await ether.getEthInfo();
    console.log('lastBlockNumber: ' + lastBlockNumber);
    console.log('gasPrice: ' + gasPrice);
    console.log('isMinning: ' + isMinning);
    console.log('conbase: ' + conbase);
}

/**
 * 命令行 block 的处理（获取指定块的一些信息）
 * @param blockHashOrBlockNumber    块号 或者 hash
 * @param fetchTransactionData  true|false  是否获取块里面的交易数据
 * @returns {Promise.<void>}
 */
async function block(blockHashOrBlockNumber, fetchTransactionData){
    let block = await ether.getBlockInfo(blockHashOrBlockNumber, fetchTransactionData);
    console.log(block)
}

/**
 * 命令行 transaction 的处理（获取交易的信息）
 * @param transactionHash
 * @returns {Promise.<void>}
 */
async function transaction(transactionHash){
    let transaction = await ether.getTransactionInfo(transactionHash);
    console.log(transaction)
}

module.exports = {
    info: info,
    block: block,
    transaction: transaction
}