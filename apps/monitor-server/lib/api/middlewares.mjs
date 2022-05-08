import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
    json: bodyParser.json({
        limit: '500mb',
        verify: (req, res, buf) => {
            try {
                JSON.parse(buf);
            } catch (err) {
                res.send({
                    status: 0,
                    error: {
                        message: 'Please verify your JSON',
                    },
                });
            }
        },
    }),
    urlencoded: bodyParser.urlencoded({ extended: false }),

    cors: cors(),

    static: express.static(path.join(__dirname, '../../..', '/monitor-client/build')),
};
