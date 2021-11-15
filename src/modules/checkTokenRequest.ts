import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import secret_key from "../general date/secret_key"

const checkTokenRequest = (req: Request, res: Response, next: NextFunction) => {
    const auth_token = req.headers.authorization;
    if (auth_token) {
        try {
            jwt.verify(auth_token, secret_key);
            next();
            return;
        } catch(e) {
            console.log(e);
        }
    }
    res.sendStatus(401);
}
export default checkTokenRequest;