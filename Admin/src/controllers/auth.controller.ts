import { Request, Response } from "express"
import { authService } from "../services/auth.service";
import { adminEntity } from "../entity/admin.entity";
import { responseUtils } from "../utils/response.utils";
import { ExceptionMessage, HttpStatusMessage, SuccessMessage } from "../interface/enum";

class AuthController {

    constructor() { }

    adminSignup = async (req: Request, res: Response) => {

        const { name, username, email, password } = req.body;
        try {
            const existingAdmin = await adminEntity.findOne({ email })
            if (existingAdmin) {
                let error = responseUtils.errorResponse(
                    ExceptionMessage.EMAIL_ALREADY_EXIST,
                    ExceptionMessage.EMAIL_ALREADY_EXIST,
                    HttpStatusMessage.CONFLICT
                );
                return res.status(error.code).send(error);

            }

            const response = await authService.adminSignup(name, username, email, password);
            let finalResponse = responseUtils.successResponse(
                response,
                SuccessMessage.ADMIN_SIGNUP_SUCCESS,
                HttpStatusMessage.CREATED
            )
            res.status(finalResponse.code).send(finalResponse);
        } catch (error) {
            const err = responseUtils.errorResponse(
                error,
                ExceptionMessage.ADMIN_SIGNUP_ERROR
            );
            res.status(err.code).send(err);
        }
    }

    adminLogin = async (req: Request, res: Response) => {
        const { email, password } = req.body;
        
        try {
            const response = await authService.adminLogin(email, password);
            let finalResponse = responseUtils.successResponse(
                response,
                SuccessMessage.ADMIN_LOGIN_SUCCESS,
                HttpStatusMessage.OK,
            )
            res.status(finalResponse.code).send(finalResponse);
        } catch (error) {
            const err = responseUtils.errorResponse(
                error,
                ExceptionMessage.LOGIN_FAILED
            );
            res.status(err.code).send(err);
        }
    }
}

export const authController = new AuthController();