FROM python:3.8

RUN mkdir -p /var/www/html/
WORKDIR /var/www/html/
RUN curl -o /var/www/html/wait-for-it.sh https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh
#COPY wait-for-it.sh /var/www/html/wait-for-it.sh
RUN chmod 755 /var/www/html/wait-for-it.sh

RUN pip install --upgrade pip
RUN pip install --upgrade setuptools
RUN pip install flask uWSGI SQLAlchemy pymysql Flask-Migrate cryptography flask-cors

CMD ["uwsgi", "uwsgi.ini"]