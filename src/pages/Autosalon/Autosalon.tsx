import React, { ChangeEvent } from 'react'
import styles from './Autosalon.module.css'
// images
import bg from './images/bg.jpg'
import keys_help from './images/keys_help.png'
import Search from './images/search.svg?react'
import ArrowDown from './images/arrow_down.svg?react'
import PNGLoading from './images/loading.png'
// components
import { Item } from './components/Item'
import { BrandItem } from './components/BrandItem'
// misc
import wuzzy from 'wuzzy'
import { useDebounce } from 'use-debounce'


const brands = [
  'nissan',
  'mercedes',
  'ford',
  'porsche',
  'bmw',
  'mazda',
  'koenigsegg',
  'subaru',
  'toyota',
  'lada',
  'dodge',
  'mitsubishi',
  'volkswagen',
]

const game_cars = [
  {
    brand: 'nissan',
    model: 'skyline gt-r r34'
  },
  {
    brand: 'nissan',
    model: 'skyline gt-r r35'
  },
  {
    brand: 'dodge',
    model: 'charger'
  },
  {
    brand: 'dodge',
    model: 'demon'
  },
  {
    brand: 'bmw',
    model: 'm5 f90'
  },
  {
    brand: 'bmw',
    model: 'm3 gtr'
  },
  {
    brand: 'mercedes-benz',
    model: 'amg gt'
  },
  {
    brand: 'mitsubishi',
    model: 'evo 9'
  },
  {
    brand: 'mitsubishi',
    model: 'evo 10'
  },
  {
    brand: 'ford',
    model: 'mustang'
  },
  {
    brand: 'mazda',
    model: 'rx-7'
  },
]


