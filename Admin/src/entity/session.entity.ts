import { SessionModel } from "../models/session.schema";
import BaseEntity from "./base.entity";

class SessionEntity extends BaseEntity{
    constructor(){
        super(SessionModel);
    }
}

export const sessionEntity = new SessionEntity();