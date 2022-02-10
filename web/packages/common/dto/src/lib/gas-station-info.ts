import { GasPrice } from ".";
import { GasStationSchedule } from "./gas-station-schedule";

export interface GasStationInfo {
    id: string;
    /*
      Station de gonflage
      Laverie
      Lavage automatique
      Lavage manuel
      Automate CB 24/24
      Carburant additivé
      Toilettes publiques
      Bar
      Espace bébé
      Piste poids lourds
      Station de gonflage
      Boutique alimentaire
      DAB (Distributeur automatique de billets)
      Vente de gaz domestique (Butane, Propane)
      Relais colis
      Boutique non alimentaire
      Services réparation / entretien
      Vente d'additifs carburants
      Vente de pétrole lampant
      Aire de camping-cars
      Location de véhicule
      Restauration sur place
      Restauration à emporter
      Bornes électriques
      GNV
      Vente de fioul domestique
      Douches
      Wifi
    */
    services: string[];
    address:string;
    prices:GasPrice[];
    schedules:GasStationSchedule[];
  }