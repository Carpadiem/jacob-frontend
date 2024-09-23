// react, styles, router
import React from 'react'
import styles from './Autosalon.module.scss'
// components
import { Header } from '@components/Header'
import { ActionButton } from '@components/ActionButton'
// svg
import SvgCheckmark from '@svg/ui/checkmark.svg?react'
import SvgDollar from '@svg/ui/dollar.svg?react'
import SvgMaxspeed from '@svg/car_specs/maxspeed.svg?react'
import SvgAcceleration from '@svg/car_specs/acceleration.svg?react'
import SvgControl from '@svg/car_specs/control.svg?react'
// utils
import { ThousandComma, Capitalize } from '@utils/utils'
import { degToRad } from 'three/src/math/MathUtils'
// api, models
import { api } from '@api/api'
import { ICar } from '@models/cars/ICar'
import { PurchaseCarResponse } from '@api/ResponseModels/PurchaseCarResponse'
// mobx, stores
import { observer } from 'mobx-react-lite'
import storePlayer from '@stores/legacy/storePlayer'
import storeStyling from '@stores/legacy/storeStyling'
// three, r3f
import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
// 3dtsx
import Autosalone from '@3d/scenes/Autosalon'
import AudiA8 from '@3d/cars/Audi_a8'
import AudiR8 from '@3d/cars/Audi_r8'
import BmwM5F90 from '@3d/cars/BMWM5F90'
// exotic
import { EnvExotic } from '@exotic/EnvExotic'
import { EffectsExotic } from '@exotic/EffectsExotic'

const brands = ['audi', 'bentley']

function Autosalon() {
  const [gameCars, setGameCars] = React.useState<ICar[]>([])
  const [activeCar, setActiveCar] = React.useState<ICar>(null!)
  const [activeBrand, setActiveBrand] = React.useState('audi')

  React.useEffect(() => {
    const user_id = 230990098

    // set game cars
    api.get<ICar[]>('/cars/game_cars').then((res) => {
      setGameCars(res.data)
      setActiveCar(res.data[0])
    })

    // set player money (store)
    api.get<number>(`/main/money/${user_id}`).then((res) => {
      storePlayer.setMoney(res.data)
    })

    // set default demonstrativeStyling
    storeStyling.setDemonstrativeBodyparts({
      bumper_front_id: 1,
      bumper_rear_id: 1,
      skirts_id: 1,
      bonnet_id: 1,
      spoiler_id: 1,
      splitter_id: 1,
      diffuser_id: 1,
      canards_id: 1,
      wings_front_id: 1,
      wings_rear_id: 1,
      exhaust_id: 1,
    })
  }, [])

  async function purchase_click_handler() {
    const url = '/cars/purchase'
    const data = { user_id: 230990098, car_id: activeCar.id }
    const res = (await api.post<PurchaseCarResponse>(url, data)).data
    const res_code = res['code']
    const res_text = res['text']
    const alert_text = `Code: ${res_code}\nText: ${res_text}`
    alert(alert_text)
    storePlayer.setMoney(storePlayer.money - activeCar.price)
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
          <Perf position='top-left' />
          <EnvExotic intensity={1.3} path='3d/hdri/metro_vijzelgracht_1k.hdr' />
          <EffectsExotic />
          <OrbitControls />
          <Autosalone />
          {activeCar?.id === 401 && <AudiA8 />}
          {activeCar?.id === 402 && <AudiR8 />}
          {activeCar?.id === 403 && <BmwM5F90 />}
        </Canvas>

        <div className={styles.frame_autosalon}>
          <div className={styles.frame_brands}>
            {brands.map((brand_name: string) => {
              return (
                <div key={brand_name} className={styles.brand} style={{ backgroundColor: brand_name === activeBrand ? 'white' : 'transparent' } as React.CSSProperties} onClick={() => setActiveBrand(brand_name)}>
                  <p className={styles.brand_name} style={{ color: brand_name === activeBrand ? '#212121' : '#9B9B9B' } as React.CSSProperties}>
                    {Capitalize(brand_name)}
                  </p>
                </div>
              )
            })}
          </div>

          <div className={styles.general_area}>
            <div className={styles.frame_previews}>
              {gameCars
                .filter((car: ICar) => car.brand === activeBrand)
                .map((car: ICar) => {
                  return (
                    <div key={car.id} className={styles.preview} style={{ backgroundImage: `url(${car.autosalon_preview_image_url})` } as React.CSSProperties} onClick={() => setActiveCar(car)}>
                      <div className={styles.preview_info}>
                        <p className={styles.preview_info_car_name}>{Capitalize(car.model_name)}</p>
                        <p className={styles.preview_info_car_price}>${ThousandComma(car.price)}</p>
                      </div>

                      {car === activeCar && (
                        <div className={styles.label_is_selected}>
                          <SvgCheckmark />
                          <div className={styles.label_is_selected_text}>Выбрано</div>
                        </div>
                      )}
                    </div>
                  )
                })}
            </div>

            <div className={styles.frame_purchase}>
              <div className={styles.purchase_text_wrapper}>
                <p className={styles.purchase_car_name}>{Capitalize(activeCar?.model_name)}</p>
                <p className={styles.purchase_car_price}>${ThousandComma(activeCar?.price)}</p>
              </div>

              <ActionButton bgColor='s:#264E34' text='Приобрести' textColor='#1FE362' textWeight={700} padding={{ v: 16, h: 32 }} onClick={purchase_click_handler} />
            </div>
          </div>
        </div>

        <div className={styles.frame_player_money}>
          <SvgDollar className={styles.player_money_icon} />
          <p className={styles.player_money_text}>{ThousandComma(storePlayer.money)}$</p>
        </div>
        <div className={styles.frame_car_specs}>
          <h2 className={styles.specs_car_name}>{Capitalize(activeCar?.model_name)}</h2>
          <div className={styles.specs_content_group}>
            <p className={styles.specs_content_group_header}>Характеристики</p>
            <div className={styles.specs_content_group_specifications}>
              <div className={styles.specification}>
                <SvgMaxspeed fill='#FB4040' />
                <p className={styles.specification_text}>
                  <span>Скорость: </span>
                  {activeCar?.specifications.maxspeed} км/ч
                </p>
              </div>
              <div className={styles.specification}>
                <SvgAcceleration fill='#FB4040' />
                <p className={styles.specification_text}>
                  <span>Разгон: </span>
                  {activeCar?.specifications.acceleration} сек/100 км
                </p>
              </div>
              <div className={styles.specification}>
                <SvgControl fill='#FB4040' />
                <p className={styles.specification_text}>
                  <span>Управляемость: </span>
                  {activeCar?.specifications.control}/10
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default observer(Autosalon)
