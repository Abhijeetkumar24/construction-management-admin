import mongoose from "mongoose";
import { mongoConnection } from "../../provider/mongo/mongo.connection";



interface IUser {
    name: string,
    email: string,
    password: string,
}

const userSchema = new mongoose.Schema<IUser>({
    name: String,
    email :String,
    password: String,

})

export const UserModel= mongoConnection.getConnection().model<IUser>('user',userSchema)