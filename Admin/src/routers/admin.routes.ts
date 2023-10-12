import { Router } from "express";
import { sessionValidation } from "../middleware/session";
import { adminController } from "../controllers/admin.controller";
import { validate } from "../middleware/validation/validation";
import Joi from "joi";
import { JOI_VALIDATION } from "../middleware/validation/joi.validation";

class AdminRouter{
    private router!: Router;
    
    constructor(){
        this.router = Router();
    }

    propertyRouter(){
        this.router.post(
            '/add-property',
            validate.body(Joi.object(JOI_VALIDATION.PROPERTY.ADD_PROPERTY)),
            sessionValidation.checkSession,
            adminController.addProperty
        );

        this.router.get(
            '/active-constructions',
            sessionValidation.checkSession,
            adminController.activeConstructions
        );

        this.router.post(
            '/manage-expense/:propertyId',
            validate.body(Joi.object(JOI_VALIDATION.PROPERTY.MATERIAL_COST)),
            sessionValidation.checkSession,
            adminController.manageExpense
        );

        this.router.get(
            '/allproperty',
            sessionValidation.checkSession,
            adminController.getAllProperty
        );

        this.router.get(
            '/get-property/:propertyId',
            adminController.getProperty
        );



        return this.router;
    }


    workerRouter(){
        this.router.post(
            '/add-worker',
            validate.body(Joi.object(JOI_VALIDATION.WORKER.ADD_WORKER)),
            sessionValidation.checkSession,
            adminController.addWorker
        );

        this.router.post(
            '/hire/:propertyId',
            validate.body(Joi.object(JOI_VALIDATION.WORKER.HIRE_WORKER)),
            sessionValidation.checkSession,
            adminController.hireWorker
        );

        this.router.get(
            '/workerlist/:propertyId',
            sessionValidation.checkSession,
            adminController.workerList
        );

        this.router.post(
            '/add-attendance/:workerId',
            sessionValidation.checkSession,
            adminController.addAttendance
        );



        return this.router;
    }    



    

}

export const adminRouter = new AdminRouter();