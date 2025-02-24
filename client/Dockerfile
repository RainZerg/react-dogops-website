FROM node:latest

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 3002

CMD ["yarn", "dev"]