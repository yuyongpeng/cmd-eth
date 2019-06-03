/**
 * Created by yuyongpeng on 2019/5/31.
 */

var fs = require('fs')

async function main(){
    fs.copyFileSync('eth.cfg', '/etc/eth.cfg')
}

main()