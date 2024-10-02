import React from 'react'
import styles from './BuySlot.module.css'

interface BuySlotProps {
    price: number
    onClick: ()=>void
}

const BuySlot = ({ price, onClick }: BuySlotProps) => {
  return (
    <div className={styles.buy_frame} onClick={onClick}>
        <div className={styles.left_text_container}>
            <span>+</span>
            <p>Купить место</p>
        </div>
        <div className={styles.right_text_container}>
            <p>{ price.toLocaleString('en-US') }</p>
            <span>$</span>
        </div>
    </div>
  )
}

export default BuySlot