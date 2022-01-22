# End-to-End Testing
CHANGE DESCRIPTION!!!

Provide an e2e testing based on `supertest` and `mocha` libraries
Integration tests includes running `rtls-pub-sub-proxyd` module that is proxying messages.
Before running the tests be sure that this module is running: `systemctl status rtls-pub-sub-proxyd`.

## Run Integration Tests
    - `yarn test:integration`

## See Integration Tests Coverage
    - `yarn test:integration:coverage`
