import React from 'react'
import styles from './StylingBodypartButton.module.css'
// images
import CheckCircle from '../../../images/check_circle.svg?react'


interface StylingBodypartButtonProps {
    partName: string
    price: number
    isPurchased: boolean
    onClick: ()=>void
}

const StylingBodypartButton = ({ partName, price, isPurchased, onClick, }: StylingBodypartButtonProps) => {
    return (
        <div className={styles.btn} onClick={onClick}>
            <p className={styles.part_name}>{ partName }</p>
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

export default StylingBodypartButton