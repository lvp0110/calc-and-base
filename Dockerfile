# dependencies
FROM node:20.10.0-alpine AS dependencies
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

WORKDIR /usr/share/nginx/html

COPY package.json ./
COPY package-lock.json ./
RUN npm ci

# builder
FROM node:20.10.0-alpine AS builder

WORKDIR /usr/share/nginx/html

COPY . .
COPY --from=dependencies /usr/share/nginx/html/node_modules ./node_modules
RUN npm run build

#Используем официальный образ nginx
FROM nginx:alpine AS nginx

# Указываем стандартный каталог для проетков nginx (любой из указанных сдесь каталогов будет далее будет явалятся корневым)
WORKDIR /usr/share/nginx/html

# Команда "RUN" позволяет выполнить команду в нутри контейнера во время его сборки (удаляем дефолтный контент nginx)
RUN rm -rf ./*
# устанавливаем BASH
# RUN apk add --no-cache bash

#Копируем файлы проекта web_calc в контейнер
COPY --from=builder ./dist/ /usr/share/nginx/html

# копируем сертификаты и ключ в контейнер
COPY ./certs/__acoustic_ru.crt /etc/nginx/ssl/__acoustic_ru.crt 
COPY ./certs/private-5.key /etc/nginx/ssl/private-5.key

# копируем файл конфигурации по умолчанию
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

#Порт на котором работает наше приложение
EXPOSE 80 443

#Запуск сервера nginx в фоновом режиме
CMD ["nginx", "-g", "daemon off;"]

# CMD ["node", ".build/server/index.js"]