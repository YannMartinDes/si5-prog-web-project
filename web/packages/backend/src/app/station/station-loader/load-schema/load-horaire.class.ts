export class LoadHoraire {

    _attributes?: {
        'automate-24-24': string
    }
    jour?: LoadHoraireDay[]|LoadHoraireDay
    
}

export interface LoadHoraireDay {
    _attributes?: {
        id?: string,
        nom?: string,
        ferme?: string
    },
    horaire?: {
        _attributes?: {
            ouverture?: string,
            fermeture?: string
        }
    }
}[]

export const defaultHoraire =()=> {

    return {
        _attributes: {
            ouverture: '00.00',
            fermeture: '00.00'
        }
    }
}