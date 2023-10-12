import { FilterQuery, Model, ProjectionType, QueryOptions } from "mongoose";
import { AcceptAny } from "../interface/type";

export default class BaseEntity {

    private model: Model<any>
    constructor(mongoModel: Model<any>) {
        this.model = mongoModel;
    }

    async create<Type>(data: Type) {                                       //   The generic type <Type> allows flexibility in the type of data that can be passed to this method
        try {
            return await new this.model(data).save();
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async findOne(
        query: FilterQuery<AcceptAny>,
        projection?: ProjectionType<AcceptAny>,
        options?: QueryOptions                                                                          //additional options you can pass to the database query, such as sorting, limiting the number of results, or skipping records
    ) {
        try {
            return await this.model.findOne(query, projection, options).exec();                         // .exec(): This method is used to execute the query, and it returns a promise that resolves with the results of the query.
        } catch (error) {
            return Promise.reject(error);
        }
    }


    async find(
        query: FilterQuery<AcceptAny>,
        projection?: ProjectionType<AcceptAny>,
        options?: QueryOptions
    ) {
        try {
            return await this.model.find(query, projection, options).exec();
        } catch (error) {
            return Promise.reject(error);
        }
    }


    async findById(
        id: string,
        projection?: ProjectionType<AcceptAny>,
        options?: QueryOptions
    ) {
        try {
            return await this.model.findById(id, projection, options).exec();
        } catch (error) {
            return Promise.reject(error);
        }
    }

}