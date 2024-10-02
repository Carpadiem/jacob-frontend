
import IShopGlassTint from "@models/shop/accessories/IShopGlassTint"

const stock_mat_defaults = {
    opacity: .3,
    specularIntensity: 1,
    ior: 1.45,
    metalness: .5,
    roughness: .1,
    clearcoat: 0,
    clearcoatRoughness: 0,
}
const glass_mat_defaults = {
    opacity: 1,
    specularIntensity: 0,
    ior: 1.1,
    metalness: .9,
    roughness: .8,
    clearcoat: .15,
    clearcoatRoughness: .2,
}

const shopGlassTints: IShopGlassTint[] = [
    {
        id: 1,
        type: 'glass_tint',
        for_vehicle: '*',
        name: 'Stock',
        price: 1000,
        data: {
            ...stock_mat_defaults,
            color_hex: '#090909',
        }
    },
    {
        id: 2,
        type: 'glass_tint',
        for_vehicle: '*',
        name: 'Красный',
        price: 1000,
        data: {
            ...glass_mat_defaults,
            color_hex: '#402020',
        }
    },
    {
        id: 3,
        type: 'glass_tint',
        for_vehicle: '*',
        name: 'Зеленый',
        price: 1000,
        data: {
            ...glass_mat_defaults,
            color_hex: '#203020',
        }
    },
    {
        id: 4,
        type: 'glass_tint',
        for_vehicle: '*',
        name: 'Синий',
        price: 1000,
        data: {
            ...glass_mat_defaults,
            color_hex: '#202030',
        }
    },
    {
        id: 5,
        type: 'glass_tint',
        for_vehicle: '*',
        name: 'Желтый',
        price: 1000,
        data: {
            ...glass_mat_defaults,
            color_hex: '#404020',
        }
    },
    {
        id: 6,
        type: 'glass_tint',
        for_vehicle: '*',
        name: 'Пурпурный',
        price: 1000,
        data: {
            ...glass_mat_defaults,
            color_hex: '#402040',
        }
    },
    {
        id: 7,
        type: 'glass_tint',
        for_vehicle: '*',
        name: 'Магентовый',
        price: 1000,
        data: {
            ...glass_mat_defaults,
            color_hex: '#400020',
        }
    },
]

export default shopGlassTints