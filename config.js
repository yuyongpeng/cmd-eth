/**
 * Created by yuyongpeng on 2019/5/31.
 */

var toml = require('toml')
var fs = require('fs')

var defaultConfigFile = './eth.conf'

async function parseToml(file){
    configFile = file || defaultConfigFile;
    var fileContent = fs.readFileSync(configFile)
    var config = await toml.parse(fileContent)
    return config
}

module.exports = {
    defaultConfigFile: defaultConfigFile,
    parse: parseToml
};

// module.exports = {
//     schame: 'http',
//     ip: "192.168.2.45",
//     port: 38545,
//     contract_address: ["0x707a5e238ECD4B1D6ba3b636b3Ba2607b00024FA"],
// }