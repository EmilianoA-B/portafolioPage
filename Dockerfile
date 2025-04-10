FROM nginx

COPY nginx.conf /etc/nginx/nginx.conf

WORKDIR /public

COPY ./public .

EXPOSE 80


