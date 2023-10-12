import { ExecutionContextHost } from "@nestjs/core/helpers/execution-context-host";
import { propertyEntity } from "../entity/property.entity";
import { AcceptAny } from "../interface/type";
import { CustomException } from "../utils/exception.utils";
import { ExceptionMessage, HttpStatusMessage, SuccessMessage } from "../interface/enum";
import { workerEntity } from "../entity/worker.entity";
import { attendanceEntity } from "../entity/attendance.entity";

class AdminService {
    constructor() { }

    addProperty = async (requestData: AcceptAny, adminId: string) => {

        const { specifications, ...rest } = requestData;
        const existingProperty = await propertyEntity.findOne({ specifications })

        if (existingProperty) {
            throw new CustomException(ExceptionMessage.PROPERTY_ALREADY_EXIST, HttpStatusMessage.CONFLICT).getError();
        }

        await propertyEntity.create({ ...rest, specifications, adminId });
        return SuccessMessage.PROPERTY_ADDED_SUCCESS;
    }


    activeConstructions = async (adminId: string) => {

        return await propertyEntity.find({ adminId, status: 'under-construction' });
    }


    hireWorker = async (propertyId: string, requestData: AcceptAny, adminId: string) => {

        const property = await propertyEntity.findOne({ _id: propertyId, adminId });
        if (!property) {
            throw new CustomException(ExceptionMessage.PROPERTY_NOT_FOUND, HttpStatusMessage.NOT_FOUND).getError();

        }
        const workerId = requestData.workerId;

        const worker = await workerEntity.findOne({ _id: workerId, adminId })
        if (!worker) {
            throw new CustomException(ExceptionMessage.WORKER_NOT_FOUND, HttpStatusMessage.NOT_FOUND).getError();

        }

        if (worker.availability !== 'yes') {
            throw  new CustomException(ExceptionMessage.WORKER_NOT_AVAILABLE, HttpStatusMessage.NOT_FOUND).getError();
        }

        for (const skill of requestData.skills) {
            if (!worker.skills.includes(skill)) {
                throw new CustomException(ExceptionMessage.SKILLS_NOT_FOUND, HttpStatusMessage.NOT_FOUND).getError();
            }
        }

        property.workers.push(worker._id);
        await property.save();

        worker.availability = 'no';
        await worker.save();

        return property;

    }


    async addWorker(requestData: AcceptAny, adminId: string): Promise<Worker> {
        const { name, email, availability, skills } = requestData;

        const existingWorker = await workerEntity.findOne({ email });
        if (existingWorker) {
            throw new CustomException(ExceptionMessage.WORKER_ALREADY_EXIST, HttpStatusMessage.CONFLICT).getError();
        }

        return await workerEntity.create({name, email, availability, skills, adminId });
    }


    workerList = async (propertyId: string) => {

        const property = await propertyEntity.findOne( { _id: propertyId } );
        if (!property) {
            throw new CustomException(ExceptionMessage.PROPERTY_NOT_FOUND, HttpStatusMessage.NOT_FOUND).getError();
        }
        return property.workers;
    }

    manageExpense = async (propertyId: string, requestData: AcceptAny) => {

        const {material , cost} = requestData;
        const property = await propertyEntity.findById(propertyId);
        if (!property) {
            throw new CustomException(ExceptionMessage.PROPERTY_NOT_FOUND, HttpStatusMessage.NOT_FOUND).getError();
        }

        property.materialCost.push({
            material,
            cost
        });

        await property.save();

        const totalMaterialCost = property.materialCost.reduce((total, expense) => total + expense.cost, 0);


        return {
            AllMaterial: property.materialCost,
            TotalCost: totalMaterialCost
        };
    }


    getAllProperty = async (adminId: string) => {

        return propertyEntity.find({adminId});
    }


    addAttendance = async (requestData: AcceptAny, workerId: string, adminId: string) => {

        const { propertyId, date, status } = requestData;

        const property = await propertyEntity.findById(propertyId);
        if (!property) {
            throw new CustomException(ExceptionMessage.PROPERTY_NOT_FOUND, HttpStatusMessage.NOT_FOUND).getError();
        }


        const existingAttendance = await attendanceEntity.findOne({ workerId, date });
        if (existingAttendance) {
            throw new CustomException(ExceptionMessage.ATTENDANCE_ALREADY_EXIST, HttpStatusMessage.CONFLICT).getError();
        }

        await attendanceEntity.create({
            adminId,
            workerId,
            propertyId,
            date,
            status

        })
        return { date, status }

    }


    getProperty =async (propertyId:string) => {
        console.log("hi 1")
        const property = await propertyEntity.findById(propertyId)
        console.log("property: " + property)
        return property;
        
    }



}

export const adminService = new AdminService();