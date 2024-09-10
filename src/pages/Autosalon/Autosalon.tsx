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

interface ICar {
  brand: string
  model: string
  price: number
  is_selected: boolean
}

const game_cars: ICar[] = [
  {
    brand: 'BMW',
    model: 'M5 F90',
    price: 1_350_000,
    is_selected: true,
  },
  {
    brand: 'Dodge',
    model: 'Charger',
    price: 1_350_000,
    is_selected: false,
  },
  {
    brand: 'Dodge',
    model: 'Demon',
    price: 1_350_000,
    is_selected: false,
  },
  {
    brand: 'Mazda',
    model: 'RX-7',
    price: 1_350_000,
    is_selected: false,
  },
  {
    brand: 'Mercedes-Benz',
    model: 'AMG GT',
    price: 1_350_000,
    is_selected: false,
  },
  {
    brand: 'Mitsubishi',
    model: 'Evo 9',
    price: 1_350_000,
    is_selected: false,
  },
  {
    brand: 'Nissan',
    model: 'Skyline GT-R R34',
    price: 1_350_000,
    is_selected: false,
  },
  {
    brand: 'Porsche',
    model: '911 Turbo S',
    price: 1_350_000,
    is_selected: false,
  },
  {
    brand: 'Toyota',
    model: 'Supra MK4',
    price: 1_350_000,
    is_selected: false,
  },
  {
    brand: 'Volkswagen',
    model: 'Golf',
    price: 1_350_000,
    is_selected: false,
  },
]

