import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypeOptions} from 'mongoose';

@Schema()
export class textSchema extends Document {

  @Prop()
  _text: string
}

  export const TextSchema = SchemaFactory.createForClass(textSchema);