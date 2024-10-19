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
    && ./env/bin/pip install -r requirements.txt

EXPOSE 8000


CMD ["./env/bin/python3", "manage.py", "runserver", "0.0.0.0:8000"]