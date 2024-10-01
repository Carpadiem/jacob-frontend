import IShopItem from "../IShopItem";

export default interface IShopGlassTint extends IShopItem {
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