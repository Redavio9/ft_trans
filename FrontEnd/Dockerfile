# FROM debian:bookworm

# RUN apt-get update \
#     && apt-get upgrade -y \
#     && apt-get install nginx -y

# RUN chown -R www-data:www-data /var/www/html
# RUN mkdir -p var/www/html/transcendence/
# COPY /Users/rarraji/Desktop/Transcendence/Testing /var/www/html/transcendence
# RUN chmod -R 777 /var/www/html/transcendence



# EXPOSE 5500

# CMD ["nginx", "-g", "daemon off;"]
FROM nginx
COPY . /usr/share/nginx/html
COPY ./conf/nginx.conf /etc/nginx.conf/

