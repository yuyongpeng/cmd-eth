/**
 * Created by yuyongpeng on 2019/5/31.
 */

var Web3 = require('web3');
// var config = require('./config');
const Conf = require('conf');
const cfg = new Conf();
var ethUtil = require('ethereumjs-util');
var utils = require('./utils');
var keythereum = require("keythereum");

/**
 * 获得web3对象
 */
function getWeb3(){
    // var web3 = new Web3(new Web3.providers.HttpProvider(global.schema+"://"+global.ip+":"+global.port), null, {});
    var web3 = new Web3(new Web3.providers.HttpProvider(cfg.get('schema')+"://"+cfg.get('ip')+":"+cfg.get('port')), null, {});
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

/**
 * 将私钥转换为 公钥 和 address
 * @param privateKey   hex编码的字符串
 * @returns {address_checksum, publicKey_hex}
 */
function privateToAddress(privateKey){
    privateKeyNo0x = utils.trim0x(privateKey)
    privateKey_bytes = Buffer.from(privateKeyNo0x, 'hex')
    let address_bytes = ethUtil.privateToAddress(privateKey_bytes);
    let address_hex = address_bytes.toString('hex')
    let address_checksum = ethUtil.toChecksumAddress(address_hex);

    let publicKey_bytes = ethUtil.privateToPublic(privateKey_bytes);
    let publicKey_hex = publicKey_bytes.toString('hex');

    return {address_hex, address_checksum, publicKey_hex}
}

/**
 * 随机生成 私钥 公钥 address 等
 * @returns
 */
function generatorKey(){
    let dk = keythereum.create();
    let privateKey = dk.privateKey;
    let privateKey_hex = privateKey.toString('hex');
    let some = privateToAddress(privateKey_hex);
    some['privateKey_hex'] = privateKey_hex;
    return some
}


module.exports = {
    getEthInfo: getEthInfo,
    getBlockInfo: getBlockInfo,
    getTransactionInfo: getTransactionInfo,
    getEvent: getEvent,
    privateToAddress: privateToAddress,
    generatorKey: generatorKey,
}