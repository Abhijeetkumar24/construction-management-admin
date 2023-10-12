import { PropertyModel } from "../models/property.schema";
import BaseEntity from "./base.entity";

class PropertyEntity extends BaseEntity{
    constructor(){
        super(PropertyModel)
    }
}

export const propertyEntity = new PropertyEntity();