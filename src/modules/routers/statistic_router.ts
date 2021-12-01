import express, { Request, Response } from "express";
import { getLink } from "../mongoose";
import regexLink from "../../general date/regexLink";

const router = express.Router();

const getStatistic = async (req: Request, res: Response) => {
    const {login, link} = req.body;

    if (!login || link.match(regexLink) || !link.match(/.{8}/)) {
        res.sendStatus(400);
        return;
    }
    const current_link = await getLink(login, link);
    if (current_link) {
        res.send(JSON.stringify(current_link));
    } else {
        res.sendStatus(401);
    }
}
router.post('/', express.json(), getStatistic);
router.get('/', (_, res) => res.sendStatus(200));

export default router;