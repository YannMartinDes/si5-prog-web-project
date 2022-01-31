import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Station extends Document {

  @Prop()
  name:string;

  @Prop()
  _attributes: string;

  @Prop()
  adress: string;

  @Prop()
  ville: string;

  @Prop()
  horaires: string;
}

export const StationSchema = SchemaFactory.createForClass(Station);

