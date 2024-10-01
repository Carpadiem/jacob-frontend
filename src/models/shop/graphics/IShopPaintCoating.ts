import IShopItem from "../IShopItem"


export default interface IShopPaintCoating extends IShopItem {
    paint_coating_name: string
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