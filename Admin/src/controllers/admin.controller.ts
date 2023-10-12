import { Request, Response } from "express";
import { responseUtils } from "../utils/response.utils";
import { ExceptionMessage, HttpStatusCode, HttpStatusMessage, SuccessMessage } from "../interface/enum";
import { adminService } from "../services/admin.service";
import { ServerUnaryCall, sendUnaryData } from "@grpc/grpc-js";
import { propertyEntity } from "../entity/property.entity";

class AdminController {
    constructor() { }

    addProperty = async (req: Request, res: Response) => {
        try {
            const user = req['user'];
            const requestData = req.body;
            let response = await adminService.addProperty(requestData, user.sub)

            let finalResponse = responseUtils.successResponse(
                response,
                SuccessMessage.PROPERTY_ADDED_SUCCESS,
                HttpStatusMessage.CREATED
            )
            res.status(finalResponse.code).send(finalResponse);

        } catch (error) {
            let err = responseUtils.errorResponse(
                error,
                ExceptionMessage.ADD_PROPERTY_FAIL,
            );
            res.status(err.code).send(err);
        }
    }



    activeConstructions = async (req: Request, res: Response) => {
        try {

            const user = req['user'];
            let response = await adminService.activeConstructions(user.sub)

            let finalResponse = responseUtils.successResponse(
                response,
                SuccessMessage.ACTIVE_CONSTRUCTION_SUCCESS,
                HttpStatusMessage.OK
            )
            res.status(finalResponse.code).send(finalResponse);

        } catch (error) {
            let err = responseUtils.errorResponse(
                error,
                ExceptionMessage.ACTIVE_CONSTRUCTION_ERROR,
            );
            res.status(err.code).send(err);
        }
    }


    addWorker = async (req: Request, res: Response) => {
        try {
            const user = req['user'];
            const requestData = req.body;
            let response = await adminService.addWorker(requestData, user.sub)

            let finalResponse = responseUtils.successResponse(
                response,
                SuccessMessage.WORKER_ADDED_SUCCESS,
                HttpStatusMessage.CREATED
            )
            res.status(finalResponse.code).send(finalResponse);

        } catch (error) {
            let err = responseUtils.errorResponse(
                error,
                ExceptionMessage.ADD_WORKER_FAIL,
            );
            res.status(err.code).send(err);
        }
    }



    hireWorker = async (req: Request, res: Response) => {
        try {
            const user = req['user'];
            const propertyId = req.params.propertyId;
            const requestData = req.body;
            let response = await adminService.hireWorker(propertyId, requestData, user.sub)

            let finalResponse = responseUtils.successResponse(
                response,
                SuccessMessage.HIRE_WORKER_SUCCESSFUL,
                HttpStatusMessage.OK
            )
            res.status(finalResponse.code).send(finalResponse);

        } catch (error) {
            let err = responseUtils.errorResponse(
                error,
                ExceptionMessage.HIRE_WORKER_ERROR,
            );
            res.status(err.code).send(err);
        }
    }


    workerList = async (req: Request, res: Response) => {
        try {
            const propertyId = req.params.propertyId;
            let response = await adminService.workerList(propertyId)

            let finalResponse = responseUtils.successResponse(
                response,
                SuccessMessage.WORKER_LIST_SUCCESS,
                HttpStatusMessage.OK
            )
            res.status(finalResponse.code).send(finalResponse);

        } catch (error) {
            let err = responseUtils.errorResponse(
                error,
                ExceptionMessage.WORKER_LIST_ERROR,
            );
            res.status(err.code).send(err);
        }
    }


    manageExpense = async (req: Request, res: Response) => {
        try {
            const propertyId = req.params.propertyId;
            const requestData = req.body;

            let response = await adminService.manageExpense(propertyId, requestData)
            let finalResponse = responseUtils.successResponse(
                response,
                SuccessMessage.MANAGE_EXPENSE_SUCCESS,
                HttpStatusMessage.OK
            )
            res.status(finalResponse.code).send(finalResponse);

        } catch (error) {
            let err = responseUtils.errorResponse(
                error,
                ExceptionMessage.MANAGE_EXPENSE_ERROR,
            );
            res.status(err.code).send(err);
        }
    }


    getAllProperty = async (req: Request, res: Response) => {
        try {

            const user = req['user'];
            let response = await adminService.getAllProperty(user.sub);
            let finalResponse = responseUtils.successResponse(
                response,
                SuccessMessage.GET_ALL_PROPERTY_SUCCESS,
                HttpStatusMessage.OK
            )
            res.status(finalResponse.code).send(finalResponse);

        } catch (error) {
            let err = responseUtils.errorResponse(
                error,
                ExceptionMessage.GET_ALL_PROPERTY_ERROR,
            );
            res.status(err.code).send(err);
        }
    }


    addAttendance = async (req: Request, res: Response) => {
        try {

            const user = req['user'];
            const requestData = req.body;
            const workerId = req.params.workerId;
            let response = await adminService.addAttendance(requestData, workerId, user.sub);
            let finalResponse = responseUtils.successResponse(
                response,
                SuccessMessage.ATTENDANCE_FETCH_SUCCESS,
                HttpStatusMessage.CREATED
            )
            res.status(finalResponse.code).send(finalResponse);

        } catch (error) {
            let err = responseUtils.errorResponse(
                error,
                ExceptionMessage.ATTENDANCE_FETCH_ERROR,
            );
            res.status(err.code).send(err);
        }
    }



    getProperty = async (req: Request, res: { send: (arg: any) => void }) => {
        try {

            const propertyId = req.params.propertyId;
            let response = await adminService.getProperty(propertyId);

            res.send({ message: response });
            // res.send("good");

        } catch (error) {

            // res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send(error);
            res.send({ err: error.message });

        }
    }

    async showData(req: ServerUnaryCall<any, any>, res: sendUnaryData<any>) {
        try {
            const property = await propertyEntity.findById(req.request.id)
            res(null, property);
        } catch (err) {
            res(null, err);
        }
    }


    async allProperty(req: ServerUnaryCall<any, any>, res: sendUnaryData<any>) {
        try {
            const properties = await propertyEntity.find({})
            res(null, {properties});
        } catch (err) {
            res(null, err);
        }
    }




}

export const adminController = new AdminController()