import { AttendanceModel } from "../models/attendance.schema";
import { PropertyModel } from "../models/property.schema";
import BaseEntity from "./base.entity";

class AttendanceEntity extends BaseEntity{
    constructor(){
        super(AttendanceModel);
    }
}

export const attendanceEntity = new AttendanceEntity();