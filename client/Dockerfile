FROM node:16-alpine as builder

WORKDIR /app

COPY package.json /app/package.json

RUN yarn install

COPY . /app

RUN yarn build

FROM nginx:1.16.0-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]