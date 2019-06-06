const toml = require('toml');
const fs = require('fs');
const Conf = require('conf');
const cfgs = new Conf();
const defaultConfigFile = __dirname + '/eth.cfg';
const defaultAbiFile = __dirname + '/abi.json';

/**
 * 解析配置文件，把数据存放到 cfg 变量中
 * @param file  需要解析的配置文件
 * @returns {Promise.<*>}
 */
async function parseToml(configFile, abiFile){
    configFile = configFile || defaultConfigFile;
    let fileContent = fs.readFileSync(configFile);
    let config = await toml.parse(fileContent);
    // 把配置文件的信息放到全局变量中
    for(let key in config){
        cfgs.set('a', config[key]);
    }
    abiFile = abiFile || defaultAbiFile;
    let abiFileContent = fs.readFileSync(abiFile);
    let abiObj = JSON.parse(abiFileContent);
    cfgs['abi'] = abiObj;
    return config
}

/**
 * 存放配置文件中的信息
 * @type {{}}
 */
// var cfg = {};

module.exports = {
    defaultConfigFile: defaultConfigFile,
    parse: parseToml
};