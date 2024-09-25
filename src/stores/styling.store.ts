import { makeAutoObservable } from "mobx"
// models
import { INowDisplayedBodypartsIds } from "@models/INowDisplayedBodypartsIds"
import { INowDisplayedGraphics } from "@models/INowDisplayedGraphics"
import IBodypart from "@models/IBodypart"
import IGraphic from "@models/IGraphic"


class StylingStore {
    constructor() {
        makeAutoObservable(this)
    }

    // BODYPARTS
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

    // GRAPHICS
    nowDisplayedGraphics: INowDisplayedGraphics = {
        paint_coating: 'glossy',
        paint_color: '#363636',
    }
    setNowDisplayedGraphics(graphics: INowDisplayedGraphics) { this.nowDisplayedGraphics = graphics }
    setGraphicsPaintCoating(coating: string) { this.nowDisplayedGraphics.paint_coating = coating } // coating: string >>> 'mate' | 'glossy' | 'metallic' | 'chameleon'
    setGraphicsPaintColor(colorHex: string) { this.nowDisplayedGraphics.paint_color = colorHex }

    shopGraphicsForVehicle: IGraphic[] = [
        { id: 1, type: 'paint_color', data: '#FBCEB1', name: 'Абрикосовый', price: 1000, },
        { id: 2, type: 'paint_color', data: '#B5B8B1', name: 'Агатовый серый', price: 1000, },
        { id: 3, type: 'paint_color', data: '#7FFFD4', name: 'Аквамариновый', price: 1000, },
        { id: 4, type: 'paint_color', data: '#E32636', name: 'Ализариновый красный', price: 1000, },
        { id: 5, type: 'paint_color', data: '#AB274F', name: 'Амарантово-пурпурный', price: 1000, },
        { id: 6, type: 'paint_color', data: '#9966CC', name: 'Аметистовый', price: 1000, },
        { id: 7, type: 'paint_color', data: '#CD9575', name: 'Античная латунь', price: 1000, },
        { id: 8, type: 'paint_color', data: '#464451', name: 'Антрацитовый', price: 1000, },
        { id: 9, type: 'paint_color', data: '#44944A', name: 'Арлекин', price: 1000, },
        { id: 10, type: 'paint_color', data: '#6A5ACD', name: 'Аспидно-синий', price: 1000, },
        { id: 11, type: 'paint_color', data: '#003153', name: 'Берлинская лазурь', price: 1000, },
        { id: 12, type: 'paint_color', data: '#A5260A', name: 'Бисмарк-фуриозо', price: 1000, },
        { id: 13, type: 'paint_color', data: '#6495ED', name: 'Васильковый', price: 1000, },
        { id: 14, type: 'paint_color', data: '#FFCF48', name: 'Восход солнца', price: 1000, },
        { id: 15, type: 'paint_color', data: '#DCDCDC', name: 'Гейнсборо', price: 1000, },
        { id: 16, type: 'paint_color', data: '#30BA8F', name: 'Горный луг', price: 1000, },
        { id: 17, type: 'paint_color', data: '#F34723', name: 'Гранатовый', price: 1000, },
        { id: 18, type: 'paint_color', data: '#1C1C1C', name: 'Графитно-черный', price: 1000, },
        { id: 19, type: 'paint_color', data: '#474A51', name: 'Графитовый серый', price: 1000, },
        { id: 20, type: 'paint_color', data: '#2F353B', name: 'Гранитный', price: 1000, },
        { id: 21, type: 'paint_color', data: '#D1E231', name: 'Грушево-зеленый', price: 1000, },
        { id: 22, type: 'paint_color', data: '#00693E', name: 'Дартмутский зеленый', price: 1000, },
        { id: 23, type: 'paint_color', data: '#CA3767', name: 'Джазовый джем', price: 1000, },
        { id: 24, type: 'paint_color', data: '#1560BD', name: 'Джинсовый синий', price: 1000, },
        { id: 25, type: 'paint_color', data: '#009B77', name: 'Изумруд', price: 1000, },
        { id: 26, type: 'paint_color', data: '#4B0082', name: 'Индиго', price: 1000, },
        { id: 27, type: 'paint_color', data: '#4C5866', name: 'Маренго', price: 1000, },
        { id: 28, type: 'paint_color', data: '#AD655F', name: 'Марсала', price: 1000, },
        { id: 29, type: 'paint_color', data: '#B87333', name: 'Медный', price: 1000, },
        { id: 30, type: 'paint_color', data: '#808000', name: 'Оливковый', price: 1000, },
        { id: 31, type: 'paint_color', data: '#121910', name: 'Оливково-черный', price: 1000, },
        { id: 32, type: 'paint_color', data: '#015D52', name: 'Опаловый зеленый', price: 1000, },
        { id: 33, type: 'paint_color', data: '#FD5E53', name: 'Оранжевая заря', price: 1000, },
        { id: 34, type: 'paint_color', data: '#A65E2E', name: 'Оранжево-коричневый', price: 1000, },
        { id: 1, type: 'paint_coating', data: 'glossy', name: 'Глянцевый', price: 3000, },
        { id: 2, type: 'paint_coating', data: 'metallic', name: 'Металлик', price: 3000, },
        { id: 3, type: 'paint_coating', data: 'mate', name: 'Матовый', price: 3000, },
        { id: 4, type: 'paint_coating', data: 'chameleon', name: 'Хамелеон', price: 3000, },
    ]
    // setShopGraphicsForVehicle(shop_graphics: IGraphic[]) { this.shopGraphicsForVehicle = shop_graphics }

    menuLevel: string = 'styling'
    setMenuLevel(level: string) { this.menuLevel = level }
}

export default new StylingStore()