import { Request, Response } from "express";
import { adminEntity } from "../entity/admin.entity";
import { AcceptAny } from "../interface/type";
import bcrypt from 'bcrypt';
import { ExceptionMessage, HttpStatusMessage, SuccessMessage } from "../interface/enum";
import { CustomException } from "../utils/exception.utils";
import jwt from 'jsonwebtoken';
import { redis } from "../provider/redis/redis.connection";
import { sessionEntity } from "../entity/session.entity";



class AuthService {


    constructor() { }

    adminSignup = async (name: string, username: string, email: string, password: string) => {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            await adminEntity.create({ name, username, email, role:'admin', password: hashedPassword});
            return SuccessMessage.ADMIN_SIGNUP_SUCCESS;
        } catch (error) {
            throw error;
        }
    }

    adminLogin = async (email: string, password: string) => {
        const user = await adminEntity.findOne({ email }, {}, {})
        if (!user) {
            throw new CustomException(ExceptionMessage.EMAIL_NOT_EXISTS, HttpStatusMessage.NOT_FOUND).getError();
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return { error: "Invalid password" };
        }


        const payload = { sub: user._id, email: user.email, role: user.role };
        const access_token = await jwt.sign(payload, process.env.JWT_SECRET_KEY, {expiresIn: '1hr'});

        await redis.set(JSON.stringify(user._id), payload);     // stroe in session

        await sessionEntity.create({userId: user._id})

        return  {access_token};

    }
}

export const authService = new AuthService();