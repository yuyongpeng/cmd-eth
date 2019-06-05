#!/usr/bin/env node
/**
 Author:       yuyongpeng@hotmail.com
 Github:       https://github.com/yuyongpeng/
 Date:         2019-06-05 15:02:44
 LastEditors:
 LastEditTime: 2019-06-05 15:02:44
 Description:
 */

/**
 * 取出字符串前部的 0x 标识符
 * @param key
 * @returns {*|string}
 */
function trim0x(key){
    let re = /^0x/;
    return key.replace(re, '')
}

module.exports = {
    trim0x: trim0x,
}

