import React from 'react'
import styles from './Garage.module.css'
// images
import bg from './images/bg.jpg'
import styling_card_bg from './images/styling_card_bg.jpg'
// components
import { CarItem } from './components/CarItem'


const Garage = () => {
  return (
    <div className={styles.page} style={{ backgroundImage: 'url('+bg+')' }}>
        <div className={styles.left_container}>
            <div className={styles.head_container}>
                <h1 className={styles.header_text}>Парковочные места</h1>
                <p className={styles.parking_slots_text}>3/5</p>
            </div>
            <div className={styles.my_cars_container}>
                <CarItem title='Mercedes-Benz' subtitle='AMG GT' />
                <div className={styles.open_bar}></div>
                <CarItem title='Mercedes-Benz' subtitle='AMG GT' />
                <CarItem title='Mercedes-Benz' subtitle='AMG GT' />
                <div className={styles.buy_frame}>
                    <div className={styles.left_text_container}>
                        <span>+</span>
                        <p>Купить место</p>
                    </div>
                    <div className={styles.right_text_container}>
                        <p>500,000</p>
                        <span>$</span>
                    </div>
                </div>
            </div>
            <div className={styles.styling_card_container} style={{ backgroundImage: 'url('+styling_card_bg+')' } as React.CSSProperties}>
                <h1 className={styles.title_styling_card}>Стайлинг</h1>
            </div>
        </div>
    </div>
  )
}

export default Garage