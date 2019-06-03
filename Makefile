PWD = $(shell pwd)

.PHONY: upload config
# 将代码发布到 npmjs.com
upload:
	@echo PWD: $(PWD)
	@rm -rf ./cmd_eth-*.tgz
	@npm pack
	@npm login
	@npm publish
	@rm -rf ./cmd_eth-*.tgz

