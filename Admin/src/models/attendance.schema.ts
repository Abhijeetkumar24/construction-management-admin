import mongoose, { Types } from "mongoose";
import { mongoConnection } from "../provider/mongo/mongo.connection";
import { COLLECTION } from "../interface/enum";


interface IAttendance {
    adminId: Types.ObjectId,
    workerId: Types.ObjectId,
    propertyId: Types.ObjectId,
    date: Date,
    status: string,
}

const attendanceSchema = new mongoose.Schema<IAttendance>({
    adminId: Types.ObjectId,
    workerId: Types.ObjectId,
    propertyId: Types.ObjectId,
    date: Date,
    status: String,

})

export const AttendanceModel = mongoConnection.getConnection().model<IAttendance>(COLLECTION.ATTENDANCE, attendanceSchema)