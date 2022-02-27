export default interface FuelStationPriceOrder{
    fuel: string,
    stations: {
      idStation: string,
      address: string,
      price: number
    }[]
}