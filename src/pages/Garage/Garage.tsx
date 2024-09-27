import React from 'react'
import styles from './Garage.module.css'
// images
import bg from './images/bg.jpg'
import styling_card_bg from './images/styling_card_bg.jpg'
import ArrowUp from './images/arrow_up.svg?react'
import ArrowLeft from './images/arrow_left.svg?react'
import SvgDoor from './images/door.svg?react'
import SvgBrush from './images/brush.svg?react'
import SvgMusic from './images/music.svg?react'
import SvgWheel from './images/wheel.svg?react'
// components
import { PlayerData } from '@components/PlayerMoney'

import { ModalWindow } from '@components/ModalWindow'
import { ModalButton } from '@components/ModalButton'

import { CarItem } from './components/CarItem'
import { StylingNavList } from './components/styling/StylingNavList'
import { StylingNavItem } from './components/styling/StylingNavItem'
import { StylingBodypartButton } from './components/styling/StylingBodypartButton'
import { StylingGraphicButton } from './components/styling/StylingGraphicButton'
import { StylingPurchasing } from './components/styling/StylingPurchasing'

import { Canvas } from '@react-three/fiber'
import { Perf } from 'r3f-perf'
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
import { OrbitControls } from '@react-three/drei'
// models
import IVehicle from '@models/IVehicle'
// hooks
import useGameVehicles from 'src/hooks/useGameVehicles'
import usePlayerVehicles from 'src/hooks/usePlayerVehicles'
// stores
import { observer } from 'mobx-react-lite'
import stylingStore from '@stores/styling.store'
import playerStore from '@stores/player.store'
// 3d and data
import axios from 'axios'
import IShopBodypart from '@models/IShopBodypart'
import IShopPaintCoating from '@models/IShopPaintCoating'
import IShopPaintColor from '@models/IShopPaintColor'

import shop_bodyparts from 'src/shop/styling/bodyparts'
import shop_coatings from 'src/shop/styling/graphic_coatings'
import shop_colors from 'src/shop/styling/graphic_colors'



