import mongoose from "mongoose";
import { mongoConnection } from "../provider/mongo/mongo.connection";
import { COLLECTION } from "../interface/enum";


interface IAdmin {
    name: string,
    username: string,
    email: string,
    password: string,
    role?: String,
    twoFaSecret?: String,
    driveQrCode?: String,
}

const adminSchema = new mongoose.Schema<IAdmin>({
    name: String,
    username: String,
    email :String,
    password: String,
    role: String,
    twoFaSecret: String,
    driveQrCode: String,

})

export const AdminModel= mongoConnection.getConnection().model<IAdmin>(COLLECTION.ADMIN,adminSchema)