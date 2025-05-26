#сборка контейнера
build_prod:
	docker  build -f dockerfiles/Dockerfile.prod -t web_calc .
build_stage:
	docker  build -f dockerfiles/Dockerfile.stage -t web_calc .
run:
	docker run -d --name web_calc -p 8080:80 -p 443:443 web_calc
del:
	docker rm -f web_calc