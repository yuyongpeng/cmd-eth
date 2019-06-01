/**
 * Created by yuyongpeng on 2019/6/1.
 */

var config = require('../config')
var ether = require('../ethereum')


async function info(configFile){
    // console.log(config.defaultConfigFile)
    var cfg = await config.parse(null)

    ether.getEthInfo().then(data => {
        var info = data
        console.log(info)
    })
}
module.exports = {
    info: info
}