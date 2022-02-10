import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypeOptions} from 'mongoose';

@Schema()
export class horaireSchema extends Document {

        "_attributes": {
            "automate-24-24": string}
            "jour": [
              {
                  "_attributes": {
                      "id": string,
                      "nom": string,
                      "ferme": string
                  },
                  "horaire": {
                      "_attributes": {
                          "ouverture": string,
                          "fermeture": string
                      }
                  }
              }]
            
}

  export const LocationSchema = SchemaFactory.createForClass(horaireSchema);
