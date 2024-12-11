# Utilisez l'image officielle Jenkins comme base
FROM jenkins/jenkins:latest

# Passer à l'utilisateur root pour l'installation
USER root

# Mettre à jour et installer les dépendances nécessaires, y compris docker-compose
RUN apt-get update && \
    apt-get install -y \
    make \
    curl \
    git \
    python3 \
    python3-pip \
    && curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose \
    && chmod +x /usr/local/bin/docker-compose

# Revenir à l'utilisateur Jenkins
USER jenkins