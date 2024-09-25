import React from 'react'
import styles from './StylingGraphicButton.module.css'
// images
import CheckCircle from '../../../images/check_circle.svg'


interface StylingGraphicButtonProps {
    text: string
    price: number
    isPurchased: boolean
    onClick: ()=>void
}

const StylingGraphicButton = ({ text, price, isPurchased, onClick }: StylingGraphicButtonProps) => {
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

export default StylingGraphicButton