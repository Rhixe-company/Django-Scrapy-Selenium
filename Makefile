fix := fixtures/db.json

compose := docker compose -f docker-compose.local.yml


python:
	py

compose-build:
	$(compose) build redis

compose-down:
	$(compose) down --remove-orphans -t 0

compose-daemon:
	$(compose) up -d redis

crawl:
	py manage.py crawl

crawls:
	py manage.py crawls

loadform:
	py manage.py loadform

load:
	py manage.py load

read:
	py manage.py read

super-user:
	py manage.py  createsuperuser

system-clean:
	bash bash/docker-clean.sh

compose-logs:
	$(compose) logs -f

compose-logs-services:
	$(compose) logs -f django node postgres celeryworker redis

delete:
	sudo rm -r ./data ./staticfiles ./dist

locale-create:
	py manage.py makemessages --all

locale-save:
	py manage.py compilemessages

celery:
	py -m  celery -A config.celery_app worker -l INFO --pool solo

start:
	py manage.py runserver

# script:
# 	py manage.py runscript orm_script
script:
	py manage.py runscript count_script

server:
	py -m gunicorn --config gunicorn-cfg.py config.wsgi

migrate:
	py manage.py migrate

migratesocial:
	py manage.py migrate socialaccount

migrations:
	py manage.py makemigrations


static:
	py manage.py collectstatic --noinput
flush:
	py manage.py flush --noinput
shell:
	py manage.py shell_plus
dev:
	npm run dev

build:
	npm run build

clean:
	npm run clean

format:
	py -m djlint ./api/templates/**/**/**/*.html --format-css --format-js --reformat

format-check:
	py -m djlint ./api/templates/**/**/**/*.html --format-css --format-js --check

dumpdata:
	py -Xutf8 manage.py dumpdata users apps home --indent 4 -o $(fix)


loaddata:
	py manage.py loaddata --ignorenonexistent --force-color  db.json

test:
	py manage.py test

compilemessages:
	py manage.py compilemessages

makemessages:
	py manage.py makemessages --all --no-location

git-push:
	git add --all ; git commit -m 'updated my Templates'; git push -u origin main
