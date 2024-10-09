import React from 'react'
import styles from './ShopItemButton.module.css'
import CheckCircle from '@svg/ui/check_circle.svg?react'
import SFXSprayCan from '/audio/ui/sfx_spray_can.wav'
import SFXMouseOver from '/audio/ui/sfx_mouse_over.wav'

interface ShopItemButtonProps {
    text: string
    price: number
    is_purchased: boolean
    onClick: ()=>void
}

const sfx_spray_can = new Audio(SFXSprayCan)
const sfx_mouse_over = new Audio(SFXMouseOver)

const ShopItemButton = ({ text, price, is_purchased, onClick, }: ShopItemButtonProps) => {
    
    sfx_spray_can.playbackRate = 1
    sfx_spray_can.volume = .2
    
    sfx_mouse_over.playbackRate = 3
    sfx_mouse_over.volume = .2
    
    return (
        <div className={styles.btn} onClick={()=>{onClick(); sfx_spray_can.play()}} onMouseEnter={()=>sfx_mouse_over.play()}>
            
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