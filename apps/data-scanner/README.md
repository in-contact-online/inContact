# INCONTACT DATA SCANNER

# 1. Database

## 1.1 Configuration

### Create .env file
-copy .env.defaults to .env

## 1.2 Migrations

### Add new migration

-   `cd ./apps/data-scanner`
-   `NAME=migration-name yarn migration:add` - this will create three files in `./lib/db/migrations`
-   describe migration in `*-up.sql` file

### Run migrations

-   `cd ./apps/data-scanner`
-   `yarn migration:run` - this will run all migrations described in sql files. In case migraion successfully done the record will be in migrations table in DB
-   `SELECT * FROM migrations;` - check all migrations in DB
