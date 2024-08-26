# dependencies
FROM node:20.10.0-alpine AS dependencies
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm install -g npm@10.2.3
RUN npm ci

# builder
FROM node:20.10.0-alpine AS builder

WORKDIR /app

COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
RUN npm run build

#Используем официальный образ nginx
FROM nginx:alpine AS nginx

# Указываем стандартный каталог для проетков nginx (любой из указанных сдесь каталогов будет далее будет явалятся корневым)
WORKDIR /app

# Команда "RUN" позволяет выполнить команду в нутри контейнера во время его сборки (удаляем дефолтный контент nginx)
RUN rm -rf ./*
# устанавливаем BASH
# RUN apk add --no-cache bash

#Копируем файлы проекта web_calc в контейнер
COPY --from=builder /app/dist/ /usr/share/nginx/html

# копируем сертификаты и ключ в контейнер
COPY ./certificate.crt /etc/nginx/ssl/
COPY ./private.key /etc/nginx/ssl/

# копируем файл конфигурации по умолчанию
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

#Порт на котором работает наше приложение
EXPOSE 80 443

#Запуск сервера nginx в фоновом режиме
CMD ["nginx", "-g", "daemon off;"]
