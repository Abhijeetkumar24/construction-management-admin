import express, { Express}  from "express";
import { adminContext, atlasContext, authContext, portNumber } from "./constants.ts/constants";
import { mongoConnection } from "./provider/mongo/mongo.connection";
import { adminRouter, authRouter, atlasRouter } from "./routers/router";
import { GrpcClass } from "./provider/grpc/grpc";


class App{
    private app!: Express;                               // ! is used to indicate that a property will be initialized later               
    private port!: string;
    private authContext!: string;
    private adminContext!: string;
    private atlasContext!: string;
    
    constructor(){
        this.startApp();
    }

    startApp() {
        this.app = express();
        this.configureAppSettings();
        mongoConnection.initiateMongoConnection;
        new GrpcClass();
        this.loadContext()
        this.loadRouter();
        this.initServer();

    }

    configureAppSettings(){
        this.app.use(express.json());
        this.port = portNumber;
    }

    loadContext(){
        this.authContext = authContext;
        this.adminContext = adminContext;
        this.atlasContext = atlasContext;
    }

    loadRouter(){
        this.app.use(this.authContext, authRouter.authrouter());
        this.app.use(this.adminContext, adminRouter.propertyRouter());
        this.app.use(this.adminContext, adminRouter.workerRouter());
        this.app.use(this.atlasContext, atlasRouter.atlasrouter())
    }
 
    initServer(){
        this.app.listen(this.port, () => {
            console.log(`Server is running on port: ${this.port}`);
        })
    }

}(async () => {                                           // Immediately Invoked Function Expression
    new App();
  })();