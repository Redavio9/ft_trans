FROM python:3.11-alpine


RUN apk add --no-cache \
    python3-dev \
    libffi-dev \
    openssl-dev \
    build-base


WORKDIR /app


COPY . /app


RUN python3 -m venv env \
    && ./env/bin/pip install --upgrade pip \
    && ./env/bin/pip install -r requirements1.txt


RUN ./env/bin/python3 manage.py makemigrations


EXPOSE 8000

ENV DJANGO_SUPERUSER_USERNAME=solix
ENV DJANGO_SUPERUSER_EMAIL=solix@gmail.com
ENV DJANGO_SUPERUSER_PASSWORD=123


CMD ["sh", "-c", "./env/bin/python3 manage.py migrate && ./env/bin/python3 create_superuser.py && ./env/bin/python3 manage.py runserver 0.0.0.0:8000"]
