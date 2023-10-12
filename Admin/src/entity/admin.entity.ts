import { AdminModel } from "../models/admin.schema";
import BaseEntity from "./base.entity";

class AdminEntity extends BaseEntity{
    constructor(){
        super(AdminModel)
    }
}

export const adminEntity = new AdminEntity();