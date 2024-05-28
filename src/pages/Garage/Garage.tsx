// react, styles, router
import React from 'react'
import styles from './Garage.module.scss'
import { Link } from 'react-router-dom'
// components
import { Header } from '@components/Header'
import { ActionButton } from '@components/ActionButton'
import { StylingBar } from './components/StylingBar'
// svg
import SvgArrowToLeft from '@svg/ui/arrow_toleft.svg?react'
import SvgMaxspeed from '@svg/car_specs/maxspeed.svg?react'
import SvgAcceleration from '@svg/car_specs/acceleration.svg?react'
import SvgControl from '@svg/car_specs/control.svg?react'
import SvgDollar from '@svg/ui/dollar.svg?react'
// utils
import { Capitalize, ThousandComma } from '@utils/utils'
import { degToRad } from 'three/src/math/MathUtils'
// api, models
import { api } from '@api/api'
import { IPlayerCar } from '@models/cars/IPlayerCar'
import IDemonstrativeBodyparts from '@models/styling/IDemonstrativeBodyparts'
// mobx, stores
import { observer } from 'mobx-react-lite'
import storeStyling from '@stores/storeStyling'
import storeGarage from '@stores/storeGarage'
import storePlayer from '@stores/storePlayer'
// three, r3f
import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import { Stats, OrbitControls, Html, useTexture } from '@react-three/drei'
// 3dtsx
import StylingGarage from '@3dtsx/scenes/StylingGarage'
import AudiA8 from '@3dtsx/cars/audi/A8'
import AudiR8 from '@3dtsx/cars/audi/R8'
import AudiRS6 from '@3dtsx/cars/audi/RS6'
import AudiRS7 from '@3dtsx/cars/audi/RS7'
import AudiS5 from '@3dtsx/cars/audi/S5'
import BentleyBentayga from '@3dtsx/cars/bentley/Bentayga'
import BentleyContinental from '@3dtsx/cars/bentley/Continental'
import { declaredBodypartsData as AudiRS6_declaredBodypartsData } from '@3dtsx/cars/audi/RS6'
import { declaredBodypartsData as AudiS5_declaredBodypartsData } from '@3dtsx/cars/audi/S5'
import { declaredBodypartsData as BentleyBentayga_declaredBodypartsData } from '@3dtsx/cars/bentley/Bentayga'
import { declaredBodypartsData as BentleyContinental_declaredBodypartsData } from '@3dtsx/cars/bentley/Continental'
// exotic
import { CameraMovementExotic } from '@exotic/CameraMovementExotic'
import { EnvExotic } from '@exotic/EnvExotic'
import { EffectsExotic } from '@exotic/EffectsExotic'

import { useLoader } from '@react-three/fiber'
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import axios from 'axios'

// import { DRACOLoader } from 'three/examples/jsm/libs/draco/gltf'

function base64ToArrayBuffer(base64: string) {
  var binaryString = atob(base64)
  var bytes = new Uint8Array(binaryString.length)
  for (var i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i)
  }
  return bytes.buffer
}

