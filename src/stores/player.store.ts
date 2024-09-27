import { makeAutoObservable } from "mobx"

class StylingStore {
    constructor() {
        makeAutoObservable(this)
    }

    user_id: number = 0
    player_id: number = 0
    nickname: string = ''
    money: number = 0
    experience: number = 0

    setUserId(user_id: number) { this.user_id = user_id }
    setPlayerId(player_id: number) { this.player_id = player_id }
    setNickname(nickname: string) { this.nickname = nickname }
    setMoney(amount: number) { this.money = amount }
    setExperience(amount: number) { this.experience = amount }
}

export default new StylingStore()