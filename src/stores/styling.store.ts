import { makeAutoObservable } from "mobx"
// models
import IShopBodypartBumperFront from "@models/shop/bodyparts/IShopBumperFront"
import IShopBodypartBumperRear from "@models/shop/bodyparts/IShopBumperRear"
import IShopBodypartSkirts from "@models/shop/bodyparts/IShopSkirts"
import IShopBodypartSpoiler from "@models/shop/bodyparts/IShopSpoiler"
import IShopBodypartBonnet from "@models/shop/bodyparts/IShopBonnet"
import IShopBodypartMirrors from "@models/shop/bodyparts/IShopMirrors"
import IShopBodypartHeadLights from "@models/shop/bodyparts/IShopHeadLights"
import IShopBodypartTailLights from "@models/shop/bodyparts/IShopTailLights"
import IShopBodypartWingsFront from "@models/shop/bodyparts/IShopWingsFront"
import IShopBodypartWingsRear from "@models/shop/bodyparts/IShopWingsRear"
import IShopBodypartExhaust from "@models/shop/bodyparts/IShopExhaust"
import IShopPaintCoating from "@models/shop/graphics/IShopPaintCoating"
import IShopPaintColor from "@models/shop/graphics/IShopPaintColor"
import IShopGlassTint from "@models/shop/accessories/IShopGlassTint"
import IShopWheelsAdjust from "@models/shop/wheels/IShopWheelsAdjust"
// shops
import shopPaintCoating from "src/shop/graphics/paint_coating"
import shopPaintColor from "src/shop/graphics/paint_color"
import shopGlassTint from "src/shop/accessories/glass_tint"
import IStyling from "@models/IStyling"


class StylingStore {
    constructor() {
        makeAutoObservable(this)
    }

    // bodyparts

    styling: IStyling = {
        bumper_front_id: 1,
        bumper_rear_id: 1,
        skirts_id: 1,
        spoiler_id: 1,
        bonnet_id: 1,
        mirrors_id: 1,
        head_lights_id: 1,
        tail_lights_id: 1,
        wings_front_id: 1,
        wings_rear_id: 1,
        exhaust_id: 1,
        paint_coating_id: 1,
        paint_color_id: 15,
        glass_tint_id: 1,
        wheels_id: 1,
        wheels_offset: 0,
        wheels_alignment: 0,
    }
    setStyling(styling: IStyling) { this.styling = styling }
    setStylingItemId(shop_item_type: string, id: number) { this.styling[`${shop_item_type}_id`] = id }
    setStylingWheelsOffset(value: number) { this.styling.wheels_offset = value }
    setStylingWheelsAlignment(value: number) { this.styling.wheels_alignment = value }

    // styling ui-menu navigation
    menuLevel: string = 'styling'
    setMenuLevel(level: string) { this.menuLevel = level }
}

export default new StylingStore()