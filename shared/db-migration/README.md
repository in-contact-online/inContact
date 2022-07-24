# IN-CONTACT DATABASE MIGRATION UTIL

## Migrations
### Add new migration
1. `cd ./shared/db-migration`
2. `NAME=migration-name yarn migration:add` - this will create three files in `./lib/migrations`
3. describe migration in `*-up.sql` file

### Run migrations
1. `cd ./shared/db-migration`
2. `yarn migration:run` - this will run all migrations described in sql files. In case migraion successfully done the record will be in migrations table in DB
3. `SELECT * FROM migrations;` - check all migrations in DB


## Basic Usage
```
import { runDBMigrations } from '@in-contact/db-migration';

await runDBMigrations();
```
