import React from 'react'
import styles from './StylingPurchasing.module.css'

import CheckCircle from '../../../images/check_circle.svg'


interface StylingPurchasingProps {
    title: string
    subtitle: string
    data: {
        type: string
        id: number
        price: number
        is_purchased: boolean
    } | {
        wheels_offset: number
        wheels_alignment: number
        price: number
        is_purchased: boolean
    }
    onClickPurchase: ()=>void
}

const StylingPurchasing = ({ title, subtitle, data, onClickPurchase }: StylingPurchasingProps) => {
    return (
        <div className={styles.purchasing_frame}>
            <div className={styles.purchasing_head}>
                <h2 className={styles.purchasing_title}>{ title }</h2>
                <p className={styles.purchasing_text}>{ subtitle }</p>
                <div className={styles.purchasing_price_container}>
                    <p className={styles.purchasing_price_number}>{ data.price.toLocaleString('en-US') }</p>
                    <p className={styles.purchasing_price_currency}>$</p>
                </div>
            </div>
            {
                data.is_purchased
                ?
                <button className={styles.btn_already_purchased}><p className={styles.btn_purchase_text}>Уже установлено</p></button>
                :
                <button className={styles.btn_purchase} onClick={onClickPurchase}><p className={styles.btn_purchase_text}>Приобрести</p></button>
            }
        </div>
    )
}

export default StylingPurchasing