const Garage = () => {

    // vars

    // functions
    const translateBodypartType = (word: string) => {
        if (word === 'bumper_front') return 'Передний бампер'
        else if (word === 'bumper_rear') return 'Задний бампер'
        else if (word === 'skirts') return 'Боковые юбки'
        else if (word === 'spoiler') return 'Спойлер'
        else if (word === 'bonnet') return 'Капот'
        else if (word === 'mirrors') return 'Боковые зеркала'
        else if (word === 'head_lights') return 'Передние фары'
        else if (word === 'tail_lights') return 'Задние огни'
        else if (word === 'wings_front') return 'Передние крылья'
        else if (word === 'wings_rear') return 'Задние крылья'
        else if (word === 'exhaust') return 'Выхлопная труба'
        return ''
    }
    const translateGraphicType = (word: string) => {
        if (word === 'paint_color') return 'Цвет кузова'
        else if (word === 'paint_coating') return 'Покрытие краски'
        return ''
    }

    // hooks
    const playerVehicles = usePlayerVehicles(230990098)

    // states
    const [displayedVehicle, setDisplayedVehicle] = React.useState<IVehicle>(null!)
    const [isVehiclesPanelOpen, setIsVehiclesPanelOpen] = React.useState<boolean>(false)
    const [isStylingOpen, setIsStylingOpen] = React.useState<boolean>(false)
    const [selectedBodypartData, setSelectedBodypartData] = React.useState<IShopBodypart>(null!)
    const [selectedPaintCoatingData, setSelectedPaintCoatingData] = React.useState<IShopPaintCoating>(null!)
    const [selectedPaintColorData, setSelectedPaintColorData] = React.useState<IShopPaintColor>(null!)
    // modals states
    const [isShowedModalWindow_ConfirmPurchaseBodypart, setIsShowedModalWindow_ConfirmPurchaseBodypart] = React.useState(false)
    const [isShowedModalWindow_ConfirmPurchasePaintCoating, setIsShowedModalWindow_ConfirmPurchasePaintCoating] = React.useState(false)
    const [isShowedModalWindow_ConfirmPurchasePaintColor, setIsShowedModalWindow_ConfirmPurchasePaintColor] = React.useState(false)
    const [isShowedModalWindow_NotEnoughMoney, setIsShowedModalWindow_NotEnoughMoney] = React.useState(false)
    const [isShowedModalWindow_SuccessPurchase, setIsShowedModalWindow_SuccessPurchase] = React.useState(false)

    // effects

    React.useEffect(()=>{
        setDisplayedVehicle(playerVehicles[0])
    }, [playerVehicles])

    React.useEffect(()=>{
        // BODYPARTS
        stylingStore.setNowDisplayedBodypartsIds(displayedVehicle?.bodyparts_ids)
        stylingStore.setGraphicsPaintCoating(shop_coatings.filter(coating=>coating.paint_coating_name===displayedVehicle?.paint_coating_name)[0])
        stylingStore.setGraphicsPaintColor(shop_colors.filter(color=>color.hex===displayedVehicle?.paint_color_hex)[0])

    }, [displayedVehicle])

    React.useEffect(()=>{
        const a = stylingStore.nowDisplayedGraphics.paint_color
        console.log(a)
    }, [stylingStore.nowDisplayedGraphics.paint_color])

    React.useEffect(()=>{
        const level = stylingStore.menuLevel
        const split_level = level.split('.')

        if (split_level.length >= 3) {

            if (split_level[1] === 'bodyparts') {
                const selectedBodypart = shop_bodyparts
                .filter(shopitem=>shopitem.type===split_level[2])
                .filter(shopitem=>shopitem.id === stylingStore.nowDisplayedBodypartsIds[`${split_level[2]}_id`])[0]
                setSelectedBodypartData(selectedBodypart)
            }
            else if (split_level[1] === 'graphics' && split_level[2] === 'paint_coating') {
                const selected_coating_data = shop_coatings.filter(shopitem=>shopitem.id===stylingStore.nowDisplayedGraphics.paint_coating?.id)[0]
                setSelectedPaintCoatingData(selected_coating_data)
            }
            else if (split_level[1] === 'graphics' && split_level[2] === 'paint_color') {
                const selected_color_data = shop_colors.filter(shopitem=>shopitem.id===stylingStore.nowDisplayedGraphics.paint_color?.id)[0]
                setSelectedPaintColorData(selected_color_data)
            }
        }
    }, [stylingStore.menuLevel])

    // handlers
    const vehiclesPanelOpenHandler = () => {
        setIsVehiclesPanelOpen(!isVehiclesPanelOpen)
    }
    const carItemClickHandler = (vehicle: IVehicle) => {
        setDisplayedVehicle(vehicle)
        setIsVehiclesPanelOpen(false)
    }
    const stylingBodypartButtonClickHandler = (bodypart_data: IShopBodypart) => {
        if (bodypart_data.type === 'bumper_front') stylingStore.setBumperFrontId(bodypart_data.id)
        else if (bodypart_data.type === 'bumper_rear') stylingStore.setBumperRearId(bodypart_data.id)
        else if (bodypart_data.type === 'skirts') stylingStore.setSkirtsId(bodypart_data.id)
        else if (bodypart_data.type === 'spoiler') stylingStore.setSpoilerId(bodypart_data.id)
        else if (bodypart_data.type === 'bonnet') stylingStore.setBonnetId(bodypart_data.id)
        else if (bodypart_data.type === 'mirrors') stylingStore.setMirrorsId(bodypart_data.id)
        else if (bodypart_data.type === 'head_lights') stylingStore.setHeadLightsId(bodypart_data.id)
        else if (bodypart_data.type === 'tail_lights') stylingStore.setTailLightsId(bodypart_data.id)
        else if (bodypart_data.type === 'wings_front') stylingStore.setWingsFrontId(bodypart_data.id)
        else if (bodypart_data.type === 'wings_rear') stylingStore.setWingsRearId(bodypart_data.id)
        else if (bodypart_data.type === 'exhaust') stylingStore.setExhaustId(bodypart_data.id)
        setSelectedBodypartData(bodypart_data)
    }
    const stylingPaintCoatingButtonClickHandler = (coating: IShopPaintCoating) => {
        stylingStore.setGraphicsPaintCoating(coating) // for physically displaying
        setSelectedPaintCoatingData(coating) // for purchasing frame data(-s)
    }
    const stylingPaintColorButtonClickHandler = (color: IShopPaintColor) => {
        stylingStore.setGraphicsPaintColor(color) // for physically displaying
        setSelectedPaintColorData(color) // for purchasing frame data(-s)
    }
    const styling_third_level_back_button_click_handler = (to: string) => {
        // set styling menu level
        stylingStore.setMenuLevel(to)
        // set current displaying bodyparts by id
        stylingStore.setNowDisplayedBodypartsIds(displayedVehicle.bodyparts_ids)
        stylingStore.setGraphicsPaintCoating(shop_coatings.filter(coating=>coating.paint_coating_name===displayedVehicle?.paint_coating_name)[0])
        stylingStore.setGraphicsPaintColor(shop_colors.filter(color=>color.hex===displayedVehicle?.paint_color_hex)[0])
    }
    const stylingBodypartPurchaseConfirmedHandler = async () => { 
        // disable confirmation modal window
        setIsShowedModalWindow_ConfirmPurchaseBodypart(false)
        // make post request with response
        // request
        const url = 'http://localhost:3001/api/vehicles/purchaseBodypart'
        const data = {
            user_id: 230990098,
            vehicle_slot: displayedVehicle.garage_slot,
            bodypart_data: selectedBodypartData,
        }
        const response = (await axios.post(url, data)).data
        // check response status of request
        if (response.status === 'ok') {
            // открыть модалку успешного приобретения
            setIsShowedModalWindow_SuccessPurchase(true)
            // обновить displayedVehicle (получить снова из базы данных)
            const url = `http://localhost:3001/api/vehicles/playerVehicles/${230990098}`
            // обновить displayedVehicle
            await axios.get(url).then((res)=>setDisplayedVehicle(res.data[0]))
            // обновить playerStore.money
            playerStore.setMoney(response.updated_player_money)
            // имитация нажатия на кнопку назад
            styling_third_level_back_button_click_handler('styling.bodyparts')
        }
        else if (response.status === 'error') {
            if (response.error === 'NotEnoughPlayerMoney') {
                // enable not enough modal window
                setIsShowedModalWindow_NotEnoughMoney(true)

                // установить отображаемую деталь как деталь, которая уже куплена у игрока
                // а также установить данные детали в selectedBodypartData
                stylingStore.setNowDisplayedBodypartsIds(displayedVehicle?.bodyparts_ids)
                setSelectedBodypartData(
                    shop_bodyparts
                    .filter(bodypart=>bodypart.type===stylingStore.menuLevel.split('.')[2])
                    .filter(bodypart=>bodypart.id===displayedVehicle?.bodyparts_ids[`${stylingStore.menuLevel.split('.')[2]}_id`])[0]
                )
            }
        }
    }
    const stylingPaintCoatingPurchaseConfirmedHandler = async () => {
        setIsShowedModalWindow_ConfirmPurchasePaintCoating(false)
        const url = 'http://localhost:3001/api/vehicles/purchasePaintCoating'
        const data = {
            user_id: 230990098,
            vehicle_slot: displayedVehicle.garage_slot,
            paint_coating: selectedPaintCoatingData,
        }
        const response = (await axios.post(url, data)).data
        if (response.status === 'ok') {
            setIsShowedModalWindow_SuccessPurchase(true)
            const url = `http://localhost:3001/api/vehicles/playerVehicles/${230990098}`
            await axios.get(url).then((res)=>setDisplayedVehicle(res.data[0]))
            playerStore.setMoney(response.updated_player_money)
            styling_third_level_back_button_click_handler('styling.graphics')
        } else if (response.status === 'error') {
            if (response.error === 'NotEnoughPlayerMoney') {
                // enable not enough modal window
                setIsShowedModalWindow_NotEnoughMoney(true)

                // установить отображаемую деталь как деталь, которая уже куплена у игрока
                // а также установить данные детали в selectedBodypartData
                stylingStore.setGraphicsPaintCoating(shop_coatings.filter(coating=>coating.paint_coating_name===displayedVehicle?.paint_coating_name)[0])
                setSelectedPaintCoatingData(shop_coatings.filter(coating=>coating.paint_coating_name===displayedVehicle?.paint_coating_name)[0])
            }
        }
    }
    const stylingPaintColorPurchaseConfirmedHandler = async () => {
        setIsShowedModalWindow_ConfirmPurchasePaintColor(false)
        const url = 'http://localhost:3001/api/vehicles/purchasePaintColor'
        const data = {
            user_id: 230990098,
            vehicle_slot: displayedVehicle.garage_slot,
            paint_color: selectedPaintColorData,
        }
        const response = (await axios.post(url, data)).data
        if (response.status === 'ok') {
            setIsShowedModalWindow_SuccessPurchase(true)
            const url = `http://localhost:3001/api/vehicles/playerVehicles/${230990098}`
            await axios.get(url).then((res)=>setDisplayedVehicle(res.data[0]))
            playerStore.setMoney(response.updated_player_money)
            styling_third_level_back_button_click_handler('styling.graphics')
        } else if (response.status === 'error') {
            if (response.error === 'NotEnoughPlayerMoney') {
                // enable not enough modal window
                setIsShowedModalWindow_NotEnoughMoney(true)

                // установить отображаемую деталь как деталь, которая уже куплена у игрока
                // а также установить данные детали в selectedBodypartData
                stylingStore.setGraphicsPaintColor(shop_colors.filter(color=>color.hex===displayedVehicle?.paint_color_hex)[0])
                setSelectedPaintColorData(shop_colors.filter(color=>color.hex===displayedVehicle?.paint_color_hex)[0])
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
                <CameraMovementExotic />
                <SceneGarage />

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

            {/* player data frame */}
            <PlayerData />

            {
                isShowedModalWindow_ConfirmPurchaseBodypart &&
                <ModalWindow title='Подтвердите действие' subtitle='' text='Хотите приобрести эту запчасть?'
                    buttons={[
                        { text: 'Нет', tcolor: 'white', bcolor: 'rgba(0,0,0,.45)', onClick: ()=>setIsShowedModalWindow_ConfirmPurchaseBodypart(false) },
                        { text: 'Приобрести', tcolor: 'white', bcolor: '#624CFE', onClick: stylingBodypartPurchaseConfirmedHandler },
                    ]}
                />
            }
            {
                isShowedModalWindow_ConfirmPurchasePaintCoating &&
                <ModalWindow title='Подтвердите действие' subtitle='' text='Хотите приобрести новое покрытие?'
                    buttons={[
                        { text: 'Нет', tcolor: 'white', bcolor: 'rgba(0,0,0,.45)', onClick: ()=>setIsShowedModalWindow_ConfirmPurchasePaintCoating(false) },
                        { text: 'Приобрести', tcolor: 'white', bcolor: '#624CFE', onClick: stylingPaintCoatingPurchaseConfirmedHandler },
                    ]}
                />
            }
            {
                isShowedModalWindow_ConfirmPurchasePaintColor &&
                <ModalWindow title='Подтвердите действие' subtitle='' text='Хотите приобрести новый цвет?'
                    buttons={[
                        { text: 'Нет', tcolor: 'white', bcolor: 'rgba(0,0,0,.45)', onClick: ()=>setIsShowedModalWindow_ConfirmPurchasePaintColor(false) },
                        { text: 'Приобрести', tcolor: 'white', bcolor: '#624CFE', onClick: stylingPaintColorPurchaseConfirmedHandler },
                    ]}
                />
            }
            {
                isShowedModalWindow_NotEnoughMoney &&
                <ModalWindow title='Недостаточно средств' subtitle='' text='У вас не хватает средст для приобретения этой запчасти.'
                    buttons={[
                        { text: 'Понятно', tcolor: 'white', bcolor: 'rgba(0,0,0,.45)', onClick: ()=>setIsShowedModalWindow_NotEnoughMoney(false) },
                    ]}
                />
            }
            {
                isShowedModalWindow_SuccessPurchase &&
                <ModalWindow title='Успешное приобретение' subtitle='' text='Поздравляем с новой покупкой!'
                    buttons={[
                        { text: 'Супер', tcolor: 'white', bcolor: '#624CFE', onClick: ()=>setIsShowedModalWindow_SuccessPurchase(false) },
                    ]}
                />
            }


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
                    <StylingNavList title='Стайлинг' subtitle='Выберите магазин'>
                        <StylingNavItem text='Кузовное ателье' onClick={()=>stylingStore.setMenuLevel('styling.bodyparts')} />
                        <StylingNavItem text='Покрасочный цех' onClick={()=>stylingStore.setMenuLevel('styling.graphics')} />
                        <StylingNavItem text='Аксессуарная лавка' onClick={()=>stylingStore.setMenuLevel('styling.bodyparts')} />
                        <StylingNavItem text='Колесная станция' onClick={()=>stylingStore.setMenuLevel('styling.bodyparts')} />
                    </StylingNavList>
                }
                {/* BODYPARTS */}
                {
                    stylingStore.menuLevel === 'styling.bodyparts' &&
                    <StylingNavList title='Кузовное ателье' subtitle='Выберите тип деталей' buttonText='Назад' onButtonClick={()=>stylingStore.setMenuLevel('styling')}>
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
                    stylingStore.menuLevel.includes('bodyparts') && stylingStore.menuLevel.split('.').length >= 3 &&
                    <StylingNavList title='Кузовное ателье' subtitle={translateBodypartType(stylingStore.menuLevel.split('.')[2])} buttonText='Назад' onButtonClick={()=>styling_third_level_back_button_click_handler('styling.bodyparts')}>
                        {
                            shop_bodyparts
                            .filter(bodypart_data => bodypart_data.type===stylingStore.menuLevel.split('.')[2])
                            .map(bodypart_data =>
                                <StylingBodypartButton
                                    key={bodypart_data.id}
                                    partName={bodypart_data.present_name}
                                    price={bodypart_data.price}
                                    isPurchased={bodypart_data.id === displayedVehicle.bodyparts_ids[`${stylingStore.menuLevel.split('.')[2]}_id`]}
                                    onClick={()=>stylingBodypartButtonClickHandler(bodypart_data)}
                                />
                            )
                        }
                    </StylingNavList>
                }
                {
                    stylingStore.menuLevel.includes('bodyparts') && stylingStore.menuLevel.split('.').length >= 3 &&
                    <StylingPurchasing
                        title={ selectedBodypartData?.present_name }
                        subtitle={ translateBodypartType(stylingStore.menuLevel.split('.')[2]) }
                        price={ selectedBodypartData?.price }
                        onPurchaseClick={()=>setIsShowedModalWindow_ConfirmPurchaseBodypart(true)}
                    />
                }

                {/* GRAPHICS */}
                {
                    stylingStore.menuLevel === 'styling.graphics' &&
                    <StylingNavList title='Покрасочный цех' subtitle='Выберите тип работ' buttonText='Назад' onButtonClick={()=>stylingStore.setMenuLevel('styling')}>
                        <StylingNavItem text='Цвет кузова' onClick={()=>stylingStore.setMenuLevel('styling.graphics.paint_color')} />
                        <StylingNavItem text='Покрытие краски' onClick={()=>stylingStore.setMenuLevel('styling.graphics.paint_coating')} />
                    </StylingNavList>
                }
                {/* GRAPHICS.PAINT_COATINGS */}
                {
                    stylingStore.menuLevel.includes('graphics.paint_coating') && stylingStore.menuLevel.split('.').length >= 3 &&
                    <StylingNavList title='Покрасочный цех' subtitle={translateGraphicType(stylingStore.menuLevel.split('.')[2])} buttonText='Назад' onButtonClick={()=>styling_third_level_back_button_click_handler('styling.graphics')}>
                        {
                            shop_coatings
                            .map(coating =>
                                <StylingGraphicButton
                                    key={coating.id}
                                    text={coating.present_name}
                                    price={coating.price}
                                    isPurchased={false}
                                    onClick={()=>stylingPaintCoatingButtonClickHandler(coating)}
                                />
                            )
                        }
                    </StylingNavList>
                }
                {
                    stylingStore.menuLevel.includes('graphics.paint_coating') && stylingStore.menuLevel.split('.').length >= 3 &&
                    <StylingPurchasing
                        title={ selectedPaintCoatingData?.present_name }
                        subtitle={ translateGraphicType(stylingStore.menuLevel.split('.')[2]) }
                        price={ selectedPaintCoatingData?.price }
                        onPurchaseClick={()=>setIsShowedModalWindow_ConfirmPurchasePaintCoating(true)}
                    />
                }
                {/* GRAPHICS.PAINT_COLORS */}
                {
                    stylingStore.menuLevel.includes('graphics.paint_color') && stylingStore.menuLevel.split('.').length >= 3 &&
                    <StylingNavList title='Покрасочный цех' subtitle={translateGraphicType(stylingStore.menuLevel.split('.')[2])} buttonText='Назад' onButtonClick={()=>styling_third_level_back_button_click_handler('styling.graphics')}>
                        {
                            shop_colors
                            .map(color =>
                                <StylingGraphicButton
                                    key={color.id}
                                    text={color.present_name}
                                    price={color.price}
                                    isPurchased={false}
                                    onClick={()=>stylingPaintColorButtonClickHandler(color)}
                                />
                            )
                        }
                    </StylingNavList>
                }
                {
                    stylingStore.menuLevel.includes('graphics.paint_color') && stylingStore.menuLevel.split('.').length >= 3 &&
                    <StylingPurchasing
                        title={ selectedPaintColorData?.present_name }
                        subtitle={ translateGraphicType(stylingStore.menuLevel.split('.')[2]) }
                        price={ selectedPaintColorData?.price }
                        onPurchaseClick={()=>setIsShowedModalWindow_ConfirmPurchasePaintColor(true)}
                    />
                }

                <button className={styles.btn_back_to_garage} onClick={()=>{ setIsStylingOpen(false); styling_third_level_back_button_click_handler('styling')}}>
                    <p>Вернуться в гараж</p>
                </button>
            </div>
            }
        </div>
    )
}

export default observer(Garage)