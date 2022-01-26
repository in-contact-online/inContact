# INCONTACT UI

# 1. Database

## 1.1 Configuration

### Create User and Database

-`sudo -u postgres psql` -`create database in_contact;` -`create user in_contact;` -`ALTER USER in_contact with password 'in_contact';` -`grant all privileges on database in_contact to in_contact;`

### Login to database from console

-`psql --host=localhost --username=in_contact in_contact -W`

### Create .env file

-copy .env.defaults to .env

## 1.2 Migrations

### Add new migration

-   `cd ./apps/ui`
-   `NAME=migration-name yarn migration:add` - this will create three files in `./lib/db/migrations`
-   describe migration in `*-up.sql` file

### Run migrations

-   `cd ./apps/ui`
-   `yarn migration:run` - this will run all migrations described in sql files. In case migraion successfully done the record will be in migrations table in DB
-   `SELECT * FROM migrations;` - check all migrations in DB
