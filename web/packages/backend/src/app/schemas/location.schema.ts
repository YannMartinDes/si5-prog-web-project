import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypeOptions} from 'mongoose';

@Schema()
export class locationSchema extends Document<string> {

  @Prop()
  _id?: string

  @Prop()
  latitude?:string

  @Prop()
  longitude?: string

  @Prop()
  cp?: string

  @Prop()
  pop?:string
}

  export const LocationSchema = SchemaFactory.createForClass(locationSchema);
