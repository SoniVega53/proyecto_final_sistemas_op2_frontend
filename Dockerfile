FROM node:20.13.1 as builder

EXPOSE 80

RUN mkdir /app
WORKDIR /app

RUN npm install -g @angular/cli@13

COPY package.json package-lock.json ./
RUN npm ci

RUN npm install

COPY . .
CMD ["ng", "serve", "--host", "0.0.0.0"]

FROM builder as dev-envs

COPY --from=gloursdocker/docker / /

CMD ["ng", "serve", "--host", "0.0.0.0"]
