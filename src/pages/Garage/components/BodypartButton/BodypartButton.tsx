import React from 'react'
import styles from './BodypartButton.module.css'
import SvgCheckCircle from '../../images/check_circle.svg?react'

interface BodypartButtonProps {
    name: string
    price: number
    is_purchased: boolean
    onClick: ()=>void
}

const BodypartButton = ({ name, price, is_purchased=false, onClick }: BodypartButtonProps) => {
  return (
    <div
      className={styles.bodypart_button}
      onClick={onClick}
    >
        <p>{ name }</p>

        {
            is_purchased
            ?
            <SvgCheckCircle fill='white' />
            :
            <div className={styles.price_container}>
                <p className={styles.price_number}>{ price.toLocaleString('en-US') }</p>
                <p className={styles.price_currency}>$</p>
            </div>
        }
    </div>
  )
}

export default BodypartButton