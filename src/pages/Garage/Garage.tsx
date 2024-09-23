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
import { CarItem } from './components/CarItem'
import { StylingNavButton } from './components/StylingNavButton'
import { BodypartButton } from './components/BodypartButton'
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
// 3d and data
import { shop_bodyparts as shop_bodyparts_mazda_rx7 } from '@3d/cars/MazdaRX7'
import axios from 'axios'
import IBodypart from '@models/IBodypart'

const Garage = () => {

    // vars

    // hooks
    const playerVehicles = usePlayerVehicles(230990098)

    // states
    const [displayedVehicle, setDisplayedVehicle] = React.useState<IVehicle>(null!)
    const [isVehiclesPanelOpen, setIsVehiclesPanelOpen] = React.useState<boolean>(false)
    const [isStylingOpen, setIsStylingOpen] = React.useState<boolean>(false)
    // const [stylingMenuLevel, setStylingMenuLevel] = React.useState<string>('styling')

    // effects
    React.useEffect(()=>{
        setDisplayedVehicle(playerVehicles[0])
    }, [playerVehicles])

    React.useEffect(()=>{
        // set just now displaying body parts
        stylingStore.setNowDisplayedBodypartsIds(displayedVehicle?.bodyparts_ids)
        
        // set shop data of bodyparts for some vehicle BY NAME: `mazda_rx7` | `bmw...` | `mercedes...` | etc.
        const vehicle_name = `${displayedVehicle?.brand}_${displayedVehicle?.model}`
        if (vehicle_name.toLowerCase() === 'mazda_rx-7') {
            stylingStore.setShopBodypartsForVehicle(shop_bodyparts_mazda_rx7)
        } else {
            stylingStore.setShopBodypartsForVehicle([]) // clear
        }
    }, [displayedVehicle])

    // handlers
    const vehiclesPanelOpenHandler = () => {
        setIsVehiclesPanelOpen(!isVehiclesPanelOpen)
    }
    const carItemClickHandler = (vehicle: IVehicle) => {
        setDisplayedVehicle(vehicle)
        setIsVehiclesPanelOpen(false)
    }
    const bodypartButtonClickHandler = (bodypart_data: IBodypart ) => {
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
    }
    const styling_third_level_back_button_click_handler = () => {
        // set styling menu level
        stylingStore.setMenuLevel('styling.bodyparts')
        // set current displaying bodyparts by id
        stylingStore.setNowDisplayedBodypartsIds(displayedVehicle.bodyparts_ids)
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
                {/* <OrbitControls /> */}
                {/* <Perf position='bottom-left' /> */}
                {/* <EnvExotic intensity={1.3} path='3d/hdri/metro_vijzelgracht_1k.hdr' /> */}
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
                <div className={styles.styling_nav_buttons_container}>

                    {/* styling start page */}
                    {
                        stylingStore.menuLevel === 'styling' &&
                        <div className={styles.nav_buttons_list}>
                            <StylingNavButton text='Кузовное ателье' onClick={()=>stylingStore.setMenuLevel('styling.bodyparts')} />
                            <StylingNavButton text='Покрасочный цех' onClick={()=>stylingStore.setMenuLevel('styling.graphics')} />
                            <StylingNavButton text='Аксессуарная лавка' onClick={()=>stylingStore.setMenuLevel('styling.accessories')} />
                            <StylingNavButton text='Колесная станция' onClick={()=>stylingStore.setMenuLevel('styling.wheels')} />
                        </div>
                    }

                    {/* styling.bodyparts */}
                    {
                        stylingStore.menuLevel === 'styling.bodyparts' &&
                        <div className={styles.styling_nav_container}>
                            <div className={styles.styling_nav_head}>
                                <h2>Кузовное ателье</h2>
                                <SvgDoor fill='black' />
                            </div>
                            <div className={styles.nav_buttons_list}>
                                <StylingNavButton text='Передние бамперы' subtext={`${stylingStore.shopBodypartsForVehicle.filter(part=>part.type==='bumper_front').length} шт.`} onClick={()=>stylingStore.setMenuLevel('styling.bodyparts.bumpers_front')} />
                                <StylingNavButton text='Здание бамперы' subtext={`${stylingStore.shopBodypartsForVehicle.filter(part=>part.type==='bumper_rear').length} шт.`} onClick={()=>stylingStore.setMenuLevel('styling.bodyparts.bumpers_rear')} />
                                <StylingNavButton text='Боковые юбки' subtext={`${stylingStore.shopBodypartsForVehicle.filter(part=>part.type==='skirts').length} шт.`} onClick={()=>stylingStore.setMenuLevel('styling.bodyparts.skirts')} />
                                <StylingNavButton text='Спойлеры' subtext={`${stylingStore.shopBodypartsForVehicle.filter(part=>part.type==='spoiler').length} шт.`} onClick={()=>stylingStore.setMenuLevel('styling.bodyparts.spoilers')} />
                                <StylingNavButton text='Капоты' subtext={`${stylingStore.shopBodypartsForVehicle.filter(part=>part.type==='bonnet').length} шт.`} onClick={()=>stylingStore.setMenuLevel('styling.bodyparts.bonnets')} />
                                <StylingNavButton text='Боковые зеркала' subtext={`${stylingStore.shopBodypartsForVehicle.filter(part=>part.type==='mirrors').length} шт.`} onClick={()=>stylingStore.setMenuLevel('styling.bodyparts.mirrors')} />
                                <StylingNavButton text='Передние фары' subtext={`${stylingStore.shopBodypartsForVehicle.filter(part=>part.type==='head_lights').length} шт.`} onClick={()=>stylingStore.setMenuLevel('styling.bodyparts.head_lights')} />
                                <StylingNavButton text='Задние огни' subtext={`${stylingStore.shopBodypartsForVehicle.filter(part=>part.type==='tail_lights').length} шт.`} onClick={()=>stylingStore.setMenuLevel('styling.bodyparts.tail_lights')} />
                                <StylingNavButton text='Передние крылья' subtext={`${stylingStore.shopBodypartsForVehicle.filter(part=>part.type==='wings_front').length} шт.`} onClick={()=>stylingStore.setMenuLevel('styling.bodyparts.wings_front')} />
                                <StylingNavButton text='Задние крылья' subtext={`${stylingStore.shopBodypartsForVehicle.filter(part=>part.type==='wings_rear').length} шт.`} onClick={()=>stylingStore.setMenuLevel('styling.bodyparts.wings_rear')} />
                                <StylingNavButton text='Выхлопные трубы' subtext={`${stylingStore.shopBodypartsForVehicle.filter(part=>part.type==='exhaust').length} шт.`} onClick={()=>stylingStore.setMenuLevel('styling.bodyparts.exhausts')} />
                            </div>
                            <StylingNavButton text='Назад' onClick={()=>stylingStore.setMenuLevel('styling')} />
                        </div>
                    }
                        
                    {/* styling.bodyparts.bumpers_front */}
                    {
                        stylingStore.menuLevel.includes('styling.bodyparts.bumpers_front') &&
                        <div className={styles.styling_nav_container}>
                            <div className={styles.styling_nav_head}>
                                <div>
                                    <h2>Кузовное ателье</h2>
                                    <p>Передние бамперы</p>
                                </div>
                                <SvgDoor fill='black' />
                            </div>
                            <div className={styles.nav_buttons_list}>
                                {
                                    stylingStore.shopBodypartsForVehicle
                                    .filter(bodypart_data => bodypart_data.type==='bumper_front')
                                    .map(bodypart_data =>
                                        <BodypartButton
                                            key={bodypart_data.id}
                                            name={bodypart_data.name}
                                            price={bodypart_data.price}
                                            is_purchased={bodypart_data.id === displayedVehicle.bodyparts_ids.bumper_front_id}
                                            onClick={()=>bodypartButtonClickHandler(bodypart_data)}
                                        />
                                    )
                                }
                            </div>
                            <StylingNavButton text='Назад' onClick={styling_third_level_back_button_click_handler} />
                            <div className={styles.purchasing_frame}>
                                <div className={styles.purchasing_head}>
                                    <h2 className={styles.purchasing_title}>{ stylingStore.shopBodypartsForVehicle[stylingStore.nowDisplayedBodypartsIds.bumper_front_id-1].name }</h2>
                                    <p className={styles.purchasing_text}>Передний бампер</p>
                                    <div className={styles.purchasing_price_container}>
                                        <p className={styles.purchasing_price_number}>{ stylingStore.shopBodypartsForVehicle[stylingStore.nowDisplayedBodypartsIds.bumper_front_id-1].price.toLocaleString('en-US') }</p>
                                        <p className={styles.purchasing_price_currency}>$</p>
                                    </div>
                                </div>
                                <button className={styles.btn_purchase}><p>Приобрести</p></button>
                            </div>
                        </div>
                    }

                    {/*styling.bodyparts.bumpers_rear */}
                    {
                        stylingStore.menuLevel.includes('styling.bodyparts.bumpers_rear') &&
                        <div className={styles.styling_nav_container}>
                            <div className={styles.styling_nav_head}>
                                <div>
                                    <h2>Кузовное ателье</h2>
                                    <p>Задние бамперы</p>
                                </div>
                                <SvgDoor fill='black' />
                            </div>
                            <div className={styles.nav_buttons_list}>
                                {
                                    stylingStore.shopBodypartsForVehicle
                                    .filter(bodypart_data => bodypart_data.type==='bumper_rear')
                                    .map(bodypart_data =>
                                        <BodypartButton
                                            key={bodypart_data.id}
                                            name={bodypart_data.name}
                                            price={bodypart_data.price}
                                            is_purchased={bodypart_data.id === displayedVehicle.bodyparts_ids.bumper_rear_id}
                                            onClick={()=>bodypartButtonClickHandler(bodypart_data)}
                                        />
                                    )
                                }
                            </div>
                            <StylingNavButton text='Назад' onClick={styling_third_level_back_button_click_handler} />
                        </div>
                    }

                    {/*styling.bodyparts.skirts */}
                    {
                        stylingStore.menuLevel.includes('styling.bodyparts.skirts') &&
                        <div className={styles.styling_nav_container}>
                            <div className={styles.styling_nav_head}>
                                <div>
                                    <h2>Кузовное ателье</h2>
                                    <p>Боковые юбки</p>
                                </div>
                                <SvgDoor fill='black' />
                            </div>
                            <div className={styles.nav_buttons_list}>
                                {
                                    stylingStore.shopBodypartsForVehicle
                                    .filter(bodypart_data => bodypart_data.type==='skirts')
                                    .map(bodypart_data =>
                                        <BodypartButton
                                            key={bodypart_data.id}
                                            name={bodypart_data.name}
                                            price={bodypart_data.price}
                                            is_purchased={bodypart_data.id === displayedVehicle.bodyparts_ids.skirts_id}
                                            onClick={()=>bodypartButtonClickHandler(bodypart_data)}
                                        />
                                    )
                                }
                            </div>
                            <StylingNavButton text='Назад' onClick={styling_third_level_back_button_click_handler} />
                        </div>
                    }

                    {/*styling.bodyparts.spoilers */}
                    {
                        stylingStore.menuLevel.includes('styling.bodyparts.spoilers') &&
                        <div className={styles.styling_nav_container}>
                            <div className={styles.styling_nav_head}>
                                <div>
                                    <h2>Кузовное ателье</h2>
                                    <p>Спойлеры</p>
                                </div>
                                <SvgDoor fill='black' />
                            </div>
                            <div className={styles.nav_buttons_list}>
                                {
                                    stylingStore.shopBodypartsForVehicle
                                    .filter(bodypart_data => bodypart_data.type==='spoiler')
                                    .map(bodypart_data =>
                                        <BodypartButton
                                            key={bodypart_data.id}
                                            name={bodypart_data.name}
                                            price={bodypart_data.price}
                                            is_purchased={bodypart_data.id === displayedVehicle.bodyparts_ids.spoiler_id}
                                            onClick={()=>bodypartButtonClickHandler(bodypart_data)}
                                        />
                                    )
                                }
                            </div>
                            <StylingNavButton text='Назад' onClick={styling_third_level_back_button_click_handler} />
                        </div>
                    }

                    {/*styling.bodyparts.bonnets */}
                    {
                        stylingStore.menuLevel.includes('styling.bodyparts.bonnets') &&
                        <div className={styles.styling_nav_container}>
                            <div className={styles.styling_nav_head}>
                                <div>
                                    <h2>Кузовное ателье</h2>
                                    <p>Капоты</p>
                                </div>
                                <SvgDoor fill='black' />
                            </div>
                            <div className={styles.nav_buttons_list}>
                                {
                                    stylingStore.shopBodypartsForVehicle
                                    .filter(bodypart_data => bodypart_data.type==='bonnet')
                                    .map(bodypart_data =>
                                        <BodypartButton
                                            key={bodypart_data.id}
                                            name={bodypart_data.name}
                                            price={bodypart_data.price}
                                            is_purchased={bodypart_data.id === displayedVehicle.bodyparts_ids.bonnet_id}
                                            onClick={()=>bodypartButtonClickHandler(bodypart_data)}
                                        />
                                    )
                                }
                            </div>
                            <StylingNavButton text='Назад' onClick={styling_third_level_back_button_click_handler} />
                        </div>
                    }

                    {/*styling.bodyparts.mirrors */}
                    {
                        stylingStore.menuLevel.includes('styling.bodyparts.mirrors') &&
                        <div className={styles.styling_nav_container}>
                            <div className={styles.styling_nav_head}>
                                <div>
                                    <h2>Кузовное ателье</h2>
                                    <p>Боковые зеркала</p>
                                </div>
                                <SvgDoor fill='black' />
                            </div>
                            <div className={styles.nav_buttons_list}>
                                {
                                    stylingStore.shopBodypartsForVehicle
                                    .filter(bodypart_data => bodypart_data.type==='mirrors')
                                    .map(bodypart_data =>
                                        <BodypartButton
                                            key={bodypart_data.id}
                                            name={bodypart_data.name}
                                            price={bodypart_data.price}
                                            is_purchased={bodypart_data.id === displayedVehicle.bodyparts_ids.mirrors_id}
                                            onClick={()=>bodypartButtonClickHandler(bodypart_data)}
                                        />
                                    )
                                }
                            </div>
                            <StylingNavButton text='Назад' onClick={styling_third_level_back_button_click_handler} />
                        </div>
                    }

                    {/*styling.bodyparts.head_lights */}
                    {
                        stylingStore.menuLevel.includes('styling.bodyparts.head_lights') &&
                        <div className={styles.styling_nav_container}>
                            <div className={styles.styling_nav_head}>
                                <div>
                                    <h2>Кузовное ателье</h2>
                                    <p>Передние фары</p>
                                </div>
                                <SvgDoor fill='black' />
                            </div>
                            <div className={styles.nav_buttons_list}>
                                {
                                    stylingStore.shopBodypartsForVehicle
                                    .filter(bodypart_data => bodypart_data.type==='head_lights')
                                    .map(bodypart_data =>
                                        <BodypartButton
                                            key={bodypart_data.id}
                                            name={bodypart_data.name}
                                            price={bodypart_data.price}
                                            is_purchased={bodypart_data.id === displayedVehicle.bodyparts_ids.head_lights_id}
                                            onClick={()=>bodypartButtonClickHandler(bodypart_data)}
                                        />
                                    )
                                }
                            </div>
                            <StylingNavButton text='Назад' onClick={styling_third_level_back_button_click_handler} />
                        </div>
                    }

                    {/*styling.bodyparts.tail_lights */}
                    {
                        stylingStore.menuLevel.includes('styling.bodyparts.tail_lights') &&
                        <div className={styles.styling_nav_container}>
                            <div className={styles.styling_nav_head}>
                                <div>
                                    <h2>Кузовное ателье</h2>
                                    <p>Передние фары</p>
                                </div>
                                <SvgDoor fill='black' />
                            </div>
                            <div className={styles.nav_buttons_list}>
                                {
                                    stylingStore.shopBodypartsForVehicle
                                    .filter(bodypart_data => bodypart_data.type==='tail_lights')
                                    .map(bodypart_data =>
                                        <BodypartButton
                                            key={bodypart_data.id}
                                            name={bodypart_data.name}
                                            price={bodypart_data.price}
                                            is_purchased={bodypart_data.id === displayedVehicle.bodyparts_ids.tail_lights_id}
                                            onClick={()=>bodypartButtonClickHandler(bodypart_data)}
                                        />
                                    )
                                }
                            </div>
                            <StylingNavButton text='Назад' onClick={styling_third_level_back_button_click_handler} />
                        </div>
                    }

                    {/*styling.bodyparts.wings_front */}
                    {
                        stylingStore.menuLevel.includes('styling.bodyparts.wings_front') &&
                        <div className={styles.styling_nav_container}>
                            <div className={styles.styling_nav_head}>
                                <div>
                                    <h2>Кузовное ателье</h2>
                                    <p>Передние крылья</p>
                                </div>
                                <SvgDoor fill='black' />
                            </div>
                            <div className={styles.nav_buttons_list}>
                                {
                                    stylingStore.shopBodypartsForVehicle
                                    .filter(bodypart_data => bodypart_data.type==='wings_front')
                                    .map(bodypart_data =>
                                        <BodypartButton
                                            key={bodypart_data.id}
                                            name={bodypart_data.name}
                                            price={bodypart_data.price}
                                            is_purchased={bodypart_data.id === displayedVehicle.bodyparts_ids.wings_front_id}
                                            onClick={()=>bodypartButtonClickHandler(bodypart_data)}
                                        />
                                    )
                                }
                            </div>
                            <StylingNavButton text='Назад' onClick={styling_third_level_back_button_click_handler} />
                        </div>
                    }

                    {/*styling.bodyparts.wings_rear */}
                    {
                        stylingStore.menuLevel.includes('styling.bodyparts.wings_rear') &&
                        <div className={styles.styling_nav_container}>
                            <div className={styles.styling_nav_head}>
                                <div>
                                    <h2>Кузовное ателье</h2>
                                    <p>Задние крылья</p>
                                </div>
                                <SvgDoor fill='black' />
                            </div>
                            <div className={styles.nav_buttons_list}>
                                {
                                    stylingStore.shopBodypartsForVehicle
                                    .filter(bodypart_data => bodypart_data.type==='wings_rear')
                                    .map(bodypart_data =>
                                        <BodypartButton
                                            key={bodypart_data.id}
                                            name={bodypart_data.name}
                                            price={bodypart_data.price}
                                            is_purchased={bodypart_data.id === displayedVehicle.bodyparts_ids.wings_rear_id}
                                            onClick={()=>bodypartButtonClickHandler(bodypart_data)}
                                        />
                                    )
                                }
                            </div>
                            <StylingNavButton text='Назад' onClick={styling_third_level_back_button_click_handler} />
                        </div>
                    }

                    {/*styling.bodyparts.wings_rear */}
                    {
                        stylingStore.menuLevel.includes('styling.bodyparts.exhausts') &&
                        <div className={styles.styling_nav_container}>
                            <div className={styles.styling_nav_head}>
                                <div>
                                    <h2>Кузовное ателье</h2>
                                    <p>Выхлопные трубы</p>
                                </div>
                                <SvgDoor fill='black' />
                            </div>
                            <div className={styles.nav_buttons_list}>
                                {
                                    stylingStore.shopBodypartsForVehicle
                                    .filter(bodypart_data => bodypart_data.type==='exhaust')
                                    .map(bodypart_data =>
                                        <BodypartButton
                                            key={bodypart_data.id}
                                            name={bodypart_data.name}
                                            price={bodypart_data.price}
                                            is_purchased={bodypart_data.id === displayedVehicle.bodyparts_ids.exhaust_id}
                                            onClick={()=>bodypartButtonClickHandler(bodypart_data)}
                                        />
                                    )
                                }
                            </div>
                            <StylingNavButton text='Назад' onClick={styling_third_level_back_button_click_handler} />
                        </div>
                    }
                </div>

                {/* back to garage button */}
                <button className={styles.btn_back_to_garage} onClick={()=>{
                    setIsStylingOpen(false)
                    styling_third_level_back_button_click_handler()
                }}>
                    <p>Вернуться в гараж</p>
                </button>
            </div>
            }
        </div>
    )
}

export default observer(Garage)