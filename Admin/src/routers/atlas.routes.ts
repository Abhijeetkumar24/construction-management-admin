

import express, { Router } from "express";
import { authController } from "../controllers/auth.controller";
import { validate } from "../middleware/validation/validation";
import Joi from "joi";
import { JOI_VALIDATION } from "../middleware/validation/joi.validation";
import { atlasController } from "../controllers/atlas.controller";

class AtlasRouter {
    private router!: Router;
    constructor() {
        this.router = Router();
    }

    atlasrouter() {
        this.router.get(
            '/search',
            atlasController.search
        );

        return this.router
    }
}
export const atlasRouter = new AtlasRouter()