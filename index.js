/**
 * Created by yuyongpeng on 2019/5/31.
 */

var config = require('./config')
const Web3 = require('web3')
var ether = require('./ethereum')

const web3 = new Web3(new Web3.providers.HttpProvider(config.schame+"://"+config.ip+":"+config.port), null, {});

async function main(){
    var d = await ether.getMessage(web3);

}

main();








