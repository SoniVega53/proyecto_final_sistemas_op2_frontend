# Etapa 1: Construcción
FROM node:18-alpine AS build

EXPOSE 4200

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:alpine

COPY --from=build /usr/src/app/dist/grupo_umg2025_frontend/browser /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf
