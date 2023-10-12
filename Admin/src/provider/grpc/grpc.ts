import grpc, { Server, ServerCredentials, loadPackageDefinition } from "@grpc/grpc-js";
import path from "path";
import { PackageDefinition, loadSync } from "@grpc/proto-loader";
import { adminController } from "../../controllers/admin.controller";


export class GrpcClass {

  //   private protoFilePath = path.resolve(__dirname, `${process.cwd()}/todo.proto`);
  private protoFilePath = path.join(__dirname, '../../../src/protos/property.proto');

  public propertyPackage: any;
  public grpcServer!: Server;

  constructor() {
    this.startGrpcServer()
  }

  private startGrpcServer() {
    this.loadGRPC();
    this.grpcServer = new Server();
    this.loadServiceDefinition();
    this.initServer();
  }

  private loadGRPC() {
    try {
      const packageDef: PackageDefinition = loadSync(
        path.resolve(__dirname, this.protoFilePath),
        {
          keepCase: true,
          longs: String,
          enums: String,
          defaults: true,
          oneofs: true,
        }
      );
      const grpcObject = loadPackageDefinition(packageDef);
      this.propertyPackage = grpcObject.propertyPackage;
    } catch (err) {
      console.log(err);
    }
  }

  private loadServiceDefinition() {
    this.loadService(this.grpcServer, this.propertyPackage);
  }

  public loadService(grpcServer: Server, propertyPackage: any) {
    grpcServer.addService(
      propertyPackage.Property.service, {
      GetProperty: adminController.showData,
      GetAllProperty: adminController.allProperty
    },
    )
  }

  private initServer() {
    this.grpcServer.bindAsync(
      `0.0.0.0:7000`,
      ServerCredentials.createInsecure(),
      this.grpcCallback
    );
  }

  private grpcCallback = (err: Error | null, port: number): void => {
    if (err) {
      console.error(err);
      return;
    }
    this.grpcServer.start();
    console.log(`gRPC server listening on ${port}`);
  };
}