function Autosalon() {
  // vars
  const cars_count: number = 14

  // states
  const [brand, setBrand] = React.useState<string>('nissan')
  const [isBrandsOpened, setIsBrandsOpened] = React.useState<boolean>(false)
  const [hoveredId, setHoveredId] = React.useState<number>(1)
  const [selectedId, setSelectedId] = React.useState<number>(1)
  const [searchText, setSearchText] = React.useState<string>('')
  const [searchTextDebounced] = useDebounce(searchText, 1000)
  const [searchMatchCars, setSearchMatchCars] = React.useState<any[] | undefined>([])

  // handlers
  const item_click_handler = (item_id: number) => {
    setSelectedId(item_id)
  }
  const brands_opened_handler = () => {
    setIsBrandsOpened(!isBrandsOpened)
  }
  const brand_item_click_handler = (brand: string) => {
    setBrand(brand.charAt(0).toUpperCase() + brand.slice(1))
    setIsBrandsOpened(false)
  }
  const search_input_change_handler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.currentTarget.value)
  }

  // refs
  const ref_list_items = React.useRef<HTMLDivElement>(null!)
  const ref_list_brands_container = React.useRef<HTMLDivElement>(null!)

  // effects
  React.useEffect(()=>{
    
    const keydown_func = (e) => {
      if (e.key == 'ArrowUp') setHoveredId(prev=>prev-1)
      if (e.key == 'ArrowDown') setHoveredId(prev=>prev+1)
      if (e.key == 'Enter') {
        setSelectedId(hoveredId)
      }
    }

    document.addEventListener('keydown', keydown_func)    
    return () => document.removeEventListener('keydown', keydown_func)
  })

  React.useEffect(()=>{
    setHoveredId(selectedId)
  }, [selectedId])

  React.useEffect(()=>{
    if (hoveredId <= 1) setHoveredId(1)
    if (hoveredId >= cars_count) setHoveredId(cars_count)
  }, [hoveredId])

  React.useEffect(()=>{
    if (isBrandsOpened) {
      ref_list_brands_container.current.style.height = '250px'
    }
    else {
      ref_list_brands_container.current.style.height = '60px'
    }
  }, [isBrandsOpened])

  // effect: debounce search
  React.useEffect(()=>{
    const match_cars = game_cars.filter(car=>wuzzy.levenshtein(searchTextDebounced, car.brand + ' ' + car.model) >= .235)
    
    if (match_cars.length !== 0) {
      setSearchMatchCars(match_cars)
    }
    else {
      setSearchMatchCars(undefined)
    }
    
  }, [searchTextDebounced])

  React.useEffect(()=>{
    setSearchMatchCars([])
  }, [searchText])


  return (
    <div className={styles.page} style={{backgroundImage: 'url('+bg+')'}}>
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
                searchMatchCars?.map(car=><Item brand={car.brand} model={car.model} price={1_350_000} isHovered={hoveredId===0} isSelected={selectedId===0} onClick={()=>item_click_handler(1)}/>)
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
            <p className={styles.list_brand_text}>{brand}</p>
            <ArrowDown fill='white' />
          </div>
          <div className={styles.brand_items_container}>
            <BrandItem brand='Nissan' onClick={()=>{brand_item_click_handler('nissan')}} />
            <BrandItem brand='Mercedes' onClick={()=>{brand_item_click_handler('mercedes')}} />
            <BrandItem brand='Mazda' onClick={()=>{brand_item_click_handler('mazda')}} />
            <BrandItem brand='Volvo' onClick={()=>{brand_item_click_handler('volvo')}} />
            <BrandItem brand='Chevrolet' onClick={()=>{brand_item_click_handler('chevrolet')}} />
            <BrandItem brand='Range Rover' onClick={()=>{brand_item_click_handler('range rover')}} />
            <BrandItem brand='Ford' onClick={()=>{brand_item_click_handler('ford')}} />
            <BrandItem brand='Lada' onClick={()=>{brand_item_click_handler('lada')}} />
            <BrandItem brand='Maserati' onClick={()=>{brand_item_click_handler('maserati')}} />
          </div>
        </div>
        
        <div className={styles.list_items} ref={ref_list_items}>
          <Item brand='Nissan' model='Skyline GT-R R34' price={1_350_000} isHovered={hoveredId===1} isSelected={selectedId===1} onClick={()=>item_click_handler(1)}/>
          <Item brand='Nissan' model='Skyline GT-R R34' price={1_350_000} isHovered={hoveredId===2} isSelected={selectedId===2} onClick={()=>item_click_handler(2)}/>
          <Item brand='Nissan' model='Skyline GT-R R34' price={1_350_000} isHovered={hoveredId===3} isSelected={selectedId===3} onClick={()=>item_click_handler(3)}/>
          <Item brand='Nissan' model='Skyline GT-R R34' price={1_350_000} isHovered={hoveredId===4} isSelected={selectedId===4} onClick={()=>item_click_handler(4)}/>
          <Item brand='Nissan' model='Skyline GT-R R34' price={1_350_000} isHovered={hoveredId===5} isSelected={selectedId===5} onClick={()=>item_click_handler(5)}/>
          <Item brand='Nissan' model='Skyline GT-R R34' price={1_350_000} isHovered={hoveredId===6} isSelected={selectedId===6} onClick={()=>item_click_handler(6)}/>
          <Item brand='Nissan' model='Skyline GT-R R34' price={1_350_000} isHovered={hoveredId===7} isSelected={selectedId===7} onClick={()=>item_click_handler(7)}/>
          <Item brand='Nissan' model='Skyline GT-R R34' price={1_350_000} isHovered={hoveredId===8} isSelected={selectedId===8} onClick={()=>item_click_handler(8)}/>
          <Item brand='Nissan' model='Skyline GT-R R34' price={1_350_000} isHovered={hoveredId===9} isSelected={selectedId===9} onClick={()=>item_click_handler(9)}/>
          <Item brand='Nissan' model='Skyline GT-R R34' price={1_350_000} isHovered={hoveredId===10} isSelected={selectedId===10} onClick={()=>item_click_handler(10)}/>
          <Item brand='Nissan' model='Skyline GT-R R34' price={1_350_000} isHovered={hoveredId===11} isSelected={selectedId===11} onClick={()=>item_click_handler(11)}/>
          <Item brand='Nissan' model='Skyline GT-R R34' price={1_350_000} isHovered={hoveredId===12} isSelected={selectedId===12} onClick={()=>item_click_handler(12)}/>
          <Item brand='Nissan' model='Skyline GT-R R34' price={1_350_000} isHovered={hoveredId===13} isSelected={selectedId===13} onClick={()=>item_click_handler(13)}/>
          <Item brand='Nissan' model='Skyline GT-R R34' price={1_350_000} isHovered={hoveredId===14} isSelected={selectedId===14} onClick={()=>item_click_handler(14)}/>
        </div>

      </div>
      <div className={styles.keys_help}>
        <p className={styles.keys_help_text}>Используйте клавиатуру, для перемещения между автомобилями</p>
        <img src={keys_help} />
      </div>
    </div>
  )
}

export default Autosalon
