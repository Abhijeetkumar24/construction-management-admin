import mongoose, { Types } from "mongoose";
import { mongoConnection } from "../provider/mongo/mongo.connection";
import { COLLECTION } from "../interface/enum";


interface IProperty {
    adminId: Types.ObjectId,
    location: string,
    type: string,
    specifications: string,
    status: string,
    workers?: Types.ObjectId[],
    flats?: [
        {
            flatNumber: string,
            bookedBy: mongoose.Types.ObjectId,
            status: string,
        },
    ],
    materialCost?: [
        {
            material: string,
            cost: Number,
        },
    ],
    stripeId?: string,
}

const propertySchema = new mongoose.Schema<IProperty>({
    adminId: Types.ObjectId,
    location: String,
    type: String,
    specifications: String,
    status: String,
    workers: [Types.ObjectId],
    flats: [
        {
            flatNumber: String,
            bookedBy: mongoose.Types.ObjectId,
            status: String,
        },
    ],
    materialCost: [
        {
            material: String,
            cost: Number,
        },
    ],
    stripeId: String,

})

export const PropertyModel = mongoConnection.getConnection().model<IProperty>(COLLECTION.PROPERTY, propertySchema)