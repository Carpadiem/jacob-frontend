export default interface IShopPaintCoating {
    id: number
    type: string
    paint_coating_name: string
    present_name: string
    price: number
    data: {
        roughness: number
        metalness: number
        clearcoat: number
        clearcoatRoughness: number
        sheen: number
        sheenRoughness: number
        sheenColor: string
    }
}