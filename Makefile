install: # установить зависимости
	npm ci

publish-test:
	npm publish --dry-run

link:
	npm link

lint:
	npx eslint .
	
test:
	npx jest 

test-coverage:
	npx jest --coverage