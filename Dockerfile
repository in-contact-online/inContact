FROM node:14.15.4

ENV NODE_ENV=production
ENV IN_CONTACT_DB_HOST=host.docker.internal
#todo: add env variables from github repositry

WORKDIR /inContact

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build:monitor:cl

RUN yarn install --frozen-lockfile

EXPOSE 587
EXPOSE 3003
EXPOSE 3002
EXPOSE 3000
EXPOSE 5432

ENTRYPOINT ./entrypoint.sh
