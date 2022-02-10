import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop()
  readonly username: string;
  @Prop()
  readonly password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
