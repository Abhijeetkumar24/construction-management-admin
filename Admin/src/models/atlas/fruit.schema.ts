import mongoose from "mongoose";
import { mongoConnection } from "../../provider/mongo/mongo.connection";

interface IFruit {
    type: string,
    description: string,
    category: string,
    in_stock: string
}

const fruitSchema = new mongoose.Schema<IFruit>({
    type: String,
    description :String,
    category: String,
    in_stock: String,

})

export const FruitModel= mongoConnection.getConnection().model<IFruit>('fruit',fruitSchema)