import express, { Request, Response } from "express";
import { getAllLinks } from "../mongoose";

const router = express.Router();

const getStatistic = async (req: Request, res: Response) => {
    const {login} = req.body;

    if (!login) {
        res.sendStatus(400);
        return;
    }
    const links = await getAllLinks(login);
    if (links) {
        res.send(JSON.stringify(links));
    } else {
        res.sendStatus(401);
    }
}
router.post('/', express.json(), getStatistic);
router.get('/', (_, res) => res.sendStatus(200));

export default router;