export interface IPlayerCar {
    id: number
    brand: string
    model_name: string
    price: number
    autosalon_preview_image_url: string
    description: string
    specifications: {
        maxspeed: number
        acceleration: number
        control: number
    }
}