import React from 'react'
import styles from './StylingPurchasing.module.css'

import CheckCircle from '../../../images/check_circle.svg'


interface StylingPurchasingProps {
    title: string
    subtitle: string
    price?: number
    onPurchaseClick: ()=>void
}

const StylingPurchasing = ({ title, subtitle, price=0, onPurchaseClick }: StylingPurchasingProps) => {
    return (
        <div className={styles.purchasing_frame}>
            <div className={styles.purchasing_head}>
                <h2 className={styles.purchasing_title}>{title }</h2>
                <p className={styles.purchasing_text}>{ subtitle }</p>
                <div className={styles.purchasing_price_container}>
                    <p className={styles.purchasing_price_number}>{ price.toLocaleString('en-US') }</p>
                    <p className={styles.purchasing_price_currency}>$</p>
                </div>
            </div>
            <button className={styles.btn_purchase} onClick={onPurchaseClick}><p>Приобрести</p></button>
        </div>
    )
}

export default StylingPurchasing