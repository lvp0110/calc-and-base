FROM node:20.10.0-alpine AS dependencies
RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm ci

# builder
FROM node:20.10.0-alpine AS builder

WORKDIR /app

COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
RUN npm run build

# production stage using Nginx
FROM nginx:alpine

# Удаляем стандартные файлы
RUN rm -rf /usr/share/nginx/html/*

# Копируем готовые файлы
COPY --from=builder /app/dist /usr/share/nginx/html

# Копируем сертификаты и ключи
# COPY ./certificate.crt /etc/nginx/ssl/certificate.crt 
# COPY ./private.key /etc/nginx/ssl/private.key

# Копируем конфигурацию Nginx
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

# Открываем порты
EXPOSE 3000

# Запуск Nginx
CMD ["nginx", "-g", "daemon off;"]