function Autosalon() {
  // vars
  //

  // states
  const [selectedBrand, setSelectedBrand] = React.useState<string>('BMW') // Nissan
  const [isBrandsOpened, setIsBrandsOpened] = React.useState<boolean>(false)
  const [searchText, setSearchText] = React.useState<string>('')
  const [searchTextDebounced] = useDebounce(searchText, 1000)
  const [searchMatchCars, setSearchMatchCars] = React.useState<any[] | undefined>([])
  const [filterListCars, setFilterListCars] = React.useState<ICar[]>(game_cars.filter(car=>car.brand==='BMW')) // cars by brand 'BMW'
  const [displayedCar, setDisplayedCar] = React.useState<ICar>(game_cars[0])

  // functions
  //

  // handlers
  const item_click_handler = (clickedCar: ICar) => {
    // reset 'is_selected' prop to 'false' for all filtered items AND...
    // select item by clickedCarItem
    const newFilterListCars = filterListCars.map(car=>{
      if (car === clickedCar) car.is_selected = true
      else car.is_selected = false
      return car
    })

    setFilterListCars(newFilterListCars)
  }

  const brands_opened_handler = () => {
    setIsBrandsOpened(!isBrandsOpened)
  }

  const brand_item_click_handler = (clickedBrand: string) => {
    setSelectedBrand(clickedBrand)
    setIsBrandsOpened(false)
    
    // filter cars (items) in list + select first item
    const filterListCars: ICar[] = game_cars.filter(item=>item.brand === clickedBrand)
    filterListCars[0].is_selected = true
    setFilterListCars(filterListCars)
  }

  const search_input_change_handler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.currentTarget.value)
  }

  const search_item_click_handler = (car_brand: string, car_model: string) => {
    
    // hide search window
    setSearchText('')
    // set brand state
    setSelectedBrand(car_brand)
    setIsBrandsOpened(false)
    // display car items by brand + select for found item
    let carsByBrand: ICar[] = game_cars.filter(item=>item.brand === car_brand)
    carsByBrand = carsByBrand.map(car=>{
      if (car.model === car_model) car.is_selected = true
      else car.is_selected = false
      return car
    })
    setFilterListCars(carsByBrand)
  }

  // refs
  const ref_list_items = React.useRef<HTMLDivElement>(null!)
  const ref_list_brands_container = React.useRef<HTMLDivElement>(null!)

  // effects

  React.useEffect(()=>{
    
    // set Displayed Car
    const newDisplayedCar = filterListCars.filter(car=>car.is_selected)[0]
    setDisplayedCar(newDisplayedCar)

  }, [filterListCars])

  React.useEffect(()=>{
    if (isBrandsOpened) ref_list_brands_container.current.style.height = '250px'
    else ref_list_brands_container.current.style.height = '60px'
  }, [isBrandsOpened])

  // effect: debounce search
  React.useEffect(()=>{
    const match_cars = game_cars.filter(car=>wuzzy.levenshtein(searchTextDebounced.toLowerCase(), car.brand.toLowerCase() + ' ' + car.model.toLowerCase()) >= .235)
    if (match_cars.length !== 0) setSearchMatchCars(match_cars)
    else setSearchMatchCars(undefined)
  }, [searchTextDebounced])

  React.useEffect(()=>{
    setSearchMatchCars([])
  }, [searchText])

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

          { displayedCar.brand.toLowerCase() === 'bmw' && displayedCar.model.toLowerCase() === 'm5 f90' && <BMWM5F90 /> }
          { displayedCar.brand.toLowerCase() === 'dodge' && displayedCar.model.toLowerCase() === 'charger' && <DodgeCharger /> }
          { displayedCar.brand.toLowerCase() === 'dodge' && displayedCar.model.toLowerCase() === 'demon' && <DodgeDemon /> }
          { displayedCar.brand.toLowerCase() === 'mazda' && displayedCar.model.toLowerCase() === 'rx-7' && <MazdaRX7 /> }
          { displayedCar.brand.toLowerCase() === 'mercedes-benz' && displayedCar.model.toLowerCase() === 'amg gt' && <MercedesBenzAMGGT /> }
          { displayedCar.brand.toLowerCase() === 'mitsubishi' && displayedCar.model.toLowerCase() === 'evo 9' && <MitsubishiEvo9 /> }
          { displayedCar.brand.toLowerCase() === 'nissan' && displayedCar.model.toLowerCase() === 'skyline gt-r r34' && <NissanSkylineGTRR34 /> }
          { displayedCar.brand.toLowerCase() === 'porsche' && displayedCar.model.toLowerCase() === '911 turbo s' && <Porsche911TurboS /> }
          { displayedCar.brand.toLowerCase() === 'toyota' && displayedCar.model.toLowerCase() === 'supra mk4' && <ToyotaSupraMK4 /> }
          { displayedCar.brand.toLowerCase() === 'volkswagen' && displayedCar.model.toLowerCase() === 'golf' && <VolkswagenGolf /> }
          

        </Canvas>
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
                  searchMatchCars?.length > 0
                  ?
                  searchMatchCars?.map(car=><SearchItem brand={car.brand} model={car.model} onClick={()=>search_item_click_handler(car.brand, car.model)}/>)
                  :
                  searchMatchCars === undefined
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
              { all_brand_items.map((brand)=> <BrandItem brand={brand} onClick={()=>{brand_item_click_handler(brand)}} /> ) }
            </div>
          </div>
          
          <div className={styles.list_items} ref={ref_list_items}>
            {
              filterListCars.map(car=>{
                if (car.brand === selectedBrand)
                  return <CarItem
                            brand={car.brand}
                            model={car.model}
                            price={car.price}
                            isSelected={car.is_selected}
                            onClick={()=>item_click_handler(car)}
                          />
              })
            }
          </div>
        </div>
        <div className={styles.purchase_frame}>
          <div className={styles.selected_car_price}>
            <p className={styles.selected_car_price_number}>{filterListCars.filter(item=>item.is_selected)[0].price.toLocaleString('en-US')}</p>
            <p className={styles.selected_car_price_currency}>$</p>
          </div>
          <button className={styles.btn_purchase}>Купить</button>
        </div>
      </div>
    </>
  )
}

export default Autosalon
