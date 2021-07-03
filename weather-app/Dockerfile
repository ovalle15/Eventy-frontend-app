# Stage 1


FROM node:12.14 as build-step


RUN mkdir -p /weather-app

WORKDIR /weather-app

COPY package.json /weather-app

RUN npm install --force

COPY . /weather-app

RUN npm run build --prod

# Stage 2
FROM nginx:1.17.1-alpine

COPY --from=build-step /weather-app/dist/weather-app /usr/share/nginx/html