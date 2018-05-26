BUILDDIR=./dist/
EXEC=index.js

default: run

build:
	tsc

run: build
	electron $(BUILDDIR)$(EXEC)

clean:
	-rm -rf $(BUILDDIR)*