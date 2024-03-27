import { makeAutoObservable } from "mobx"


class StoreGarage {
    constructor() {
        makeAutoObservable(this)
    }

    slot: number = 1
    setSlot(slot: number) { this.slot = slot }
}

const obj = new StoreGarage()
export default obj