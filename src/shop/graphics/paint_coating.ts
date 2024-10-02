
import IShopPaintCoating from "@models/shop/graphics/IShopPaintCoating"

const shopPaintCoating: IShopPaintCoating[] = [
    {
        id: 1,
        type: 'paint_coating',
        paint_coating_name: 'glossy',
        for_vehicle: '*',
        name: 'Глянцевый',
        price: 1000,
        data: {
            roughness: 0.6,
            metalness: 0.3,
            clearcoat: 0.2,
            clearcoatRoughness: 0,
            sheen: 0,
            sheenRoughness: 0,
            sheenColor: 'black',
        },
    },
    {
        id: 2,
        type: 'paint_coating',
        paint_coating_name: 'metallic',
        for_vehicle: '*',
        name: 'Металлик',
        price: 1000,
        data: {
            roughness: 0.45,
            metalness: 0.75,
            clearcoat: 0.075,
            clearcoatRoughness: 0.1,
            sheen: 0,
            sheenRoughness: 0,
            sheenColor: 'black',
        },
    },
    {
        id: 3,
        type: 'paint_coating',
        paint_coating_name: 'mate',
        for_vehicle: '*',
        name: 'Матовый',
        price: 1000,
        data: {
            roughness: 0.6,
            metalness: 0.2,
            clearcoat: 0.2,
            clearcoatRoughness: 0.3,
            sheen: 0,
            sheenRoughness: 0,
            sheenColor: 'black',
        },
    },
    {
        id: 4,
        type: 'paint_coating',
        paint_coating_name: 'chameleon',
        for_vehicle: '*',
        name: 'Хамелеон',
        price: 1000,
        data: {
            roughness: 0.4,
            metalness: 0.9,
            clearcoat: 0.05,
            clearcoatRoughness: 0.1,
            sheen: 1,
            sheenRoughness: .1,
            sheenColor: 'purple',
        },
    },
]

export default shopPaintCoating