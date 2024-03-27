// react, styles, router
import React from 'react'
import styles from './Home.module.scss'
// components
import { Header } from '@components/Header'
import { LinkButton } from '@components/LinkButton'

function Home() {
  const ref_frame_content = React.useRef<HTMLDivElement>(null)
  const ref_frame_main_block = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    function parallax(e: any) {
      const speed = 1
      const x = (window.innerWidth - (e.pageX / 2) * speed) / 100
      const y = (window.innerHeight - (e.pageY / 2) * speed) / 100
      if (ref_frame_content.current) {
        ref_frame_content.current.style.transform = `translateX(${x}px) translateY(${y}px)`
      }
      if (ref_frame_main_block.current) {
        ref_frame_main_block.current.style.backgroundPositionX = `${-x}px`
        ref_frame_main_block.current.style.backgroundPositionY = `${-y}px`
      }
    }
    window.addEventListener('mousemove', parallax)
    return () => {
      window.removeEventListener('mousemove', parallax)
    }
  }, [])

  return (
    <>
      <div className={styles.container}>
        <Header />
        <div
          className={styles.frame_main_block}
          style={{ backgroundImage: `url(${'/assets/images/page_home/bg.jpg'})` } as React.CSSProperties}
          ref={ref_frame_main_block}
        >
          <div className={styles.frame_content} ref={ref_frame_content}>
            <div className={styles.header_container}>
              <h1 className={styles.top_title}>Расширяем границы</h1>
              <div className={styles.frame_bottom_title}>
                <h1 className={styles.bottom_title}>интерактивности</h1>
              </div>
            </div>
            <p className={styles.subtitle}>Игровой VK чат-бот Jacob приглашает всех желающих поиграть в режиме расширенного интерактива</p>
            <LinkButton
              bgColor='g:#495FD4:#4625CC'
              text='Профиль'
              textColor='white'
              link='/profile'
              padding={{ v: 18, h: 24 }}
              filter={`
                  drop-shadow(0 182px 51px rgba(0, 0, 0, .01))
                  drop-shadow(0 66px 39px rgba(0, 0, 0, .3))
                  drop-shadow(0 29px 29px rgba(0, 0, 0, .51))
                  drop-shadow(0 7px 16px rgba(0, 0, 0, .29))
              `}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
