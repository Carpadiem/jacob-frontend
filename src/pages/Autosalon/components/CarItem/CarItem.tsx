import React from 'react'
import styles from './CarItem.module.css'

interface CarItemProps {
  brand: string
  model: string
  price: number
  currency?: string
  isSelected?: boolean
  onClick: ()=>void
}

const CarItem = ({ brand, model, price, currency='$', isSelected=false, onClick,}: CarItemProps) => {

  return (
    <div
      className={styles.list_item}
      onClick={onClick}
      style={{
        backgroundColor: isSelected ? 'rgba(255, 255, 255, .5)' : 'rgba(0,0,0,.5)'
      } as React.CSSProperties}
    >
      <div className={styles.item_left}>
        <p
          className={styles.car_brand_text}
          style={{
            color: isSelected ? 'black' : 'white'
          } as React.CSSProperties}
        >{brand}</p>
        <p
          className={styles.car_model_text}
          style={{
            color: isSelected ? 'black' : '#9b9b9b'
          } as React.CSSProperties}
        >{model}</p>
      </div>
      <div className={styles.item_right}>
        <p
          className={styles.car_price_number}
          style={{
            color: isSelected ? 'black' : 'white'
          } as React.CSSProperties}
        >{price.toLocaleString('en-US')}</p>
        <p
          className={styles.car_price_currency}
          style={{
            color: isSelected ? 'black' : '#33fc76'
          } as React.CSSProperties}
        >{currency}</p>
      </div>
    </div>
  )
}

export default CarItem
