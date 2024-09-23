export default interface IVehicle {
    brand: string
    model: string
    price: number
    is_selected: boolean
    bodyparts_ids: {
      bumper_front_id: number
      bumper_rear_id: number
      skirts_id: number
      spoiler_id: number
      bonnet_id: number
      mirrors_id: number
      head_lights_id: number
      tail_lights_id: number
      wings_front_id: number
      wings_rear_id: number
      exhaust_id: number
    }
    garage_slot: number
  }