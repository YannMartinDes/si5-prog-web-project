import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type FuelDocument = Fuel & Document
@Schema()
export class Fuel{

    @Prop()
    _id!:string

    @Prop()
    name!:string

    @Prop()
    price!:number
}
export const FuelScheduleSchema = SchemaFactory.createForClass(Fuel);
