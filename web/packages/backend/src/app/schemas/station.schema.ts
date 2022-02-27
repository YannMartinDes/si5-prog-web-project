import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Fuel } from "./fuel.schema";
import { Schedule } from "./schedule.schema";
import { Point } from "geojson";
import { Document } from 'mongoose';

export type StationDocument = Station & Document;
@Schema()
export class Station{


    @Prop()
    _id!:string;

    @Prop({type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: {
      type: [Number],
      default: [0, 0],
    }})
    position!:Point

    @Prop()
    fuels?:Fuel[]

    @Prop()
    services?:string[]

    @Prop()
    address!:string

    @Prop()
    city?:string

    @Prop()
    schedules?:Schedule[]


    @Prop({type:Boolean})
    automate = false

}

const StationSchema = SchemaFactory.createForClass(Station);
StationSchema.index( { "$**": "text" })
StationSchema.index( { position: "2dsphere" })

export {StationSchema};
