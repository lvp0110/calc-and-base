#сборка контейнера
build:
	docker  build -t web_calc .
run:
	docker run -d --name web_calc -p 8080:80 -p 443:443 web_calc
del:
	docker rm -f web_calc