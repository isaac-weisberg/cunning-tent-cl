BUILDDIR=./dist/
EXEC=index.js

default: run

build:
	tsc

run: build
	node $(BUILDDIR)$(EXEC)

clean:
	-rm -rf $(BUILDDIR)*