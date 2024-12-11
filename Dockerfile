FROM jenkins/jenkins:latest

USER root

# Mise à jour et installation de docker-compose
RUN apt-get update && \
    apt-get install -y \
    make \
    curl \
    git \
    python3 \
    python3-pip \
    && curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose \
    && chmod +x /usr/local/bin/docker-compose

USER jenkins