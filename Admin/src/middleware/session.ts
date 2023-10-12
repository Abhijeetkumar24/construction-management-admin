import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { redis } from "../provider/redis/redis.connection";
import { CustomException } from "../utils/exception.utils";
import { ExceptionMessage, HttpStatusMessage } from "../interface/enum";
import { responseUtils } from "../utils/response.utils";

class SessionValidation {
    constructor() { }

    async checkSession(req: Request, res: Response, next: NextFunction) {
        const header = req.headers.authorization;

        try {

            if (!header) {
                
                throw new CustomException(ExceptionMessage.TOKEN_NOT_FOUND, HttpStatusMessage.NOT_FOUND).getError();
            }

            const token = header.split(' ')[1];

            const decodedToken = jwt.verify(token, 'this is my secret');

            req['user'] = decodedToken;

            const id = decodedToken.sub
            const value = await redis.get(JSON.stringify(id))      // use for session 

            if (!value) {
                throw new CustomException(ExceptionMessage.SESSION_NOT_FOUND, HttpStatusMessage.NOT_FOUND).getError()         // when user logout
            }

            next();
        }
        catch (error) {

            let err = responseUtils.errorResponse(
                error,
            );
            res.status(err.code).send(err);

        }

    }

}
export const sessionValidation = new SessionValidation();