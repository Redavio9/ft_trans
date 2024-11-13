all: build up

build:
	@echo "Building images..."
	@docker-compose up --build

up:
	@echo "Creating containers..."
	@echo "Building images..."
	@docker-compose up --build

down:
	@echo "Removing containers..."
	@docker-compose down
	@docker-compose down -v

clean : down
	docker stop $$(docker ps -qa); \
	docker rm $$(docker ps -qa); \
	docker rmi -f $$(docker images -qa); \
	docker volume rm $$(docker volume ls -q); \
	docker network rm $$(docker network ls -q) || true

fclean: clean
	@docker system prune -a -f
	@echo "Full cleaning..."
	
re: fclean all

.PHONY: clean fclean re up down build all