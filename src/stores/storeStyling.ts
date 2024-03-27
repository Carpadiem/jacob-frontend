import { makeAutoObservable } from "mobx"
import IDeclaredBodypartData from "@models/styling/IDeclaredBodypartData"
import IDemonstrativeBodyparts from "@models/styling/IDemonstrativeBodyparts"


const default_stylingBodyparts = {
    bumper_front_id: 1,
    bumper_rear_id: 1,
    skirts_id: 1,
    bonnet_id: 1,
    spoiler_id: 0,
    splitter_id: 0,
    diffuser_id: 1,
    canards_id: 0,
    wings_front_id: 1,
    wings_rear_id: 1,
    exhaust_id: 1,
}

class StoreStyling {
    constructor() {
        makeAutoObservable(this)
    }

    locationBodyparts: string = ''
    setLocationBodyparts(locationBodyparts: string) { this.locationBodyparts = locationBodyparts }

    selectedBodypart: IDeclaredBodypartData = null!
    setSelectedBodypart(bodypart: IDeclaredBodypartData) { this.selectedBodypart = bodypart }

    declaredBodypartsData: IDeclaredBodypartData[] = []
    setDeclaredBodypartsData(declaredBodypartsData: IDeclaredBodypartData[]) { this.declaredBodypartsData = declaredBodypartsData }

    demonstrativeBodyparts: IDemonstrativeBodyparts = default_stylingBodyparts
    setDemonstrativeBodyparts(demonstrativeBodyparts: IDemonstrativeBodyparts) { this.demonstrativeBodyparts = demonstrativeBodyparts }

    setBumperFrontId(id: number) { this.demonstrativeBodyparts.bumper_front_id = id }
    setBumperRearId(id: number) { this.demonstrativeBodyparts.bumper_rear_id = id }
    setSkirtsId(id: number) { this.demonstrativeBodyparts.skirts_id = id }
    setBonnetId(id: number) { this.demonstrativeBodyparts.bonnet_id = id }
    setSpoilerId(id: number) { this.demonstrativeBodyparts.spoiler_id = id }
    setSplitterId(id: number) { this.demonstrativeBodyparts.splitter_id = id }
    setDiffuserId(id: number) { this.demonstrativeBodyparts.diffuser_id = id }
    setCanardsId(id: number) { this.demonstrativeBodyparts.canards_id = id }
    setWingsFrontId(id: number) { this.demonstrativeBodyparts.wings_front_id = id }
    setWingsRearId(id: number) { this.demonstrativeBodyparts.wings_rear_id = id }
    setExhaustId(id: number) { this.demonstrativeBodyparts.exhaust_id = id }
}

const obj = new StoreStyling()
export default obj