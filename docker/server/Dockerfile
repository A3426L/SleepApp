FROM python:3.8

RUN mkdir -p /var/www/html/
WORKDIR /var/www/html/

RUN pip install --upgrade pip
RUN pip install --upgrade setuptools
RUN pip install flask uWSGI SQLAlchemy pymysql Flask-Migrate cryptography

CMD ["uwsgi", "uwsgi.ini"]