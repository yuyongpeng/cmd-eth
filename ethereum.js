/**
 * Created by yuyongpeng on 2019/5/31.
 */
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
    test: test
}