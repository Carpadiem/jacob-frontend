import React, { ChangeEvent } from 'react'
import styles from './Autosalon.module.css'
// images
import bg from './images/bg.jpg'
import keys_help from './images/keys_help.png'
import Search from './images/search.svg?react'
import ArrowDown from './images/arrow_down.svg?react'
import PNGLoading from './images/loading.png'
// components
import { CarItem } from './components/CarItem'
import { BrandItem } from './components/BrandItem'
import { SearchItem } from './components/SearchItem'
import { ModalWindow } from '@components/ModalWindow'
// misc
import wuzzy from 'wuzzy'
import { useDebounce } from 'use-debounce'
// utils
import capitalize from '@utils/capitalize'
// 3d
import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { EnvExotic } from '@exotic/EnvExotic'
import { EffectsExotic } from '@exotic/EffectsExotic'
// 3d components
import SceneAutosalon from '@3d/scenes/Autosalon'
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
import { degToRad } from 'three/src/math/MathUtils'
// network
import axios from 'axios'
import { url } from 'inspector'
import { ModalButton } from '@components/ModalButton'
// models
import IVehicle from '@models/IVehicle'
import useGameVehicles from 'src/hooks/useGameVehicles'
import stylingStore from '@stores/styling.store'
import shop_coatings from 'src/shop/styling/graphic_coatings'
import shop_colors from 'src/shop/styling/graphic_colors'


const all_brand_items = [
  'BMW',
  'Dodge',
  'Mazda',
  'Mercedes-Benz',
  'Mitsubishi',
  'Nissan',
  'Porsche',
  'Toyota',
  'Volkswagen',
]


