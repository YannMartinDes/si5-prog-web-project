import { Schema, SchemaFactory } from "@nestjs/mongoose";
import { textSchema } from "./text.schema";
import { Document } from "mongoose";



@Schema()
export class serviceSchema extends Document {
"service" : [textSchema]
}

export const ServiceSchema = SchemaFactory.createForClass(serviceSchema);