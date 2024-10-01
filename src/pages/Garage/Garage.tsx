import React from 'react'
import styles from './Garage.module.css'
// images
import styling_card_bg from './images/styling_card_bg.jpg'
import ArrowUp from './images/arrow_up.svg?react'
// components
import { PlayerData } from '@components/PlayerData'
import { ModalWindow } from '@components/ModalWindow'

import { CarItem } from './components/CarItem'
import { StylingNavList } from './components/styling/StylingNavList'
import { StylingNavItem } from './components/styling/StylingNavItem'
import { ShopItemButton } from './components/styling/ShopItemButton'
import { StylingWheelsRange } from './components/styling/StylingWheelsRange'
import { StylingPurchasing } from './components/styling/StylingPurchasing'

import { Canvas } from '@react-three/fiber'
import { CameraControls } from '@react-three/drei'
import { EnvExotic } from '@exotic/EnvExotic'
import { EffectsExotic } from '@exotic/EffectsExotic'
import { CameraMovementExotic } from '@exotic/CameraMovementExotic'
// 3d
import * as THREE from 'three'
import SceneGarage from '@3d/scenes/Garage'
import BMWM5F90 from '@3d/cars/BMWM5F90'
import DodgeCharger from '@3d/cars/DodgeCharger'
import DodgeDemon from '@3d/cars/DodgeDemon'
import MazdaRX7 from '@3d/cars/MazdaRX7'
import MercedesBenzAMGGT from '@3d/cars/MercedesBenzAMGGT'
import MitsubishiEvo9 from '@3d/cars/MitsubishiEvo9'
import NissanSkylineGTRR34 from '@3d/cars/NissanSkylineGTRR34'
import Porsche911TurboS from '@3d/cars/Porsche911TurboS'
import ToyotaSupraMK4 from '@3d/cars/ToyotaSupraMK4'
import VolkswagenGolf from '@3d/cars/VolkswagenGolf'
// models
import IVehicle from '@models/IVehicle'
// hooks
import usePlayerVehicles from 'src/hooks/usePlayerVehicles'
// stores
import { observer } from 'mobx-react-lite'
import stylingStore from '@stores/styling.store'
import playerStore from '@stores/player.store'
// 3d and data
import axios from 'axios'

import IShopBumperFront from '@models/shop/bodyparts/IShopBumperFront'
import IShopExhaust from '@models/shop/bodyparts/IShopExhaust'
import IShopWingsRear from '@models/shop/bodyparts/IShopWingsRear'
import IShopBumperRear from '@models/shop/bodyparts/IShopBumperRear'
import IShopSkirts from '@models/shop/bodyparts/IShopSkirts'
import IShopSpoiler from '@models/shop/bodyparts/IShopSpoiler'
import IShopBonnet from '@models/shop/bodyparts/IShopBonnet'
import IShopMirrors from '@models/shop/bodyparts/IShopMirrors'
import IShopHeadLights from '@models/shop/bodyparts/IShopHeadLights'
import IShopTailLights from '@models/shop/bodyparts/IShopTailLights'
import IShopWingsFront from '@models/shop/bodyparts/IShopWingsFront'
import IShopPaintCoating from '@models/shop/graphics/IShopPaintCoating'
import IShopPaintColor from '@models/shop/graphics/IShopPaintColor'
import IShopGlassTint from '@models/shop/accessories/IShopGlassTint'
// shops
import shopPaintCoating from 'src/shop/graphics/paint_coating'
import shopPaintColor from 'src/shop/graphics/paint_color'
import shopGlassTints from 'src/shop/accessories/glass_tint'
import shopBumperFront from 'src/shop/bodyparts/bumper_front'
import shopSkirts from 'src/shop/bodyparts/skirts'
import shopBumperRear from 'src/shop/bodyparts/bumper_rear'
import shopSpoiler from 'src/shop/bodyparts/spoiler'
import shopBonnet from 'src/shop/bodyparts/bonnet'
import shopMirrors from 'src/shop/bodyparts/mirrors'
import shopHeadLights from 'src/shop/bodyparts/head_lights'
import shopTailLight from 'src/shop/bodyparts/tail_lights'
import shopWingsFront from 'src/shop/bodyparts/wings_front'
import shopExhaust from 'src/shop/bodyparts/exhaust'
import shopWingsRear from 'src/shop/bodyparts/wings_rear'
import IShopItem from '@models/shop/IShopItem'
import IShopWheelsAdjust from '@models/shop/wheels/IShopWheelsAdjust'
import { SceneSettings } from '@components/SceneSettings'


