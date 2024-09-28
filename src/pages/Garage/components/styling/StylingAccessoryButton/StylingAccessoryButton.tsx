import React from 'react'
import styles from './StylingAccessoryButton.module.css'
import CheckCircle from '../../../images/check_circle.svg?react'


interface StylingAccessoryButtonProps {
  text: string
  price: number
  isPurchased: boolean
  onClick: ()=>void
}

const StylingAccessoryButton = ({ text, price, isPurchased, onClick }: StylingAccessoryButtonProps) => {
  return (
    <div className={styles.btn} onClick={onClick}>
        <p className={styles.text}>{ text }</p>
        {
            isPurchased ?
            <CheckCircle />
            :
            <div className={styles.price_container}>
                <p className={styles.price_number}>{ price.toLocaleString('en-US') }</p>
                <p className={styles.price_currency}>$</p>
            </div>
        }
    </div>
)
}

export default StylingAccessoryButton