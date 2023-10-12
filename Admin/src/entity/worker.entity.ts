
import { WorkerModel } from "../models/worker.schema";
import BaseEntity from "./base.entity";

class WorkerEntity extends BaseEntity{
    constructor(){
        super(WorkerModel)
    }
}

export const workerEntity = new WorkerEntity();