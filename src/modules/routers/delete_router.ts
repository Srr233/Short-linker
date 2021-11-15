import express, { Request, Response } from "express";
import { deleteInMongo } from "../mongoose";


const router = express.Router();

const deleteIn = async (req: Request, res: Response) => {
    const {login, link} = req.body;

    if (!login || !link) {
        res.sendStatus(400);
        return;
    }
    const isDeleted = await deleteInMongo(login, link);
    if (isDeleted) {
        res.sendStatus(200);
    } else {
        res.sendStatus(500);
    }
}
router.post('/', express.json(), deleteIn);
router.get('/', (_, res) => res.sendStatus(200));

export default router;