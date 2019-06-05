#!/usr/bin/env node
/**
 * Created by yuyongpeng on 2019/5/31.
 */

var fs = require('fs')

async function main(){
    fs.copyFileSync(__dirname + '/eth.cfg', '/etc/eth.cfg')
}

main()