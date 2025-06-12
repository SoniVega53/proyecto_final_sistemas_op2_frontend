FROM node:18-alpine as angular

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build --prod

FROM nginx:alpine
VOLUME /var/cache/nginx

##RUN rm -rf /usr/share/nginx/html/*

COPY --from=angular /app/dist/grupo_umg2025_frontend/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

##CMD ["nginx", "-g", "daemon off;"]
