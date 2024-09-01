// react, styles, router
import React from 'react'
import styles from './Home.module.css'

// components
import { Header } from '@components/Header'
import { LinkButton } from '@components/LinkButton'

import png_star from './images/star.png'
import png_gamepad from './images/gamepad.png'

import { useNavigate } from 'react-router-dom'

function Home() {
  const nav = useNavigate()

  const start_handler = () => {
    // check user is logged in

    // nav('/synchronization')
    nav('/lobby')
  }

  return (
    <>
      <div className={styles.page}>
        <div className={styles.header_container}>
          <h2 className={styles.texted_logo}>Jacob</h2>
        </div>
        <div className={styles.main_block}>
          <div className={styles.container}>
            <div className={styles.left_container}>
              <img className={styles.star_1} src={png_star} />
              <img className={styles.star_2} src={png_star} />
              <h1 className={styles.title}>
                Игровой бот
                <br />
                <span className={styles.title_marked_text}>со своей графикой</span>
                <br />и 3D функциями.
              </h1>
              <p className={styles.subtitle}>Попробуй новый режим расширенного интерактива. Ты сможешь делать визуальный тюнинг автомобилей, открывать кейсы, приобретать недвижимость и новые автомобили, а также делать много других интересных вещей не выходя из браузера.</p>
              <div className={styles.buttons_container}>
                <button className={styles.btn_start} onClick={start_handler}>
                  Начать
                </button>
                <div className={styles.moreinfo_container}>
                  <div className={styles.m_info_box}>
                    <p className={styles.m_info_text}>30+ игроков</p>
                  </div>
                </div>
              </div>
            </div>
            <p className={styles.fullscreen_text}>
              Нажмите <span style={{ color: '#fff' }}>F11</span>, чтобы войти в <span style={{ color: '#BFFE49' }}>полноэкранный режим</span>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
