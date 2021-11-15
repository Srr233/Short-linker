import express, { Request, Response } from "express";
import { createInMongo } from "../mongoose";
import {v1 as uuidV1} from 'uuid';
import regexLink from "../../general date/regexLink";


const router = express.Router();

const create = async (req: Request, res: Response) => {
    const {login, link} = req.body;

    if (!login || !link?.match(regexLink)) {
        res.sendStatus(400);
        return;
    }
    const shortLink = uuidV1().split('-')[0];
    await createInMongo(login, link, shortLink);
    res.send(JSON.stringify({
        short: shortLink
    }));
}
router.post('/', express.json(), create);
router.get('/', (_, res) => res.sendStatus(200));

export default router;