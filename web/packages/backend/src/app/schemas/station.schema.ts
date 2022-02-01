import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypeOptions} from 'mongoose';
import {locationSchema } from './location.schema'
import { textSchema } from './text.schema';

@Schema()
export class Station extends Document {
  
  @Prop()
  _id:string

  @Prop()
  coordinates:[number]

  @Prop()
  _attributes: locationSchema

  @Prop()
  adresse:textSchema

  @Prop()
  ville: textSchema

  @Prop()
  services: [{service : string}]

  @Prop()
  prix: [{
        _attributes: {
            nom: string,
            id: string,
            maj: string,
            valeur: string
        }
    }]

  @Prop()
  rupture : [{
    _attributes: {
        id: string,
        nom: string,
        debut: string,
        fin: string
    }
}]
}

export const StationSchema = SchemaFactory.createForClass(Station);

