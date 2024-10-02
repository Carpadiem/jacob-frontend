import React from 'react'
import styles from './ShopItemButton.module.css'
import CheckCircle from '@svg/ui/check_circle.svg?react'
import SFXSprayCan from '/audio/ui/sfx_spray_can.wav'

interface ShopItemButtonProps {
    text: string
    price: number
    is_purchased: boolean
    onClick: ()=>void
}

const ShopItemButton = ({ text, price, is_purchased, onClick, }: ShopItemButtonProps) => {
    
    const sfx_spray_can = new Audio(SFXSprayCan)
    sfx_spray_can.playbackRate = 1
    sfx_spray_can.volume = .2
    
    return (
        <div className={styles.btn} onClick={()=>{onClick(); sfx_spray_can.play()}}>
            
            <p className={styles.text}>{ text }</p>

            {
                is_purchased
                ?
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

export default ShopItemButton