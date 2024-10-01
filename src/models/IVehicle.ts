import IStyling from "./IStyling"

export default interface IVehicle {
    id: number
    brand: string
    model: string
    price: number
    is_selected: boolean
    
    styling: IStyling
    
    garage_slot: number
  }