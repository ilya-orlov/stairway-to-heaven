# syntax=docker/dockerfile:1

FROM node:18-alpine

ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "yarn-lock.json*", "./"]

RUN yarn install --production

COPY api .

CMD ["yarn", "start:prod"]