/**
 * Created by yuyongpeng on 2019/5/31.
 */

var Web3 = require('web3')

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
    web3 = getWeb3()
    lastBlockNumber = await web3.eth.getBlockNumber()
    return lastBlockNumber
}

///////////////////////////////////////////
async function test(web3) {
    var balance = await web3.eth.getBalance('0x707a5e238ECD4B1D6ba3b636b3Ba2607b00024FA')
    console.log(balance)
    return balance
}

async function getMessage(web3){
    var blockNumber = await web3.eth.getBlockNumber();
    var balance = await web3.eth.getBalance('0x707a5e238ECD4B1D6ba3b636b3Ba2607b00024FA')
    console.log(blockNumber)
    console.log(balance)
    return balance
}

module.exports = {
    getMessage: getMessage,
    getEthInfo: getEthInfo
}