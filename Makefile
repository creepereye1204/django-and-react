.PHONY: commit
commit:
	git add .
	git commit -m "Commit on $$(date '+%Y-%m-%d %H:%M:%S')"
	git push

.PHONY: migrate
migrate:
	poetry run python manage.py migrate

.PHONY: migrations
migrations:
	poetry run python manage.py makemigrations

.PHONY: collect
collect:
	poetry run python3 manage.py collectstatic --noinput

.PHONY: npm-run
npm-run:
	npm --prefix frontend run dev

.PHONY: runserver
runserver:
	poetry run uwsgi --ini core_uwsgi.ini
	poetry run daphne -u /home/apps/my_wiki/daphne.sock core.asgi:application
 
.PHONY: nginx
nginx:
	/etc/init.d/nginx restart

.PHONY: all
all: migrations migrate npm-run collect commit nginx runserver

.PHONY: superuser
superuser:
	poetry run python manage.py createsuperuser