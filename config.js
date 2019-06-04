/**
 * Created by yuyongpeng on 2019/5/31.
 */

var toml = require('toml')
var fs = require('fs')

var defaultConfigFile = './eth.conf'

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
        global[key] = config[key]
        cfg[key] = config[key]
    }

    let abiFileContent = fs.readFileSync(abiFile);
    let abiObj = JSON.parse(abiFileContent);
    cfg['abi'] = abiObj;
    // config.cfg.abi = abiObj;
    return config
}

/**
 * 存放配置文件中的信息
 * @type {{}}
 */
var cfg = {};

module.exports = {
    defaultConfigFile: defaultConfigFile,
    cfg: cfg,
    parse: parseToml
};