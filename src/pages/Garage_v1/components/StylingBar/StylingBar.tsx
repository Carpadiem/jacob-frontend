// react, styles, router
import React from 'react'
import styles from './StylingBar.module.scss'
// components
import { ActionButton } from '@components/ActionButton'
// utils
import { ThousandComma } from '@utils/utils'
// api, models
import { api } from '@api/api'
import IDeclaredBodypart from '@models/styling/IDeclaredBodypartData'
import IDemonstrativeBodyparts from '@models/styling/IDemonstrativeBodyparts'
// mobx, stores
import { observer } from 'mobx-react-lite'
import storeStyling from '@stores/legacy/storeStyling'
import storePlayer from '@stores/legacy/storePlayer'
import storeGarage from '@stores/legacy/storeGarage'

interface TabProps {
  text: string
  isActive?: boolean
  isPrevious?: boolean
  onClick?: () => void
  isEnable?: boolean
}
const Tab = ({ text, isActive = false, isPrevious = false, onClick, isEnable = true }: TabProps) => {
  const [styleClasses, setStyleClasses] = React.useState<string>()
  React.useEffect(() => {
    const list = [styles.tab]
    if (isActive) list.push(styles.tab_active)
    if (isPrevious) list.push(styles.tab_previous)
    setStyleClasses(list.join(' '))
  })

  const disableStyle = {
    pointerEvents: 'none',
  } as React.CSSProperties

  return (
    <>
      <div
        className={styleClasses}
        onClick={isEnable ? onClick : () => {}}
        style={isEnable ? {} : ({ pointerEvents: 'none', color: '#4c4c4c', textDecoration: 'line-through' } as React.CSSProperties)}
      >
        {text}
      </div>
    </>
  )
}

interface TileProps {
  id: number
  title: string
  price: number
  onClick: () => void
  isActive?: boolean
}
const Tile = ({ id, title, price, onClick, isActive = false }: TileProps) => {
  const [styleClasses, setStyleClasses] = React.useState<string>('')
  React.useEffect(() => {
    const styles_group = [styles.tile]
    if (isActive) styles_group.push(styles.tile_active)
    setStyleClasses(styles_group.join(' '))
  })
  return (
    <>
      <div className={styleClasses} onClick={onClick}>
        {/* <p className={styles.tile_id}>#{id}</p> */}
        <p className={styles.tile_title}>{title}</p>
        <p className={styles.tile_price}>${ThousandComma(price)}</p>
      </div>
    </>
  )
}

