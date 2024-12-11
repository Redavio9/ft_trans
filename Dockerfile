# Utilisez l'image officielle Jenkins comme base
FROM jenkins/jenkins:latest

# Exécutez les commandes d'installation pour `make`
USER root
RUN apt-get update && apt-get install -y make

# Revenir à l'utilisateur jenkins
USER jenkins