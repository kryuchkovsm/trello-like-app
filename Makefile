REPORTER=spec
MOCHA = ./node_modules/.bin/mocha
TESTS=$(shell find ./test -type f -name "*.js")

test:
	@NODE_ENV=test $(MOCHA) \
		-r should \
		-r chai \
		-R $(REPORTER) \
        $(TESTS)

.PHONY: test