interface StylingBarProps {
  onBackClick: () => void
}
const StylingBar = ({ onBackClick }: StylingBarProps) => {
  const user_id = 230990098

  function tileClickHandler(bodypart: IDeclaredBodypart) {
    storeStyling.setSelectedBodypart(bodypart)
    if (storeStyling.locationBodyparts === 'bumpers_front') storeStyling.setBumperFrontId(bodypart.id)
    if (storeStyling.locationBodyparts === 'bumpers_rear') storeStyling.setBumperRearId(bodypart.id)
    if (storeStyling.locationBodyparts === 'skirts') storeStyling.setSkirtsId(bodypart.id)
    if (storeStyling.locationBodyparts === 'bonnets') storeStyling.setBonnetId(bodypart.id)
    if (storeStyling.locationBodyparts === 'spoilers') storeStyling.setSpoilerId(bodypart.id)
    if (storeStyling.locationBodyparts === 'splitters') storeStyling.setSplitterId(bodypart.id)
    if (storeStyling.locationBodyparts === 'diffusers') storeStyling.setDiffuserId(bodypart.id)
    if (storeStyling.locationBodyparts === 'canards') storeStyling.setCanardsId(bodypart.id)
    if (storeStyling.locationBodyparts === 'wings_front') storeStyling.setWingsFrontId(bodypart.id)
    if (storeStyling.locationBodyparts === 'wings_rear') storeStyling.setWingsRearId(bodypart.id)
    if (storeStyling.locationBodyparts === 'exhausts') storeStyling.setExhaustId(bodypart.id)
  }

  // duplicate in Garage.tsx
  const set_real_demonstrative_bodyparts = async () => {
    const demonstrativeBodyparts = (await api.get<IDemonstrativeBodyparts>(`/cars/stylingBodyparts/${user_id}/${storeGarage.slot}`)).data
    storeStyling.setDemonstrativeBodyparts(demonstrativeBodyparts)
  }

  React.useEffect(() => {
    if (storeStyling.locationBodyparts === 'bodyshell') {
      set_real_demonstrative_bodyparts()
    } else {
      const firstBodypart: IDeclaredBodypart = storeStyling.declaredBodypartsData.filter(
        (item) => item.from_category === storeStyling.locationBodyparts && item.id === 1
      )[0]
      storeStyling.setSelectedBodypart(firstBodypart)
      try {
        tileClickHandler(firstBodypart) // trigger imitation click on tile
      } catch {}
    }
  }, [storeStyling.locationBodyparts])

  async function bodypart_purchase_click_handler() {
    // проверить: хватает ли денег у игрока на покупку кузовной запчасти
    const player_money = (await api.get<number>(`/main/money/${user_id}`)).data
    if (player_money < storeStyling.selectedBodypart.price) {
      alert('Не хватает денег')
    }

    const from_category = storeStyling.selectedBodypart.from_category
    let category_translated = ''
    if (from_category === 'bumpers_front') category_translated = 'bumper_front_id'
    else if (from_category === 'bumpers_rear') category_translated = 'bumper_rear_id'
    else if (from_category === 'skirts') category_translated = 'skirts_id'
    else if (from_category === 'bonnets') category_translated = 'bonnet_id'
    else if (from_category === 'spoilers') category_translated = 'spoiler_id'
    else if (from_category === 'splitters') category_translated = 'splitter_id'
    else if (from_category === 'diffusers') category_translated = 'diffuser_id'
    else if (from_category === 'canards') category_translated = 'canards_id'
    else if (from_category === 'wings_front') category_translated = 'wings_front_id'
    else if (from_category === 'wings_rear') category_translated = 'wings_rear_id'
    else if (from_category === 'exhausts') category_translated = 'exhaust_id'

    const data = {
      user_id: user_id,
      slot: storeGarage.slot,
      bodypartCategory: category_translated,
      bodypartId: storeStyling.selectedBodypart.id,
      bodypartPrice: storeStyling.selectedBodypart.price,
    }
    const res = (await api.post('/cars/purchaseStylingBodypart', data)).data
    const res_code = res['code']
    const res_text = res['text']
    const alert_text = `Code: ${res_code}\nText: ${res_text}`
    alert(alert_text)

    storePlayer.setMoney(storePlayer.money - storeStyling.selectedBodypart.price)
  }

  return (
    <>
      <div className={styles.general_container}>
        <div className={styles.tabs_frame}>
          <Tab text='Назад в гараж' onClick={onBackClick} />

          {storeStyling.locationBodyparts === '' && (
            <>
              <Tab text='Стайлинг' isActive onClick={() => storeStyling.setLocationBodyparts('')} />
              <Tab text='Кузов' onClick={() => storeStyling.setLocationBodyparts('bodyshell')} />
              <Tab isEnable={false} text='Графика' onClick={() => storeStyling.setLocationBodyparts('graphics')} />
              <Tab isEnable={false} text='Аксессууары' onClick={() => storeStyling.setLocationBodyparts('accessories')} />
              <Tab isEnable={false} text='Колеса' onClick={() => storeStyling.setLocationBodyparts('wheels')} />
            </>
          )}

          {storeStyling.locationBodyparts === 'bodyshell' && (
            <>
              <Tab text='Стайлинг' isPrevious onClick={() => storeStyling.setLocationBodyparts('')} />
              <Tab text='Кузов' isActive />
              <Tab text='Передние бамперы' onClick={() => storeStyling.setLocationBodyparts('bumpers_front')} />
              <Tab text='Задние бамперы' onClick={() => storeStyling.setLocationBodyparts('bumpers_rear')} />
              <Tab text='Боковые юбки' onClick={() => storeStyling.setLocationBodyparts('skirts')} />
              <Tab text='Капоты' onClick={() => storeStyling.setLocationBodyparts('bonnets')} />
              <Tab text='Спойлеры' onClick={() => storeStyling.setLocationBodyparts('spoilers')} />
              <Tab text='Сплиттеры' onClick={() => storeStyling.setLocationBodyparts('splitters')} />
              <Tab text='Диффузоры' onClick={() => storeStyling.setLocationBodyparts('diffusers')} />
              <Tab text='Канарды' onClick={() => storeStyling.setLocationBodyparts('canards')} />
              <Tab text='Передние крылья' onClick={() => storeStyling.setLocationBodyparts('wings_front')} />
              <Tab text='Задние крылья' onClick={() => storeStyling.setLocationBodyparts('wings_rear')} />
              <Tab text='Выхлопные трубы' onClick={() => storeStyling.setLocationBodyparts('exhausts')} />
            </>
          )}
          {storeStyling.locationBodyparts === 'bumpers_front' && (
            <>
              <Tab text='Кузов' isPrevious onClick={() => storeStyling.setLocationBodyparts('bodyshell')} />
              <Tab text='Передние бамперы' isActive />
            </>
          )}
          {storeStyling.locationBodyparts === 'bumpers_rear' && (
            <>
              <Tab text='Кузов' isPrevious onClick={() => storeStyling.setLocationBodyparts('bodyshell')} />
              <Tab text='Задние бамперы' isActive />
            </>
          )}
          {storeStyling.locationBodyparts === 'skirts' && (
            <>
              <Tab text='Кузов' isPrevious onClick={() => storeStyling.setLocationBodyparts('bodyshell')} />
              <Tab text='Боковые юбки' isActive />
            </>
          )}
          {storeStyling.locationBodyparts === 'bonnets' && (
            <>
              <Tab text='Кузов' isPrevious onClick={() => storeStyling.setLocationBodyparts('bodyshell')} />
              <Tab text='Капоты' isActive />
            </>
          )}
          {storeStyling.locationBodyparts === 'spoilers' && (
            <>
              <Tab text='Кузов' isPrevious onClick={() => storeStyling.setLocationBodyparts('bodyshell')} />
              <Tab text='Спойлеры' isActive />
            </>
          )}
          {storeStyling.locationBodyparts === 'splitters' && (
            <>
              <Tab text='Кузов' isPrevious onClick={() => storeStyling.setLocationBodyparts('bodyshell')} />
              <Tab text='Сплиттеры' isActive />
            </>
          )}
          {storeStyling.locationBodyparts === 'diffusers' && (
            <>
              <Tab text='Кузов' isPrevious onClick={() => storeStyling.setLocationBodyparts('bodyshell')} />
              <Tab text='Дуффузоры' isActive />
            </>
          )}
          {storeStyling.locationBodyparts === 'canards' && (
            <>
              <Tab text='Кузов' isPrevious onClick={() => storeStyling.setLocationBodyparts('bodyshell')} />
              <Tab text='Канарды' isActive />
            </>
          )}
          {storeStyling.locationBodyparts === 'wings_front' && (
            <>
              <Tab text='Кузов' isPrevious onClick={() => storeStyling.setLocationBodyparts('bodyshell')} />
              <Tab text='Передние крылья' isActive />
            </>
          )}
          {storeStyling.locationBodyparts === 'wings_rear' && (
            <>
              <Tab text='Кузов' isPrevious onClick={() => storeStyling.setLocationBodyparts('bodyshell')} />
              <Tab text='Задние крылья' isActive />
            </>
          )}
          {storeStyling.locationBodyparts === 'exhausts' && (
            <>
              <Tab text='Кузов' isPrevious onClick={() => storeStyling.setLocationBodyparts('bodyshell')} />
              <Tab text='Выхлопные трубы' isActive />
            </>
          )}
        </div>

        {(storeStyling.locationBodyparts === '' || storeStyling.locationBodyparts === 'bodyshell') && (
          <div className={styles.movement_filler}>
            {/* <SVG_NavArrow fill='#7D7D7D' /> */}
            <img src='assets/ui/arrow_cursor.svg' alt='' />
            <p className={styles.movement_filler_text}>Передвигайтесь по вкладкам наверху, чтобы выбрать категорию стайлинга</p>
          </div>
        )}

        {(storeStyling.locationBodyparts === 'bumpers_front' ||
          storeStyling.locationBodyparts === 'bumpers_rear' ||
          storeStyling.locationBodyparts === 'skirts' ||
          storeStyling.locationBodyparts === 'bonnets' ||
          storeStyling.locationBodyparts === 'spoilers' ||
          storeStyling.locationBodyparts === 'splitters' ||
          storeStyling.locationBodyparts === 'diffusers' ||
          storeStyling.locationBodyparts === 'canards' ||
          storeStyling.locationBodyparts === 'wings_front' ||
          storeStyling.locationBodyparts === 'wings_rear' ||
          storeStyling.locationBodyparts === 'exhausts') && (
          <>
            {storeStyling.declaredBodypartsData.filter((bodypartData) => bodypartData.from_category === storeStyling.locationBodyparts).length !== 0 ? (
              <div className={styles.workspace_frame}>
                <div className={styles.tiles_frame}>
                  {storeStyling.declaredBodypartsData.map(
                    (bodypartData) =>
                      bodypartData.from_category === storeStyling.locationBodyparts && (
                        <Tile
                          key={bodypartData.id}
                          id={bodypartData.id}
                          title={bodypartData.name}
                          price={bodypartData.price}
                          onClick={() => tileClickHandler(bodypartData)}
                        />
                      )
                  )}
                </div>
                <div className={styles.purchase_frame}>
                  <h2 className={styles.purchase_title}>{storeStyling.selectedBodypart?.name}</h2>
                  <p className={styles.purchase_price}>${storeStyling.selectedBodypart?.price}</p>
                  <ActionButton
                    text='Приобрести'
                    textColor='#1FE362'
                    bgColor='s:#264E34'
                    textWeight={600}
                    padding={{ v: 16, h: 32 }}
                    onClick={bodypart_purchase_click_handler}
                  />
                </div>
              </div>
            ) : (
              <div className={styles.workspace_no_details_frame}>
                <p className={styles.no_details_text}>У этого автомобиля нет запчастей этого вида</p>
              </div>
            )}
          </>
        )}
      </div>
    </>
  )
}

export default observer(StylingBar)
