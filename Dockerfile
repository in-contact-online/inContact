FROM node:14.15.4

ENV NODE_ENV=production
ENV IN_CONTACT_DB_HOST=host.docker.internal

WORKDIR /inContact

COPY . .

RUN yarn install --frozen-lockfile

EXPOSE 587
EXPOSE 3003
EXPOSE 3002
EXPOSE 3000
EXPOSE 5432

ENTRYPOINT ./entrypoint.sh
