import React from 'react'
import styles from './ShopItemButton.module.css'

interface ShopItemButtonProps {
    text: string
    price: number
    onClick: ()=>void
}

const ShopItemButton = ({ text, price, onClick, }: ShopItemButtonProps) => {
    return (
        <div className={styles.btn} onClick={onClick}>
            
            <p className={styles.text}>{ text }</p>
            <div className={styles.price_container}>
                <p className={styles.price_number}>{ price.toLocaleString('en-US') }</p>
                <p className={styles.price_currency}>$</p>
            </div>

        </div>
    )
}

export default ShopItemButton