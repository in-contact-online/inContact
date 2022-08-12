FROM node:14.15.4 as build
ARG IN_CONTACT_MONITOR_API_BASE_URL

ENV IN_CONTACT_MONITOR_API_BASE_URL=$IN_CONTACT_MONITOR_API_BASE_URL

RUN apt-get update && apt-get install -y cmake

WORKDIR /inContact

COPY ./dev-ops/entrypoint.sh ./entrypoint.sh
COPY .. .

RUN yarn install --frozen-lockfile

RUN yarn build:monitor:cl


FROM node:14-alpine as build-alpine

WORKDIR /inContact

RUN apk update && apk add bash python3 g++ make
RUN npm install sqlite3

COPY --from=build /inContact/ ./

FROM node:14-alpine
# ARG from docker action build-args
ARG IN_CONTACT_BOT_TOKEN
ARG IN_CONTACT_SMTP_USER
ARG IN_CONTACT_SMTP_PWD
ARG IN_CONTACT_SMTP_HOST
ARG IN_CONTACT_SMTP_FROM
ARG IN_CONTACT_MONITOR_API_BASE_URL

# host.docker.internal indicates docker contaniner ip
ENV IN_CONTACT_DB_HOST=host.docker.internal

#env from arguments
ENV IN_CONTACT_BOT_TOKEN=$IN_CONTACT_BOT_TOKEN
ENV IN_CONTACT_SMTP_USER=$IN_CONTACT_SMTP_USER
ENV IN_CONTACT_SMTP_PWD=$IN_CONTACT_SMTP_PWD
ENV IN_CONTACT_SMTP_HOST=$IN_CONTACT_SMTP_HOST
ENV IN_CONTACT_SMTP_FROM=$IN_CONTACT_SMTP_FROM
ENV IN_CONTACT_MONITOR_API_BASE_URL=$IN_CONTACT_MONITOR_API_BASE_URL

WORKDIR /inContact

RUN apk update && apk add bash

COPY --from=build-alpine /inContact/ ./

EXPOSE 587
EXPOSE 3003
EXPOSE 3002
EXPOSE 3000
EXPOSE 5432

ENTRYPOINT ./entrypoint.sh
