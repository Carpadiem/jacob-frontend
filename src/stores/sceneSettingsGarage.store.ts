import { makeAutoObservable } from "mobx"

class SceneSettingsGarageStore {
    constructor() {
        makeAutoObservable(this)
    }

    isAudioPlay: boolean = false
    isOpen: boolean = false
    setIsAudioPlay(state: boolean) { this.isAudioPlay = state }
    setIsOpen(state: boolean) { this.isOpen = state }

}

export default new SceneSettingsGarageStore()