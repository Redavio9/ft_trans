# # FROM debian:bookworm

# # RUN apt-get update \
# #     && apt-get upgrade -y \
# #     && apt-get install nginx -y

# # RUN chown -R www-data:www-data /var/www/html
# # RUN mkdir -p var/www/html/transcendence/
# # COPY /Users/rarraji/Desktop/Transcendence/Testing /var/www/html/transcendence
# # RUN chmod -R 777 /var/www/html/transcendence



# # EXPOSE 5500

# # CMD ["nginx", "-g", "daemon off;"]
# FROM nginx
# COPY . /usr/share/nginx/html
# COPY ./conf/nginx.conf /etc/nginx.conf/





# RUN apt-get update \
#     && apt-get upgrade -y \
#     && apt-get install nginx -y \
#     && apt install openssl -y \
#     && mkdir -p /etc/nginx/ssl

# RUN chown -R www-data:www-data /var/www/html
# RUN chmod -R 777 /var/www/html
# RUN openssl req -x509 -nodes -out /etc/nginx/ssl/inception.crt -keyout /etc/nginx/ssl/inception.key -subj "/C=MA/ST=/L=/O=/OU=/CN=exemple.13.fr"

# COPY ./conf/nginx.conf /etc/nginx/conf.d

# EXPOSE 443

# Start with the official Nginx image
FROM nginx

# Update package list, install necessary packages, and set up SSL
RUN apt-get update \
    && apt-get upgrade -y \
    && apt-get install -y openssl \
    && mkdir -p /etc/nginx/ssl \
    && apt-get clean

# Set permissions for Nginx directory
# RUN chown -R www-data:www-data /usr/share/nginx/html
# RUN chmod -R 777 /usr/share/nginx/html

# Generate self-signed SSL certificate
# RUN openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/nginx/ssl/inception.key \
#     -out /etc/nginx/ssl/inception.crt -subj "/C=MA/ST=/L=/O=/OU=/CN=rarraji.13.fr"

# Copy application files to Nginx directory
COPY . /usr/share/nginx/html
COPY ./conf/nginx.conf /etc/nginx.conf/

# Expose port 443 for HTTPS
# EXPOSE 443
EXPOSE 80