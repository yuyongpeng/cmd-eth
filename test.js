
var crypto = require('crypto-tx')
const chalk = require('chalk');
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
        birth_date,
        major,
        arms,
        demobilized_number,
    ].join('');
    return Buffer.from(crypto.keccak(data).data);
}

function main(){
    console.log(__dirname)
    let person= {
        name : "俞永鹏",
        id_number : '362101198210170078',
        birth_date : "1982-10-17",
        major : "步兵",
        arms : "列兵",
        demobilized_number : "001",
    };
    let tk = genHash(person);
    console.log(tk)
    console.log(tk.toString('hex'))
    console.log(chalk.blue('Hello world!'));
}

main()