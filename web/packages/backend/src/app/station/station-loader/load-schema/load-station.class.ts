import { LoadHoraire } from './load-horaire.class';
import { LoadLocation } from './load-location.class';
import { LoadService } from './load-service.class';
import { Point } from 'geojson'



export class LoadStation {

  _id?:string

  location!:Point

  horaires?: LoadHoraire

  _attributes?: LoadLocation

  adresse?:{_text:string}

  ville?: {_text:string}

  services?: LoadService

  prix?: [{
        _attributes?: {
            nom?: string,
            id?: string,
            maj?: string,
            valeur?: string
        }
    }]

  rupture ?: [{
    _attributes?: {
        id?: string,
        nom?: string,
        debut?: string,
        fin?: string
    }
}]
}

