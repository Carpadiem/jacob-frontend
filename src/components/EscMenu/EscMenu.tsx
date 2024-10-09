import React from 'react'
import styles from './EscMenu.module.css'

import { Head } from './components/Head'
import { Prop } from './components/Prop'
import { MenuButton } from './components/MenuButton'
import { Tab } from './components/Tab'

import { IPropValue } from './models/IPropValue'


const EscMenu = () => {

  // states
  const [menuLevel, setMenuLevel] = React.useState('settings.cameras')

  const [propValues, setPropValues] = React.useState({
    'camera.garage.mode': 'fixed',
    'camera.garage.position': 1,
    'camera.garage.fov': 40,
    'camera.garage.projection': 'perspective',

    'camera.styling.genre': 1,
  })

  // handlers
  const changeCameraGarageModeHandler = (value: IPropValue) => {
    const x = {...propValues}
    x[value.type] = value.value
    setPropValues({...x})
  }

  return (
    <div className={styles.esc_menu_container}>

        <div className={styles.containers_frame}>
            <div className={styles.tabs_container}>
                <Tab onClick={()=>setMenuLevel('settings')} text='Настройки' selected={menuLevel.split('.')[0].includes('settings')} />
                <Tab onClick={()=>setMenuLevel('statistics')} text='Статистика' selected={menuLevel.split('.')[0].includes('statistics')}/>
            </div>
            <div className={styles.two_columns}>
                <div className={styles.column_left}>
                  <MenuButton text='Положение камер' onClick={()=>setMenuLevel('settings.cameras')} />
                  <MenuButton text='Постобработка' onClick={()=>setMenuLevel('settings.postprocessing')} />
                </div>
                <div className={styles.column_right}>

                  {
                    menuLevel === 'settings.cameras' &&
                    <>
                      <Head text='Гараж' />
                      <Prop text='Режим' values={[
                          { id: 1, type: 'camera.garage.mode', value: 'fixed', text: 'Фиксированный', is_selected: propValues['camera.garage.mode'] === 'fixed' },
                          { id: 2, type: 'camera.garage.mode', value: 'free', text: 'Свободный', is_selected: propValues['camera.garage.mode'] === 'free' },
                        ]}
                        onChangeValue={(value: IPropValue)=>changeCameraGarageModeHandler(value)}
                      />
                      <Prop text='Позиция' disabled={propValues['camera.garage.mode']==='free'} values={[
                          { id: 1, type: 'camera.garage.position', value: 1, text: '1', is_selected: propValues['camera.garage.position'] === 1 },
                          { id: 2, type: 'camera.garage.position', value: 2, text: '2', is_selected: propValues['camera.garage.position'] === 2 },
                          { id: 3, type: 'camera.garage.position', value: 3, text: '3', is_selected: propValues['camera.garage.position'] === 3 },
                          { id: 4, type: 'camera.garage.position', value: 4, text: '4', is_selected: propValues['camera.garage.position'] === 4 },
                          { id: 5, type: 'camera.garage.position', value: 5, text: '5', is_selected: propValues['camera.garage.position'] === 5 },
                        ]}
                        onChangeValue={(value: IPropValue)=>changeCameraGarageModeHandler(value)}
                      />
                      <Prop text='Фокусировка' values={[
                          { id: 1, type: 'camera.garage.fov', value: 10, text: '10', is_selected: propValues['camera.garage.fov'] === 10 },
                          { id: 2, type: 'camera.garage.fov', value: 20, text: '20', is_selected: propValues['camera.garage.fov'] === 20 },
                          { id: 3, type: 'camera.garage.fov', value: 30, text: '30', is_selected: propValues['camera.garage.fov'] === 30 },
                          { id: 4, type: 'camera.garage.fov', value: 40, text: '40', is_selected: propValues['camera.garage.fov'] === 40 },
                          { id: 5, type: 'camera.garage.fov', value: 50, text: '50', is_selected: propValues['camera.garage.fov'] === 50 },
                          { id: 6, type: 'camera.garage.fov', value: 60, text: '60', is_selected: propValues['camera.garage.fov'] === 60 },
                        ]}
                        onChangeValue={(value: IPropValue)=>changeCameraGarageModeHandler(value)}
                      />
                      <Prop text='Проекция' values={[
                          { id: 1, type: 'camera.garage.projection', value: 'perspective', text: 'Перспектива', is_selected: propValues['camera.garage.projection'] === 'perspective' },
                          { id: 2, type: 'camera.garage.projection', value: 'ortographic', text: 'Ортография', is_selected: propValues['camera.garage.projection'] === 'ortographic' },
                        ]}
                        onChangeValue={(value: IPropValue)=>changeCameraGarageModeHandler(value)}
                      />
                      
                      <Head text='Стайлинг' />
                      <Prop text='Стиль камеры' values={[
                          { id: 1, type: 'camera.styling.genre', value: 1, text: 'City Center', is_selected: propValues['camera.styling.genre'] === 1 },
                          { id: 2, type: 'camera.styling.genre', value: 2, text: 'Flower St. 20', is_selected: propValues['camera.styling.genre'] === 2 },
                        ]}
                        onChangeValue={(value: IPropValue)=>changeCameraGarageModeHandler(value)}
                      />
                    </>
                  }
                  {
                    menuLevel === 'settings.postprocessing' &&
                    <></>
                  }

                </div>
            </div>
        </div>
    </div>
  )
}

export default EscMenu