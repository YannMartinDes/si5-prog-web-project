import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HourSchedule } from "./hourSchedule.schema";
import { Document } from 'mongoose';

export type ScheduleDocument = Schedule & Document
@Schema()
export class Schedule {

    @Prop()
    _id!:string

    @Prop()
    day!:string

    // eslint-disable-next-line @typescript-eslint/no-inferrable-types
    @Prop()
    openned:boolean=false;

    @Prop()
    hourSchedule:HourSchedule[]=[];
}
export const ScheduleSchema = SchemaFactory.createForClass(Schedule);
