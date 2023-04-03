# syntax=docker/dockerfile:1

# BUILD FOR LOCAL DEVELOPMENT
FROM node:18-alpine As development

WORKDIR /usr/src/app

COPY package.json .
COPY yarn.lock .

RUN yarn install --frozen-lockfile # investigate what --frozen-lockfile really does (analog is npm ci

COPY . .


# BUILD FOR PRODUCTION
FROM node:18-alpine As build

WORKDIR /usr/src/app

COPY package.json .
COPY yarn.lock .

COPY  --from=development /usr/src/app/node_modules ./node_modules

COPY . .

RUN yarn run build

ENV NODE_ENV production

RUN yarn install --frozen-lockfile --only=production && npm cache clean --force


# PRODUCTION
FROM node:18-alpine As production

COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist

CMD [ "node", "dist/main.js" ]