const shops: {
    bumper_front: IShopBumperFront[],
    bumper_rear: IShopBumperRear[],
    skirts: IShopSkirts[],
    spoiler: IShopSpoiler[],
    bonnet: IShopBonnet[],
    mirrors: IShopMirrors[],
    head_lights: IShopHeadLights[],
    tail_lights: IShopTailLights[],
    wings_front: IShopWingsFront[],
    wings_rear: IShopWingsRear[],
    exhaust: IShopExhaust[],
    paint_coating: IShopPaintCoating[],
    paint_color: IShopPaintColor[],
    glass_tint: IShopGlassTint[],
} = {
    bumper_front: shopBumperFront,
    bumper_rear: shopBumperRear,
    skirts: shopSkirts,
    spoiler: shopSpoiler,
    bonnet: shopBonnet,
    mirrors: shopMirrors,
    head_lights: shopHeadLights,
    tail_lights: shopTailLight,
    wings_front: shopWingsFront,
    wings_rear: shopWingsRear,
    exhaust: shopExhaust,
    paint_coating: shopPaintCoating,
    paint_color: shopPaintColor,
    glass_tint: shopGlassTints,
}


const Garage = () => {

    // funcs
    const shop_item_type_translate = (type: string) => {
        if (type === 'bumper_front') return 'Передний бампер'
        else if (type === 'bumper_rear') return 'Задний бампер'
        else if (type === 'skirts') return 'Боковые юбки'
        else if (type === 'spoiler') return 'Спойлер'
        else if (type === 'bonnet') return 'Капот'
        else if (type === 'mirrors') return 'Боковые зеркала'
        else if (type === 'head_lights') return 'Передние фары'
        else if (type === 'tail_lights') return 'Задние огни'
        else if (type === 'wings_front') return 'Передние крылья'
        else if (type === 'wings_rear') return 'Задние крылья'
        else if (type === 'exhaust') return 'Выхлопная труба'
        else if (type === 'paint_coating') return 'Покрытие краски'
        else if (type === 'paint_color') return 'Цвет кузова'
        else if (type === 'glass_tint') return 'Тонировка'
        return ''
    }

    // hooks
    const playerVehicles = usePlayerVehicles(230990098)

    // states
    const [displayedVehicle, setDisplayedVehicle] = React.useState<IVehicle>(null!)
    const [isVehiclesPanelOpen, setIsVehiclesPanelOpen] = React.useState<boolean>(false)
    const [isStylingOpen, setIsStylingOpen] = React.useState<boolean>(false)
    const [purchaseData, setPurchaseData] = React.useState({
        title: '',
        subtitle: '',
        data: {
            type: '',
            id: 0,
            price: 0,
        }
    })
    const [purchaseWheelsAdjustData, setPurchaseWheelsAdjustData] = React.useState({
        title: 'Регулировка колес',
        subtitle: 'Изменение параметров',
        data: {
            wheels_offset: 0,
            wheels_alignment: 0,
            price: 5000,
        }
    })

    // effects
    React.useEffect(()=>{
        setDisplayedVehicle(playerVehicles[0])
    }, [playerVehicles])

    React.useEffect(()=>{
        stylingStore.setStyling(displayedVehicle?.styling)
    }, [displayedVehicle])

    React.useEffect(()=>{
        const level = stylingStore.menuLevel
        const split_level = level.split('.')
        const shop_item_type = split_level[2]

        if (split_level.length >= 3 && !level.includes('wheels.adjust')) {
            const shop_item = shops[shop_item_type].filter(shop_item=>shop_item.id === stylingStore.styling[`${shop_item_type}_id`])[0]
            setPurchaseData({
                title: shop_item.name,
                subtitle: shop_item_type_translate(shop_item_type),
                data: {
                    type: shop_item.type,
                    id: shop_item.id,
                    price: shop_item.price,
                }
            })
        }

        if (level.includes('wheels.adjust')) {
            setPurchaseWheelsAdjustData({
                title: purchaseWheelsAdjustData.title,
                subtitle: purchaseWheelsAdjustData.subtitle,
                data: {
                    wheels_offset: stylingStore.styling.wheels_offset,
                    wheels_alignment: stylingStore.styling.wheels_alignment,
                    price: purchaseWheelsAdjustData.data.price,
                }
            })
        }

        stylingStore.setStyling(displayedVehicle?.styling)

    }, [stylingStore.menuLevel])

    // handlers
    const vehiclesPanelOpenHandler = () => {
        setIsVehiclesPanelOpen(!isVehiclesPanelOpen)
    }
    const carItemClickHandler = (vehicle: IVehicle) => {
        setDisplayedVehicle(vehicle)
        setIsVehiclesPanelOpen(false)
    }

    // shop item buttons handlers
    const shopItemClickHandler = (shop_item: IShopItem) => {
        stylingStore.setStylingItemId(shop_item.type, shop_item.id)
        // set purchase data
        const purchaseData = {
            title: shop_item.name,
            subtitle: shop_item_type_translate(shop_item.type),
            data: {
                type: shop_item.type,
                id: shop_item.id,
                price: shop_item.price
            }
        }
        setPurchaseData(purchaseData)
    }
    const wheelsRangeOffsetChangeHandler = (rangeValue: number) => {
        stylingStore.setStylingWheelsOffset(rangeValue)
    }
    const wheelsRangeAlignmentChangeHandler = (rangeValue: number) => {
        stylingStore.setStylingWheelsAlignment(rangeValue)
    }
    const navListButtonClickHandler = (to: string) => {
        stylingStore.setMenuLevel(to)
    }
    const navListBack = () => {
        const level = stylingStore.menuLevel.split('.')
        level.pop()
        stylingStore.setMenuLevel(level.join('.'))
    }
    const purchaseConfirmClickHandler = async () => {
        
        let url;
        let data;

        if (stylingStore.menuLevel.includes('wheels.adjust')) {
            url = 'http://localhost:3001/api/vehicles/purchaseStylingWheelsAdjust'
            data = {
                user_id: 230990098,
                vehicle_slot: displayedVehicle?.garage_slot,
                data: {
                    wheels_offset: stylingStore.styling.wheels_offset,
                    wheels_alignment: stylingStore.styling.wheels_alignment,
                    price: purchaseWheelsAdjustData.data.price
                }
            }
        }
        else {
            url = 'http://localhost:3001/api/vehicles/purchaseStylingShopItem'
            data = {
                user_id: 230990098,
                vehicle_slot: displayedVehicle?.garage_slot,
                data: {
                    type: purchaseData.data.type,
                    id: purchaseData.data.id,
                    price: purchaseData.data.price
                }
            }
        }
        
        const response = (await axios.post(url, data)).data

        if (response.status === 'ok') {
            const url = 'http://localhost:3001/api/vehicles/playerVehicles/230990098'
            const playerVehicles: IVehicle[] = (await axios.get(url)).data
            setDisplayedVehicle(playerVehicles.filter(vehicle=>vehicle.garage_slot===displayedVehicle?.garage_slot)[0])
            playerStore.setMoney(response.updated_player_money)
            navListBack()
        }
        else if (response.status === 'error') {
            if (response.error === 'NotEnoughPlayerMoney') {
                stylingStore.setStyling(displayedVehicle?.styling)

                if (stylingStore.menuLevel.includes('wheels.adjust')) {
                    const previousWheelsAdjust = {
                        title: 'Регулировка колес',
                        subtitle: 'Изменение параметров',
                        data: {
                            wheels_offset: stylingStore.styling.wheels_offset,
                            wheels_alignment: stylingStore.styling.wheels_alignment,
                            price: 5000,
                        }
                    }
                    setPurchaseWheelsAdjustData(previousWheelsAdjust)
                }
                else {
                    const previousShopItem: IShopItem = shops[`${purchaseData.data.type}`]
                    .filter((shop_item: IShopItem)=>shop_item.id === displayedVehicle?.styling[`${purchaseData.data.type}_id`])[0]                
                    setPurchaseData({
                        title: previousShopItem.name,
                        subtitle: 'Передний бампер',
                        data: {
                            type: previousShopItem.type,
                            id: previousShopItem.id,
                            price: previousShopItem.price,
                        }
                    })
                }
                navListBack()
            }
        }
    }

    return (
        <div className={styles.page}>
            <Canvas
                className={styles.canvas}
                shadows
                onCreated={(state) => {
                    state.gl.shadowMap.enabled = true
                    state.gl.shadowMap.type = THREE.PCFSoftShadowMap
                    state.gl.outputColorSpace = THREE.SRGBColorSpace
                }}
                >
                <EnvExotic intensity={1} path='3d/hdri/metro_vijzelgracht_1k.hdr' />
                <EffectsExotic />
                {/* <CameraMovementExotic /> */}
                <SceneGarage />
                <CameraControls />

                { displayedVehicle?.brand.toLowerCase() === 'bmw' && displayedVehicle?.model.toLowerCase() === 'm5 f90' && <BMWM5F90 /> }
                { displayedVehicle?.brand.toLowerCase() === 'dodge' && displayedVehicle?.model.toLowerCase() === 'charger' && <DodgeCharger /> }
                { displayedVehicle?.brand.toLowerCase() === 'dodge' && displayedVehicle?.model.toLowerCase() === 'demon' && <DodgeDemon /> }
                { displayedVehicle?.brand.toLowerCase() === 'mazda' && displayedVehicle?.model.toLowerCase() === 'rx-7' && <MazdaRX7 /> }
                { displayedVehicle?.brand.toLowerCase() === 'mercedes-benz' && displayedVehicle?.model.toLowerCase() === 'amg gt' && <MercedesBenzAMGGT /> }
                { displayedVehicle?.brand.toLowerCase() === 'mitsubishi' && displayedVehicle?.model.toLowerCase() === 'evo 9' && <MitsubishiEvo9 /> }
                { displayedVehicle?.brand.toLowerCase() === 'nissan' && displayedVehicle?.model.toLowerCase() === 'skyline gt-r r34' && <NissanSkylineGTRR34 /> }
                { displayedVehicle?.brand.toLowerCase() === 'porsche' && displayedVehicle?.model.toLowerCase() === '911 turbo s' && <Porsche911TurboS /> }
                { displayedVehicle?.brand.toLowerCase() === 'toyota' && displayedVehicle?.model.toLowerCase() === 'supra mk4' && <ToyotaSupraMK4 /> }
                { displayedVehicle?.brand.toLowerCase() === 'volkswagen' && displayedVehicle?.model.toLowerCase() === 'golf' && <VolkswagenGolf /> }
            </Canvas>

            <div className={styles.top_right_screen}>
                <PlayerData />
                <SceneSettings />
            </div>

            {!isStylingOpen &&
            <div className={styles.garage_container}>
                <div className={styles.my_cars_container}>
                    
                    <CarItem title={displayedVehicle?.brand} subtitle={displayedVehicle?.model} />

                    <div className={styles.open_bar} onClick={vehiclesPanelOpenHandler}>
                        <ArrowUp
                            fill='white'
                            style={{
                                transform: isVehiclesPanelOpen ? 'scaleY(1)' : 'scaleY(-1)',
                                transition: 'all .3s ease'
                            } as React.CSSProperties}
                        />
                    </div>
                    <div className={styles.car_items} style={{height: isVehiclesPanelOpen ? '100%' : '0%'}}>
                        
                        { playerVehicles.map((vehicle, index)=>{
                            if (displayedVehicle !== vehicle)
                                return <CarItem key={index} title={vehicle.brand} subtitle={vehicle.model} onClick={()=>carItemClickHandler(vehicle)} />
                        })}

                        <div className={styles.buy_frame}>
                            <div className={styles.left_text_container}>
                                <span>+</span>
                                <p>Купить место</p>
                            </div>
                            <div className={styles.right_text_container}>
                                <p>500,000</p>
                                <span>$</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.styling_card_container} style={{ backgroundImage: 'url('+styling_card_bg+')' } as React.CSSProperties} onClick={()=>setIsStylingOpen(prev=>!prev)}>
                    <h1 className={styles.title_styling_card}>Стайлинг</h1>
                </div>
            </div>
            }

            {/* Styling  */}
            {isStylingOpen &&
            <div className={styles.styling_container}>
                
                <CarItem title={displayedVehicle.brand} subtitle={displayedVehicle.model} />
                
                {
                    stylingStore.menuLevel === 'styling' &&
                    <StylingNavList title='Стайлинг' subtitle='Выберите магазин' buttonText='Назад' onButtonClick={()=>{stylingStore.setMenuLevel('styling'); setIsStylingOpen(!isStylingOpen)}}>
                        <StylingNavItem text='Кузовное ателье' onClick={()=>stylingStore.setMenuLevel('styling.bodyparts')} />
                        <StylingNavItem text='Покрасочный цех' onClick={()=>stylingStore.setMenuLevel('styling.graphics')} />
                        <StylingNavItem text='Аксессуарная лавка' onClick={()=>stylingStore.setMenuLevel('styling.accessories')} />
                        <StylingNavItem text='Колесная станция' onClick={()=>stylingStore.setMenuLevel('styling.wheels')} />
                    </StylingNavList>
                }
                {/* BODYPARTS */}
                {
                    stylingStore.menuLevel === 'styling.bodyparts' &&
                    <StylingNavList title='Кузовное ателье' subtitle='Выберите тип деталей' buttonText='Назад' onButtonClick={navListBack}>
                        <StylingNavItem text='Передние бамперы' onClick={()=>stylingStore.setMenuLevel('styling.bodyparts.bumper_front')} />
                        <StylingNavItem text='Задние бамперы' onClick={()=>stylingStore.setMenuLevel('styling.bodyparts.bumper_rear')} />
                        <StylingNavItem text='Боковые юбки' onClick={()=>stylingStore.setMenuLevel('styling.bodyparts.skirts')} />
                        <StylingNavItem text='Спойлеры' onClick={()=>stylingStore.setMenuLevel('styling.bodyparts.spoiler')} />
                        <StylingNavItem text='Капоты' onClick={()=>stylingStore.setMenuLevel('styling.bodyparts.bonnet')} />
                        <StylingNavItem text='Боковые зеркала' onClick={()=>stylingStore.setMenuLevel('styling.bodyparts.mirrors')} />
                        <StylingNavItem text='Передние фары' onClick={()=>stylingStore.setMenuLevel('styling.bodyparts.head_lights')} />
                        <StylingNavItem text='Задние огни' onClick={()=>stylingStore.setMenuLevel('styling.bodyparts.tail_lights')} />
                        <StylingNavItem text='Передние крылья' onClick={()=>stylingStore.setMenuLevel('styling.bodyparts.wings_front')} />
                        <StylingNavItem text='Задние крылья' onClick={()=>stylingStore.setMenuLevel('styling.bodyparts.wings_rear')} />
                        <StylingNavItem text='Выхлопные трубы' onClick={()=>stylingStore.setMenuLevel('styling.bodyparts.exhaust')} />
                    </StylingNavList>
                }
                {
                    stylingStore.menuLevel === 'styling.graphics' &&
                    <StylingNavList title='Покрасочный цех' subtitle='Выберите тип работ' buttonText='Назад' onButtonClick={navListBack}>
                        <StylingNavItem text='Цвет кузова' onClick={()=>stylingStore.setMenuLevel('styling.graphics.paint_color')} />
                        <StylingNavItem text='Покрытие краски' onClick={()=>stylingStore.setMenuLevel('styling.graphics.paint_coating')} />
                    </StylingNavList>
                }
                {
                    stylingStore.menuLevel === 'styling.accessories' &&
                    <StylingNavList title='Аксессуарная лавка' subtitle='Выберите тип аксессуара' buttonText='Назад' onButtonClick={navListBack}>
                        <StylingNavItem text='Тонировка' onClick={()=>stylingStore.setMenuLevel('styling.accessories.glass_tint')} />
                    </StylingNavList>
                }
                {
                    stylingStore.menuLevel === 'styling.wheels' &&
                    <StylingNavList title='Колесная станция' subtitle='Выберите тип работ' buttonText='Назад' onButtonClick={navListBack}>
                        <StylingNavItem text='Регулировка колес' onClick={()=>stylingStore.setMenuLevel('styling.wheels.adjust')} />
                    </StylingNavList>
                }
                {
                    stylingStore.menuLevel.split('.').length >= 3 &&
                    stylingStore.menuLevel.split('.')[1] !== 'wheels' &&
                    <>
                    <StylingNavList
                        title='Стайлинг'
                        subtitle={shop_item_type_translate(stylingStore.menuLevel.split('.')[2])}
                        buttonText='Назад'
                        onButtonClick={navListBack}>
                        {
                            shops[stylingStore.menuLevel.split('.')[2]]
                            .map((shopItem: IShopItem) =>
                                <ShopItemButton
                                    key={shopItem.id}
                                    text={shopItem.name}
                                    price={shopItem.price}
                                    onClick={()=>shopItemClickHandler(shopItem)}
                                />
                            )
                        }
                    </StylingNavList>
                    <StylingPurchasing
                        title={purchaseData.title}
                        subtitle={purchaseData.subtitle}
                        data={purchaseData.data}
                        onClickPurchase={purchaseConfirmClickHandler}
                    />
                    </>
                }
                {
                    stylingStore.menuLevel.includes('wheels.adjust') &&
                    <>
                    <StylingNavList
                        title='Колесная станция'
                        subtitle='sub'
                        buttonText='Назад'
                        onButtonClick={navListBack}>
                        <StylingWheelsRange title='Вылет колес' from={0} to={1} step={.01} value={stylingStore.styling.wheels_offset} onChange={(rangeValue: number)=>wheelsRangeOffsetChangeHandler(rangeValue)} />
                        <StylingWheelsRange title='Развал колес' from={-1} to={1} step={.01} value={stylingStore.styling.wheels_alignment} onChange={(rangeValue: number)=>wheelsRangeAlignmentChangeHandler(rangeValue)} />
                    </StylingNavList>
                    <StylingPurchasing
                        title={purchaseWheelsAdjustData.title}
                        subtitle={purchaseWheelsAdjustData.subtitle}
                        data={purchaseWheelsAdjustData.data}
                        onClickPurchase={purchaseConfirmClickHandler}
                    />
                    </>
                }
            </div>
            }
        </div>
    )
}

export default observer(Garage)