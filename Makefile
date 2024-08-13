.PHONY: commit
commit:
	git add .
	git commit -m "Commit on $$(date '+%Y-%m-%d %H:%M:%S')"
	git push

# .PHONY: lint
# lint:
# 	poetry run pre-commit run --all-files

# .PHONY: migrate
# migrate:
# 	poetry run python manage.py migrate

# .PHONY: migrations
# migrations:
# 	poetry run python manage.py makemigrations

# .PHONY: run-server
# run-server:
# 	poetry run python manage.py runserver '0.0.0.0:8080'

# .PHONY: superuser
# superuser:
# 	poetry run python manage.py createsuperuser

# .PHONY: up
# up:
# 	test -f .env || touch .env
# 	docker-compose -f docker-compose.dev.yml up --build

# .PHONY: up-dependencies-only
# up-dependencies-only:
# 	test -f .env || touch .env
# 	docker-compose -f docker-compose.dev.yml up --force-recreate db

# .PHONY: update
# update: install migrate install-pre-commit ;


# .PHONY: add
# add:
# 	@set /p name="Enter the app name: "
# 	python manage.py startapp %name%

# .PHONY: commit
# commit:
# 	docker-compose -f docker-compose.prod.dev.yml build
# 	docker commit diabetes-app-1 diabetes-app:1.0
# 	docker tag diabetes-app:1.0 creepereye/diabetes:1.0
# 	docker push creepereye/diabetes:1.0