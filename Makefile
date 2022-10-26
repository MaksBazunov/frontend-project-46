install: # установить зависимости
	npm ci

publish-test:
	npm publish --dry-run

link:
	npm link

lint:
	npx eslint .
	
test:
	NODE_OPTIONS=--experimental-vm-modules npx jest 

test-coverage:
	NODE_OPTIONS=--experimental-vm-modules npx jest --coverage