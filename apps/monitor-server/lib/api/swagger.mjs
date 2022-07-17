import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';

import swaggerOptions from './swaggerOptions.json';
const { major_version, patch_version, minor_version } = swaggerOptions;

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'In Contact Monitor REST Server',
            version: `${major_version}.${minor_version}.${patch_version}`,
        },
    },
    apis: ['./lib/api/rest-api/routes/*.mjs', './lib/models/**/*.mjs'],
};
const openapiSpecification = await swaggerJsDoc(options);

export const serve = swaggerUi.serve;
export const setup = swaggerUi.setup(openapiSpecification);
