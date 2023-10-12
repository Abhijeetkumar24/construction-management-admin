import mongoose, { Types } from "mongoose";
import { mongoConnection } from "../provider/mongo/mongo.connection";
import { COLLECTION } from "../interface/enum";

interface ISession {
    userId: Types.ObjectId,
    isActive: string,
    expiresAt: Date
}

const SessionSchema = new mongoose.Schema<ISession>({
    userId: Types.ObjectId,
    isActive: {
        type: String,
        default: 'true'
    },
    expiresAt: {
        type: Date,
        default: () => Date.now() + 3600000 
    }
},{
    timestamps: true
})

export const SessionModel = mongoConnection.getConnection().model<ISession>(COLLECTION.SESSION, SessionSchema)