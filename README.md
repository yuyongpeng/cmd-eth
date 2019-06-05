## 命令行说明
Usage: index [options] [command]

Options:
  -V, --version                                         output the version number
  -f, --config <path>                                   配置文件(default: ./eth.cfg) (default: "/Users/yuyongpeng/git/yuyongpeng/cmd_eth/bin/../eth.cfg")
  -a, --abi <path>                                      abi文件(default: ./abi.json) (default: "/Users/yuyongpeng/git/yuyongpeng/cmd_eth/bin/../abi.json")
  -h, --help                                            output usage information

Commands:
  info                                                  获得以太坊的一些基本信息进行列表显示
  block|bk [options] <blockHashOrBlockNumber>           获得指定 块号 或者 hash 的块信息
  transaction|ta <transactionHash>                      获得指定 交易号 的交易信息
  event|ev [options] <eventName> <fromBlock> <toBlock>  获得指定 event 的信息
  privateto|pt <privateKey>                             将私钥转换为 公钥 和 address (私钥可以带 0x 前缀)
  genkey|gk                                             随机的生成 私钥 公钥 address
  *

