export default interface IShopGlassTint {
    id: number,
    type: string,
    present_name: string,
    price: number,
    data: {
        opacity: number,
        specularIntensity: number,
        ior: number,
        metalness: number,
        roughness: number,
        clearcoat: number,
        clearcoatRoughness: number,
        color_hex: string,
    }
}