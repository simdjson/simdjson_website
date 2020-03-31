gohugo:
	hugo -s ./hugo/ -d ../website/
	cp -r  api ./website
