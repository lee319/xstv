default:
	@echo 'Usage of make: [ dev | pro | beta | run ]'

dev: 
	NODE_ENV=development npm run build

beta: 
	NODE_ENV=production BUILD_TYPE=beta npm run build

pro: 
	NODE_ENV=production npm run build

run: 
	npm run dev

.PHONY: default dev pro beta run


