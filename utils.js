#!/usr/bin/env node
/**
 Author:       yuyongpeng@hotmail.com
 Github:       https://github.com/yuyongpeng/
 Date:         2019-06-05 15:02:44
 LastEditors:
 LastEditTime: 2019-06-05 15:02:44
 Description:
 */

function trimOx(key){
    let re = /^0x/;
    let news = key.replace(re, '')
    console.log(news)
    if(key.match(re) == true){
        return key.substring(2);
    }else{
        return key
    }
}

var t = trimOx('0x044af3c4d907a75e9349f362b0f854c7d74a89dad457df4f9cbf3c4f9e2f7fbcf8916ac219bb70e64777930b1e85d0a550e1e61ca94fa902dee419849a9a0efe8a')
console.log(t)