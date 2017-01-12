DOCUMENT=cv-mperdikeas-el.tex
.PHONY: all clean
all:
	xelatex -interaction=nonstopmode $(DOCUMENT)
	xelatex -interaction=nonstopmode $(DOCUMENT)
spell-check:
	aspell -t -c $(DOCUMENT)
clean:
	rm -f *.pdf
	rm -f *.log
	rm -f *.lol
	rm -f *.lof
	rm -f *.toc
	rm -f *.out
	rm -f *.aux

