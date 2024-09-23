import { makeAutoObservable } from "mobx"
// models
import { INowDisplayedBodypartsIds } from "@models/INowDisplayedBodypartsIds"
import IBodypart from "@models/IBodypart"


class StylingStore {
    constructor() {
        makeAutoObservable(this)
    }

    nowDisplayedBodypartsIds: INowDisplayedBodypartsIds = {
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
    }
    setNowDisplayedBodypartsIds(bodyparts_ids: INowDisplayedBodypartsIds) { this.nowDisplayedBodypartsIds = bodyparts_ids }
    setBumperFrontId(id: number) { this.nowDisplayedBodypartsIds.bumper_front_id = id }
    setBumperRearId(id: number) { this.nowDisplayedBodypartsIds.bumper_rear_id = id }
    setSkirtsId(id: number) { this.nowDisplayedBodypartsIds.skirts_id = id }
    setSpoilerId(id: number) { this.nowDisplayedBodypartsIds.spoiler_id = id }
    setBonnetId(id: number) { this.nowDisplayedBodypartsIds.bonnet_id = id }
    setMirrorsId(id: number) { this.nowDisplayedBodypartsIds.mirrors_id = id }
    setHeadLightsId(id: number) { this.nowDisplayedBodypartsIds.head_lights_id = id }
    setTailLightsId(id: number) { this.nowDisplayedBodypartsIds.tail_lights_id = id }
    setWingsFrontId(id: number) { this.nowDisplayedBodypartsIds.wings_front_id = id }
    setWingsRearId(id: number) { this.nowDisplayedBodypartsIds.wings_rear_id = id }
    setExhaustId(id: number) { this.nowDisplayedBodypartsIds.exhaust_id = id }

    shopBodypartsForVehicle: IBodypart[] = []
    setShopBodypartsForVehicle(shop_bodyparts: IBodypart[]) { this.shopBodypartsForVehicle = shop_bodyparts }

    menuLevel: string = 'styling'
    setMenuLevel(level: string) { this.menuLevel = level }
}

export default new StylingStore()