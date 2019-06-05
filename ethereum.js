/**
 * Created by yuyongpeng on 2019/5/31.
 */

var Web3 = require('web3');
var config = require('./config');
var ethUtil = require('ethereumjs-util');

/**
 * 获得web3对象
 */
function getWeb3(){
    var web3 = new Web3(new Web3.providers.HttpProvider(global.schema+"://"+global.ip+":"+global.port), null, {});
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

async function getContracrt(){
    let web3 = getWeb3();
    let jsonInterface = config.cfg.abi;
    let options = {
        defaultAccount: "0x5c12aed6613aad77ec2e84e5cedd9b6ff29a6e6a",
        address: "0x5c12aed6613aad77ec2e84e5cedd9b6ff29a6e6a",
        defaultGasPrice: 100000,
        defaultGas: 100000,
    }
    let contractAddress = '0x5c12aed6613aad77ec2e84e5cedd9b6ff29a6e6a';
    web3.eth.Contract(address=contractAddress, options=options);
}

async function getEvent(eventName, fromBlock, toBlock){
    await getContracrt();
}

async function privateToAddress(privateKey){
    privateKey.str
    Buffer.from(privateKey, 'hex')
    ethUtil.addHexPrefix('0x')
    let address = ethUtil.privateToAddress();
    let publicKey = ethUtil.privateToPublic();

}


module.exports = {
    getEthInfo: getEthInfo,
    getBlockInfo: getBlockInfo,
    getTransactionInfo: getTransactionInfo,
    getEvent: getEvent,
}