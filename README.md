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
## Pre-requirements

1. Node - 14.x.x or later
1. yarn - 1.22.4 or later
1. redis - 3.2.x or later

## Run in console
Run services:

1. ```yarn install``` - install node modules
2. ```yarn ui:start``` - run server on port XXXX
