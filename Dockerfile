FROM node:14.15.4
ARG IN_CONTACT_BOT_TOKEN

RUN apt-get update && apt-get install -y cmake

ENV NODE_ENV=production
ENV IN_CONTACT_DB_HOST=host.docker.internal
ENV IN_CONTACT_BOT_TOKEN=$IN_CONTACT_BOT_TOKEN

RUN echo "$IN_CONTACT_BOT_TOKEN"

WORKDIR /inContact

COPY . .

RUN yarn install --frozen-lockfile

EXPOSE 587
EXPOSE 3003
EXPOSE 3002
EXPOSE 3000
EXPOSE 5432

ENTRYPOINT ./entrypoint.sh
