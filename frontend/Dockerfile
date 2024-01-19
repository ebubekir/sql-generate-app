FROM node:latest

WORKDIR /frontend

COPY package.json yarn.lock* /frontend/

RUN yarn install

COPY . /frontend

RUN yarn build

CMD ["yarn", "start"]
