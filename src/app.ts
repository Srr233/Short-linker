import express from "express";
import mongoose from "mongoose";
import mongo_uri from './general date/mongo_uri';
import cors from 'cors';
import cors_options from "./general date/cors_options";
import createRouter from "./modules/routers/create_router";
import deleteRouter from './modules/routers/delete_router';
import getAllLinksRouter from './modules/routers/statistic_router';
import check from "./modules/checkTokenRequest";

const env_port = process.env.PORT || 3000;

const app = express();

const start = async () => {
    await mongoose.connect(mongo_uri);
    app.use(cors(cors_options));
    app.use(check, express.json());
    app.get('/', (_, res) => res.sendStatus(200));
    app.use('/create', createRouter);
    app.use('/delete', deleteRouter);
    app.use('/statistic', getAllLinksRouter);
    app.listen(env_port, () => {
        console.log('started');
    });
}

start();
