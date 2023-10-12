import { Request, Response } from "express"
import { atlasService } from "../services/atlas.service";

class AtlasController {

    constructor() { }

    search = async (req: Request, res: Response) => {
        try {

            let response = await atlasService.search();

            res.send({ message: response });

        } catch (error) {

            res.send({ err: error.message });

        }
    }
}

export const atlasController = new AtlasController();