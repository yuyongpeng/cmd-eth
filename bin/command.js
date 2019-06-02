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
    let lastBlockNumber = await ether.getEthInfo()
    return {lastBlockNumber}
}

module.exports = {
    info: info
}