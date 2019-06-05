#!/usr/bin/env node
/**
 Author:       yuyongpeng@hotmail.com
 Github:       https://github.com/yuyongpeng/
 Date:         2019-06-05 13:55:14
 LastEditors:
 LastEditTime: 2019-06-05 13:55:14
 Description:
 */

var crypto = require('crypto-tx')

/**
 *
 * @param name                  姓名
 * @param id_number             身份证号
 * @param birth_date            出生年月
 * @param major                 专业
 * @param arms                  兵种
 * @param demobilized_number    退伍号
 * @returns {Buffer}
 */
function genHash({name, id_number, birth_date, major, arms, demobilized_number }) {
    var data = [
        name,
        id_number,
        birth_date.toString('yyyy-MM-dd'),
        major,
        arms,
        demobilized_number,
    ].join('');
    return Buffer.from(crypto.keccak(data).data);
}

function main(){
    let person= {
        name : "俞永鹏",
        id : '362101198210170078',
        birth_date : "1982-10-17",
        major : "步兵",
        arms : "列兵",
        demobilized_number : "001",
    };
    let tk = genHash(person);
    console.log(tk)
    console.log(tk.toString('hex'))
}


module.exports = {
    genHash: genHash,
}