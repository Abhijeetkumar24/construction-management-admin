import mongoose, { Types } from "mongoose";
import { mongoConnection } from "../provider/mongo/mongo.connection";
import { COLLECTION } from "../interface/enum";


interface IWorker {
    adminId: Types.ObjectId,
    name: string,
    email: string,
    availability: string,
    skills: string[],
}

const workerSchema = new mongoose.Schema<IWorker>({
    adminId: Types.ObjectId,
    name: String,
    email: String,
    availability: String,
    skills: [String],

})

export const WorkerModel = mongoConnection.getConnection().model<IWorker>(COLLECTION.WORKER, workerSchema)