function Autosalon() {
  // vars

  // hooks
  const game_vehicles = useGameVehicles()

  // refs
  const ref_list_items = React.useRef<HTMLDivElement>(null!)
  const ref_list_brands_container = React.useRef<HTMLDivElement>(null!)

  // states
  const [selectedBrand, setSelectedBrand] = React.useState<string>('BMW')
  const [isBrandsOpened, setIsBrandsOpened] = React.useState<boolean>(false)
  const [searchText, setSearchText] = React.useState<string>('')
  const [searchTextDebounced] = useDebounce(searchText, 1000)
  const [searchMatchVehicles, setSearchMatchVehicles] = React.useState<any[] | undefined>([])
  const [filterListVehicles, setFilterListVehicles] = React.useState<IVehicle[]>(null!) // vehicles by brand 'BMW'
  const [displayedVehicle, setDisplayedVehicle] = React.useState<IVehicle>(null!)
  // states of modals
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = React.useState<boolean>(false)
  const [isNotEnoughMoneyModalOpen, setIsNotEnoughMoneyModalOpen] = React.useState<boolean>(false)
  const [isNotEnoughGarageSlotsModalOpen, setIsNotEnoughGarageSlotsModalOpen] = React.useState<boolean>(false)
  const [isSuccessPurchaseModalOpen, setIsSuccessPurchaseModalOpen] = React.useState<boolean>(false)

  // effects
  React.useEffect(()=>{
    setFilterListVehicles(game_vehicles.filter((vehicle, index)=>{
      if (index === 0) vehicle.is_selected = true
      return vehicle.brand.toLowerCase()==='bmw'
    }))
  }, [game_vehicles])

  React.useEffect(()=>{
    // set Displayed vehicle
    const newDisplayedVehicle = filterListVehicles?.filter(vehicle=>vehicle.is_selected)[0]
    setDisplayedVehicle(newDisplayedVehicle)
  }, [filterListVehicles])

  React.useEffect(()=>{
    // set vehicle paint coating and color
    const paint_coating = shop_coatings.filter(coating=>coating.paint_coating_name==='glossy')[0]
    const paint_color = shop_colors.filter(color=>color.id===15)[0] // gainsboro
    stylingStore.setGraphicsPaintCoating(paint_coating)
    stylingStore.setGraphicsPaintColor(paint_color)
  }, [displayedVehicle])

  React.useEffect(()=>{
    if (isBrandsOpened) ref_list_brands_container.current.style.height = '250px'
    else ref_list_brands_container.current.style.height = '60px'
  }, [isBrandsOpened])

  // effect: debounce search
  React.useEffect(()=>{
    const match_vehicles = game_vehicles.filter(vehicle=>wuzzy.levenshtein(searchTextDebounced.toLowerCase(), vehicle.brand.toLowerCase() + ' ' + vehicle.model.toLowerCase()) >= .235)
    if (match_vehicles.length !== 0) setSearchMatchVehicles(match_vehicles)
    else setSearchMatchVehicles(undefined)
  }, [searchTextDebounced])

  React.useEffect(()=>{
    setSearchMatchVehicles([])
  }, [searchText])

  // functions
  //

  // handlers
  const item_click_handler = (clickedVehicle: IVehicle) => {
    // reset 'is_selected' prop to 'false' for all filtered items AND...
    // select item by clickedCarItem
    const newFilterListVehicles = filterListVehicles.map(vehicle=>{
      if (vehicle === clickedVehicle) vehicle.is_selected = true
      else vehicle.is_selected = false
      return vehicle
    })
    setFilterListVehicles(newFilterListVehicles)
  }

  const brands_opened_handler = () => {
    setIsBrandsOpened(!isBrandsOpened)
  }

  const brand_item_click_handler = (clickedBrand: string) => {
    setSelectedBrand(clickedBrand)
    setIsBrandsOpened(false)
    // filter cars (items) in list + select first item
    const filterListVehicles: IVehicle[] = game_vehicles.filter(item=>item.brand === clickedBrand)
    filterListVehicles[0].is_selected = true
    setFilterListVehicles(filterListVehicles)
  }

  const search_input_change_handler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.currentTarget.value)
  }

  const search_item_click_handler = (vehicle_brand: string, vehicle_model: string) => {
    // hide search window
    setSearchText('')
    // set brand state
    setSelectedBrand(vehicle_brand)
    setIsBrandsOpened(false)
    // display car items by brand + select for found item
    let vehiclesByBrand: IVehicle[] = game_vehicles.filter(item=>item.brand === vehicle_brand)
    vehiclesByBrand = vehiclesByBrand.map(vehicle=>{
      if (vehicle.model === vehicle_model) vehicle.is_selected = true
      else vehicle.is_selected = false
      return vehicle
    })
    setFilterListVehicles(vehiclesByBrand)
  }

  const purchase_handler = async () => {

    // выключить модальное окно подтверждения
    setIsConfirmationModalOpen(false)

    // запрос на бекенд - приобретение нового авто
    const url = 'http://localhost:3001/api/vehicles/purchaseVehicle'
    const data = {
      user_id: 230990098,
      vehicle_id: displayedVehicle.id,
    }
    const response = (await axios.post(url, data)).data
    if (response.status === 'ok') {
      setIsSuccessPurchaseModalOpen(true)
    } else if (response.status === 'error') {
      if (response.error == 'NotEnoughPlayerMoney') {
        setIsNotEnoughMoneyModalOpen(true)
      }
      else if (response.error === 'NotEnoughGarageSlots') {
        setIsNotEnoughGarageSlotsModalOpen(true)
      }
    }
  }

  return (
    <>
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
          <Perf position='bottom-left' />
          <EnvExotic intensity={1.3} path='3d/hdri/metro_vijzelgracht_1k.hdr' />
          <EffectsExotic />
          <SceneAutosalon />

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

        {/* Modals */}
        { isConfirmationModalOpen &&
        <ModalWindow
          title='Подтвердите действие'
          subtitle=''
          text='Вы покупаете новый автомобиль за некоторое количество денег. Подтвердите пожалуйста свои действия!'
          buttons={[
            {
              text: 'Отмена',
              tcolor: 'white',
              bcolor: 'rgba(0,0,0,.45)',
              onClick: ()=>{setIsConfirmationModalOpen(false)}
            },
            {
              text: 'Приобрести',
              tcolor: 'white',
              bcolor: '#624CFE',
              onClick: purchase_handler
            },
          ]}
        />}
        { isNotEnoughMoneyModalOpen &&
        <ModalWindow
          title='Недостаточно средств'
          subtitle=''
          text='У вас недостаточно наличных средств.'
          buttons={[
            {
              text: 'Ок',
              tcolor: 'white',
              bcolor: 'rgba(0,0,0,.45)',
              onClick: ()=>{setIsNotEnoughMoneyModalOpen(false)}
            },
          ]}
        />}
        { isNotEnoughGarageSlotsModalOpen &&
        <ModalWindow
          title='Слоты заняты'
          subtitle=''
          text='В гараже не осталось свободных слотов. Освободите место или приобретите новые слоты.'
          buttons={[
            {
              text: 'Понятно',
              tcolor: 'white',
              bcolor: 'rgba(0,0,0,.45)',
              onClick: ()=>{setIsNotEnoughGarageSlotsModalOpen(false)}
            },
          ]}
        />}
        { isSuccessPurchaseModalOpen &&
        <ModalWindow
          title='Поздравляем!'
          subtitle=''
          text='Вы приобрели новую машину за баксы.'
          buttons={[
            {
              text: 'Супер',
              tcolor: 'white',
              bcolor: '#624CFE',
              onClick: ()=>{setIsSuccessPurchaseModalOpen(false)}
            },
          ]}
        />}

        <div className={styles.list_frame}>
          <div className={styles.list_head}>
            <div className={styles.logo_container}>
              <h2 className={styles.logo_text}>
                <span>J</span>Motors
              </h2>
            </div>
            <div className={styles.search_container}>
              <div className={styles.search_field}>
                <Search fill='white' />
                <input
                  className={styles.search_input}
                  placeholder='Поиск'
                  type='text'
                  value={searchText}
                  onChange={ search_input_change_handler }
                />
              </div>
              <div
                className={styles.search_frame}
                style={{
                  transform: searchText === '' ? 'translateY(-100px)' : 'translateY(0)',
                  opacity: searchText === '' ? '0' : '1'
                } as React.CSSProperties}
              >
                {
                  searchMatchVehicles?.length > 0
                  ?
                  searchMatchVehicles?.map(vehicle=><SearchItem brand={vehicle.brand} model={vehicle.model} onClick={()=>search_item_click_handler(vehicle.brand, vehicle.model)}/>)
                  :
                  searchMatchVehicles === undefined
                  ?
                  <p className={styles.search_nothing_text}>Ничего не найдено</p>
                  :
                  <img className={styles.loading_image} src={PNGLoading} />
                }
              </div>
            </div>
          </div>

          <div className={styles.list_brands_container} ref={ref_list_brands_container}>
            <div className={styles.list_brand_select_frame} onClick={brands_opened_handler}>
              <p className={styles.list_brand_text}>{selectedBrand}</p>
              <ArrowDown fill='white' />
            </div>
            <div className={styles.brand_items_container}>
              { all_brand_items.map((brand, index)=> <BrandItem key={index} brand={brand} onClick={()=>{brand_item_click_handler(brand)}} /> ) }
            </div>
          </div>
          
          <div className={styles.list_items} ref={ref_list_items}>
            {
              filterListVehicles?.map((vehicle, index)=>{
                if (vehicle.brand === selectedBrand)
                  return <CarItem
                            key={index}
                            brand={vehicle.brand}
                            model={vehicle.model}
                            price={vehicle.price}
                            isSelected={vehicle.is_selected}
                            onClick={()=>item_click_handler(vehicle)}
                          />
              })
            }
          </div>
        </div>
        <div className={styles.purchase_frame}>
          <div className={styles.selected_car_price}>
            <p className={styles.selected_car_price_number}>{filterListVehicles && filterListVehicles.filter(item=>item.is_selected)[0]?.price.toLocaleString('en-US')}</p>
            <p className={styles.selected_car_price_currency}>$</p>
          </div>
          <button className={styles.btn_purchase} onClick={()=>setIsConfirmationModalOpen(true)}>Купить</button>
        </div>
      </div>
    </>
  )
}

export default Autosalon
