require('dotenv').config();

import express from 'express';
import cors from 'cors';
import http from 'http';
import config from './config';
import bodyParser from 'body-parser';
import 'reflect-metadata';
import { IncomingMessage } from './types';
import registerRoutes from './register-routes';
import { connect } from 'mongoose';

const server = express();
const httpServer = http.createServer(server);
const PORT = config.app.port;
const API_NAME = config.app.name;

server.use(cors());

server.use(
    bodyParser.json({
        verify: (req: IncomingMessage, _, buf: Buffer) => {
            req.rawBody = buf;
        },
        limit: '25mb'
    })
);

server.use(bodyParser.urlencoded({ limit: '25mb', extended: true }));

server.get('/', (_1, res) => res.send(`${API_NAME} listening!`));
registerRoutes(server);

httpServer.listen(PORT, async () => {
    try {
        const url = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_HOST}/${process.env.MONGO_DB_DEFAULT}`;
        await connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.info(`${API_NAME} listening on port ${PORT}!`);
    } catch (error) {
        console.info(`MongoConnection Error: ${error}`);
    }
});