function Garage() {
  const user_id = 230990098 // get from local storage

  const [isStyling, setIsStyling] = React.useState(false)
  const [maxSlots, setMaxSlots] = React.useState(3)
  const [playerCars, setPlayerCars] = React.useState<IPlayerCar[]>([])

  const [gltf, set] = React.useState<GLTF>()

  React.useEffect(() => {
    const url = 'http://localhost:3001/api/3d/glb/vehicles/audi_s5'

    const loader = new GLTFLoader()
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath('../node_modules/three/examples/jsm/libs/draco/gltf/')
    loader.setDRACOLoader(dracoLoader)

    axios.get(url).then((res) => {
      console.log(`res.data: ${res.data}`)
      loader.parse(base64ToArrayBuffer(res.data), '', (gltf: GLTF) => {
        console.log(gltf)

        const materials = []
        const nodes = []

        gltf.scene.traverse((child: THREE.Object3D) => {
          if (child instanceof THREE.Mesh) {
            materials.push(child.material)
            nodes.push(child)
          }
        })

        console.log(materials)
        console.log(nodes)
      })
    })
  }, [])

  React.useEffect(() => {
    // получение максимального количества слотов в гараже
    api.get<number>(`/cars/garage_slots/${user_id}`).then((res) => {
      setMaxSlots(res.data)
    })

    // получение автомобилей игрока из базы
    api.get<IPlayerCar[]>(`/cars/playerCars/${user_id}`).then((res) => {
      setPlayerCars(res.data)
      storeGarage.setSlot(1)
    })

    // set player money to store-state
    api.get<number>(`/main/money/${user_id}`).then((res) => {
      storePlayer.setMoney(res.data)
    })
  }, [])

  const update_declared_bodyparts_data = async () => {
    if (playerCars[storeGarage.slot - 1]?.id === 403) storeStyling.setDeclaredBodypartsData(AudiRS6_declaredBodypartsData)
    else if (playerCars[storeGarage.slot - 1]?.id === 405) storeStyling.setDeclaredBodypartsData(AudiS5_declaredBodypartsData)
    else if (playerCars[storeGarage.slot - 1]?.id === 406) storeStyling.setDeclaredBodypartsData(BentleyBentayga_declaredBodypartsData)
    else if (playerCars[storeGarage.slot - 1]?.id === 407) storeStyling.setDeclaredBodypartsData(BentleyContinental_declaredBodypartsData)
  }

  // duplicate in StylingBar.tsx
  const set_real_demonstrative_bodyparts = async () => {
    const demonstrativeBodyparts = (await api.get<IDemonstrativeBodyparts>(`/cars/stylingBodyparts/${user_id}/${storeGarage.slot}`)).data
    storeStyling.setDemonstrativeBodyparts(demonstrativeBodyparts)
  }

  React.useEffect(() => {
    update_declared_bodyparts_data()
    set_real_demonstrative_bodyparts()
  }, [storeGarage.slot])

  React.useEffect(() => {
    if (isStyling) {
      update_declared_bodyparts_data()
      set_real_demonstrative_bodyparts()
    }
  }, [isStyling])

  function enableStylingHandler() {
    setIsStyling(true)
    storeStyling.setLocationBodyparts('')
  }

  async function btn_sell_click_handler() {
    const url = '/cars/sell'
    const data = { user_id: user_id, slot: storeGarage.slot }
    const res = (await api.post(url, data)).data
    const res_code = res['code']
    const res_text = res['text']
    const player_cars = res['player_cars']
    const alert_text = `Code: ${res_code}\nText: ${res_text}`
    alert(alert_text)
    setPlayerCars(player_cars)
    storeGarage.setSlot(1)
  }

  function slot_prev_handler() {
    if (storeGarage.slot > 1) storeGarage.setSlot(storeGarage.slot - 1)
  }
  function slot_next_handler() {
    if (storeGarage.slot < playerCars.length) storeGarage.setSlot(storeGarage.slot + 1)
  }

  return (
    <>
      <div className={styles.container}>
        <Header bg_color='#161616' />
        <Canvas
          shadows
          onCreated={(state) => {
            state.gl.shadowMap.enabled = true
            state.gl.shadowMap.type = THREE.PCFSoftShadowMap
            state.gl.outputColorSpace = THREE.SRGBColorSpace
          }}
        >
          <Stats />
          <EffectsExotic />
          <EnvExotic intensity={0.25} path='assets/3d/hdri/metro_vijzelgracht_1k.hdr' />
          {/* <CameraMovementExotic /> */}
          <OrbitControls />

          <StylingGarage />

          {playerCars[storeGarage.slot - 1]?.id === 401 && <AudiA8 />}
          {playerCars[storeGarage.slot - 1]?.id === 402 && <AudiR8 />}
          {playerCars[storeGarage.slot - 1]?.id === 403 && <AudiRS6 position={[0, 0.92, 0]} rotation={[degToRad(0), degToRad(-135), degToRad(0)]} />}
          {playerCars[storeGarage.slot - 1]?.id === 404 && <AudiRS7 />}
          {playerCars[storeGarage.slot - 1]?.id === 405 && <AudiS5 position={[0, 0.7, 0]} rotation={[degToRad(0), degToRad(-135), degToRad(0)]} />}
          {playerCars[storeGarage.slot - 1]?.id === 406 && <BentleyBentayga position={[0, 0.83, 0]} rotation={[degToRad(0), degToRad(-135), degToRad(0)]} />}
          {playerCars[storeGarage.slot - 1]?.id === 407 && <BentleyContinental position={[0, 0, 0]} rotation={[degToRad(0), degToRad(-135), degToRad(0)]} />}
        </Canvas>

        {/* no cars */}
        {playerCars.length < 1 && (
          <div className={styles.no_cars_frame}>
            <p className={styles.no_cars_text}>
              В вашем гараже нет автомобилей. <br /> Посетите <Link to={'/autosalon'}>Автосалон</Link>.
            </p>
          </div>
        )}

        <div className={styles.frame_player_money}>
          <SvgDollar className={styles.player_money_icon} />
          <p className={styles.player_money_text}>{ThousandComma(storePlayer.money)}$</p>
        </div>

        {/* car common info */}
        {playerCars.length >= 1 && !isStyling && (
          <div className={styles.general_frame}>
            <div className={styles.tabs_frame}>
              <div className={styles.slots_frame}>
                <div onClick={slot_prev_handler} className={styles.slots_button}>
                  <SvgArrowToLeft />
                </div>
                <div className={styles.slots_info}>
                  <p className={styles.slots_info_text}>
                    Слот {storeGarage.slot}/{playerCars.length}
                  </p>
                  {maxSlots - playerCars.length > 0 ? (
                    <p className={styles.slots_available}> Доступно еще {maxSlots - playerCars.length} слотов </p>
                  ) : (
                    <p className={styles.slots_available}>Нет доступных слотов</p>
                  )}
                </div>
                <div onClick={slot_next_handler} className={styles.slots_button}>
                  <SvgArrowToLeft style={{ transform: 'rotateZ(180deg)' }} />
                </div>
              </div>
              {/* <div className={styles.all_tabs_frame}>

              </div> */}
            </div>

            <div className={styles.common_frame}>
              <div className={styles.common_general}>
                <div className={styles.common_car_info_frame}>
                  <div className={styles.common_car_info_top}>
                    <div className={styles.tag_brand_frame}>
                      <p className={styles.tag_brand_name}>{playerCars[storeGarage.slot - 1].brand.toUpperCase()}</p>
                    </div>
                    <h2 className={styles.car_name}>{Capitalize(playerCars[storeGarage.slot - 1].model_name)}</h2>
                  </div>
                  {/* Короткое описание автомобиля в несколько коротких строчек около трех рядов */}
                  <p className={styles.car_description}>{playerCars[storeGarage.slot - 1].description}</p>
                </div>
                <div className={styles.common_car_specs_frame}>
                  <div className={styles.spec_frame}>
                    <SvgMaxspeed fill='#636363' />
                    <p className={styles.spec_text}>
                      Скорость <span>{playerCars[storeGarage.slot - 1].specifications.maxspeed} км/ч</span>{' '}
                    </p>
                  </div>
                  <div className={styles.spec_frame}>
                    <SvgAcceleration fill='#636363' />
                    <p className={styles.spec_text}>
                      Разгон <span>{playerCars[storeGarage.slot - 1].specifications.acceleration} сек/100 км</span>{' '}
                    </p>
                  </div>
                  <div className={styles.spec_frame}>
                    <SvgControl fill='#636363' />
                    <p className={styles.spec_text}>
                      Управление <span>{playerCars[storeGarage.slot - 1].specifications.control}/10</span>{' '}
                    </p>
                  </div>
                </div>
              </div>
              <div className={styles.common_actions}>
                <ActionButton bgColor='s:#25344B' textColor='#307EF4' text='Стайлинг' textWeight={600} onClick={() => enableStylingHandler()} />
                <ActionButton bgColor='s:#5A1A1E' textColor='#FF2231' text='Продать' textWeight={600} onClick={btn_sell_click_handler} />
              </div>
            </div>
          </div>
        )}

        {/* styling bar */}
        {isStyling && (
          <StylingBar
            onBackClick={() => {
              setIsStyling(false)
              storeStyling.setLocationBodyparts('')
            }}
          />
        )}
      </div>
    </>
  )
}

export default observer(Garage)
