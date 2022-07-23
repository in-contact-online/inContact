const path = require('path');
const confme = require('./confme/index.cjs');

const ROOT_SERVER_PATH = __dirname;

const config = confme(
    path.join(ROOT_SERVER_PATH, '../config/config.json'),
    path.join(ROOT_SERVER_PATH, '../config/config-schema.json')
);

module.exports = {
    config,
};
