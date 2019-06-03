/**
 * Created by yuyongpeng on 2019/5/31.
 */

var Web3 = require('web3')

/**
 * 获得web3对象
 */
function getWeb3(){
    var web3 = new Web3(new Web3.providers.HttpProvider(global.schema+"://"+global.ip+":"+global.port), null, {});
    // web3.
    return web3
}

/**
 * 获得以太坊的的信息
 * @param config 配置信息
 * @returns {Promise.<*>}
 */
async function getEthInfo(){
    let web3 = getWeb3();
    let lastBlock = await web3.eth.getBlock('latest')
    let lastBlockNumber = await web3.eth.getBlockNumber();
    let gasPrice = await web3.eth.getGasPrice();
    let isMinning = await web3.eth.isMining();
    let hashrate = await web3.eth.getHashrate();
    let accounts = await web3.eth.getAccounts();
    // {"code":-32023,"message":"No accounts were found","data":"\"\""}
    // var coinbase = await web3.eth.getCoinbase();
    return {lastBlockNumber, gasPrice, isMinning, hashrate, accounts};
}

async function getBlockInfo(blockHashOrBlockNumber, fetchTransactionData){
    let web3 = getWeb3();
    let block = await web3.eth.getBlock(blockHashOrBlockNumber, fetchTransactionData);
    return block
}

async function getTransactionInfo(transactionHash){
    let web3 = getWeb3();
    let transaction = await web3.eth.getTransaction(transactionHash);
    return transaction
}

module.exports = {
    getEthInfo: getEthInfo,
    getBlockInfo: getBlockInfo,
    getTransactionInfo: getTransactionInfo
}