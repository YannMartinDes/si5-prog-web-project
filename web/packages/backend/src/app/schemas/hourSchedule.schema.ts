import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type HourScheduleDocument = HourSchedule & Document
@Schema()
export class HourSchedule{
    

    @Prop()
    _id?:string

    @Prop({type:'string'})
    openHour='00.00'

    @Prop({type:'string'})
    closedHour='00.00'
}

export const HourScheduleSchema = SchemaFactory.createForClass(HourSchedule);
