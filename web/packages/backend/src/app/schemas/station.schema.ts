import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Station extends Document {

  @Prop()
  name:any;
  
  @Prop()
  _attributes: any;

  @Prop()
  adress: any;

  @Prop()
  ville: any;

  @Prop()
  horaires: any;
}

export const StationSchema = SchemaFactory.createForClass(Station);

