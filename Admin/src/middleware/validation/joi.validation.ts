import Joi, { string } from "joi";

export const JOI_VALIDATION = {
    ADMIN: {
        SIGN_IN: {
            name: Joi.string().required(),
            username: Joi.string().required(),
            email: Joi.string().required().email(),
            password: Joi.string().required()
        },

        LOGIN: {
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            emailOtp: Joi.string(),
            token: Joi.string(),
        },

    },


    PROPERTY: {
        ADD_PROPERTY: {

            location: Joi.string().required(),
            type: Joi.string().required(),
            specifications: Joi.string().required(),
            status: Joi.string().required(),
            workers: Joi.array().items(Joi.string()),
            flats: Joi.array().items(
                Joi.object({
                    flatNumber: Joi.string().required(),
                    bookedBy: Joi.string(),
                    status: Joi.string().required(),
                })
            ),
            materialCost: Joi.array().items(
                Joi.object({
                    material: Joi.string().required(),
                    cost: Joi.number().required(),
                })
            ),
            stripeId: Joi.string(),
        },

        MATERIAL_COST:{
            material: Joi.string().required(),
            cost: Joi.number().required()
        }
    },


    WORKER: {
        ADD_WORKER: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            availability: Joi.string().required(),
            skills: Joi.array().items(Joi.string()).required(),
        },

        HIRE_WORKER: {
            workerId: Joi.string().required(),
            skills: Joi.array().items(Joi.string()).min(1).required(),
        }
    }
}