import { NextFunction, Request, Response } from "express";
import { AcceptAny } from "../../interface/type";
import { responseUtils } from "../../utils/response.utils";

class Validation {
    body = (schema: AcceptAny) => {
        return async (req: Request, res: Response, next: NextFunction) => {
            const { error } = schema.validate(req.body);
            if (error) {
                const err = responseUtils.errorResponse({
                    error: error?.message || error?.details[0]?.message,
                });
                return res.status(err.code).send(err);
            }
            next();
        };
    };


    params = (schema: AcceptAny) => {
        return async (req: Request, res: Response, next: NextFunction) => {
            const { error } = schema.validate(req.params);
            if (error) {
                const err = responseUtils.errorResponse({
                    error: error.details[0].message,
                });
                return res.status(err.code).send(err);
            }
            next();
        };
    };


    queryParam = (schema: AcceptAny) => {
        return async (req: Request, res: Response, next: NextFunction) => {
            const { error } = schema.validate(req.query, { context: true });
            if (error) {
                const err = responseUtils.errorResponse({
                    error: error.details[0].message,
                });
                return res.status(err.code).send(err);
            }
            next();
        };
    };


    headers = (schema: AcceptAny) => {
        return async (req: Request, res: Response, next: NextFunction) => {
            const { error } = schema.validate(req.headers);
            if (error) {
                const err = responseUtils.errorResponse({
                    error: error.details[0].message,
                });
                return res.status(err.code).send(err);
            }
            next();
        };
    };

};

export const validate = new Validation();