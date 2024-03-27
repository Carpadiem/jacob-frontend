import { makeAutoObservable } from "mobx";


class StorePlayer {
    constructor() {
        makeAutoObservable(this)
    }

    money: number = 0
    setMoney(amount: number) { this.money = amount }
}

const obj = new StorePlayer()
export default obj