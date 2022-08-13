# NodeJs/PostgreSQL

# 1. Conventions
## 1.1 Code style
### Formatting rules
- please, follow the eslint rules described in project (with this purpose setting up your IDE with the ```.eslintrc```);

### Naming rules
- please name the variables and constants in a human-readable manner (ex. use `getUsersSql` instead of `sql1`);
- please use the `camelCase` style in name the variables and constants (ex. `getUsersSql` instead of `get_users_sql`);
- please use upper case naming for constants that are not changeable in project (ex. `MAX_ROWS_NUMBER`);
- please use `JavaScript` conventions in naming the classes, constructors(functions) and others entities (classes should be named wih the first capital latter);

## 1.2. Tests
### Unit tests
- unit tests should be places at the same level as the tested file
- unit test name should include the name of the file that is contain covered functionality and obey a pattern `{filename}.test.mjs`
- run tests with the command `yarn test:unit` in application directory (`apps/data-analyzer`, `apps/notificator`, `apps/data-scanner`, `apps/ui`)

### Integration tests
- e2e tests should be places at the `e2e/integration` folder of each application
- e2e test name should include the name of the entity that is testing and obey a pattern `{filename}.test.mjs`
- run tests with the command `yarn test:integration` in application directory (`apps/data-analyzer`, `apps/notificator`, `apps/data-scanner`, `apps/ui`)

# 2. Run project
## 2.1 Pre-requirements
1. Node - 14.x.x or later
2. yarn - 1.22.4 or later
3. PostgreSQL - 14 or later

## 2.2 Database configuration
### Create User and Database
- `sudo -u postgres psql` -`create database in_contact;` -`create user in_contact;` -`ALTER USER in_contact with password 'in_contact';` -`grant all privileges on database in_contact to in_contact;`

### Login to database from console
- `psql --host=localhost --username=in_contact in_contact -W`

### Migrations
1. Follow instructions in ```./shared/db-migration/README.md```

## 2.3 Configure Modules
1. Follow instructions in ```./apps/ui/README.md```
2. Follow instructions in ```./apps/data-scanner/README.md```
3. Follow instructions in ```./apps/data-analyzer/README.md```
4. Follow instructions in ```./apps/monitor-client/README.md```
5. Follow instructions in ```./apps/monitor-server/README.md```
6. Follow instructions in ```./shared/env/README.md```

## 2.4 Run in console
Run commands:
1. ```yarn install``` - install node modules
2. ```yarn start:ui``` - run Telegram bot
3. ```yarn start:scanner``` - run data scanner service on port `3000`
4. ```yarn start:analyzer``` - run data analyzer service on port `3003` 
5. ```yarn start:monitor:sr``` - run monitor server on port `3002`
6. ```yarn start:monitor:cl``` - run monitor client in hot regime on port `8086`

# 3. Build and deploy
## 3.1 Build
To build project it is necessary run command `yarn version:patch` in work directory `./inContact`.
This will generate new project tag and triggers docker image build on a GitHub.
Built docker image will be published on the Docker Hub.

## 3.2 Deploy
Deploy could be triggered by calling manually `Deploy Docker Images` workflow in `Actions` section of the GitHub.
