# FROM nginx
# COPY . /usr/share/nginx/html
# COPY ./conf/nginx.conf /etc/nginx.conf/


FROM nginx:latest
COPY . /usr/share/nginx/html
RUN apt-get update && apt-get install -y openssl && apt-get clean
RUN mkdir -p /etc/nginx/ssl
RUN openssl req -x509 -nodes -out /etc/nginx/ssl/ft_trans.crt -keyout /etc/nginx/ssl/ft_trans.key -subj "/C=MA/ST=/L=/O=/OU=/CN=rarraji.42.fr"
COPY ./conf/nginx.conf /etc/nginx.conf/
EXPOSE 443

