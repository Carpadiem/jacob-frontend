import React from 'react'
import styles from './Lobby.module.css'

import { useNavigate } from 'react-router-dom'

import c1_off from './images/cards/c1_off.jpg'
import c1_on from './images/cards/c1_on.jpg'
import c2_off from './images/cards/c2_off.jpg'
import c2_on from './images/cards/c2_on.jpg'
import c3_off from './images/cards/c3_off.jpg'
import c3_on from './images/cards/c3_on.jpg'
import c4_off from './images/cards/c4_off.jpg'
import c4_on from './images/cards/c4_on.jpg'

import SVGArrowRight from './svg/arrow_right.svg?react'

const Lobby = () => {
  // vars
  const nav = useNavigate()

  // states
  const [opacity_states, set_opacity_states] = React.useState<number[]>([0, 0, 0, 0])

  // handlers
  const card_mouse_enter_handler = (card_index: number) => {
    set_opacity_states(opacity_states.map((el, index) => (index === card_index - 1 ? 1 : 0)))
  }
  const card_mouse_leave_handler = (card_index: number) => {
    set_opacity_states(opacity_states.map((el, index) => (index === card_index - 1 ? 0 : 0)))
  }
  const card_click_handler = (room_name: string) => {
    // room names: autosalon, garage, housing, other
    nav('/' + room_name)
  }

  return (
    <>
      <div className={styles.page}>
        <div className={styles.main_block}>
          <div className={styles.cards_table}>
            <div className={styles.cards_row}>
              <div className={styles.card} onClick={() => card_click_handler('autosalon')} onMouseEnter={() => card_mouse_enter_handler(1)} onMouseLeave={() => card_mouse_leave_handler(1)}>
                <div className={styles.card_panel}>
                  <h2 className={styles.card_name}>Автосалон</h2>
                  <SVGArrowRight className={styles.svg_arrow} />
                </div>
                <img src={c1_off} className={styles.card_image} />
                <img src={c1_on} className={styles.card_image} style={{ opacity: opacity_states[0] }} />
              </div>
              <div className={styles.card} onClick={() => card_click_handler('garage')} onMouseEnter={() => card_mouse_enter_handler(2)} onMouseLeave={() => card_mouse_leave_handler(2)}>
                <div className={styles.card_panel}>
                  <h2 className={styles.card_name}>Гараж</h2>
                  <SVGArrowRight className={styles.svg_arrow} />
                </div>
                <img src={c2_off} className={styles.card_image} />
                <img src={c2_on} className={styles.card_image} style={{ opacity: opacity_states[1] }} />
              </div>
            </div>
            <div className={styles.cards_row}>
              <div className={styles.card} onClick={() => card_click_handler('housing')} onMouseEnter={() => card_mouse_enter_handler(3)} onMouseLeave={() => card_mouse_leave_handler(3)}>
                <div className={styles.card_panel}>
                  <h2 className={styles.card_name}>Недвижимость</h2>
                  <SVGArrowRight className={styles.svg_arrow} />
                </div>
                <img src={c3_off} className={styles.card_image} />
                <img src={c3_on} className={styles.card_image} style={{ opacity: opacity_states[2] }} />
              </div>
              <div className={styles.card} onClick={() => card_click_handler('other')} onMouseEnter={() => card_mouse_enter_handler(4)} onMouseLeave={() => card_mouse_leave_handler(4)}>
                <div className={styles.card_panel}>
                  <h2 className={styles.card_name}>Остальное</h2>
                  <SVGArrowRight className={styles.svg_arrow} />
                </div>
                <img src={c4_off} className={styles.card_image} />
                <img src={c4_on} className={styles.card_image} style={{ opacity: opacity_states[3] }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Lobby
