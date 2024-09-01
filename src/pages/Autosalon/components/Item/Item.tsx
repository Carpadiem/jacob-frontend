import React from 'react'
import styles from './Item.module.css'

interface ItemProps {
  brand: string
  model: string
  price: number
  currency?: string
  isHovered?: boolean
  isSelected?: boolean
  onClick: ()=>void
}

const Item = ({ brand, model, price, currency='$', isHovered=false, isSelected=false, onClick,}: ItemProps) => {

  return (
    <div
      className={styles.list_item}
      onClick={onClick}
      style={{
        backgroundColor: isSelected ? isHovered ? 'rgba(255,255,255,.8)' : 'rgba(255,255,255,.5)' : isHovered ? 'rgba(0,0,0,.8)' : 'rgba(0,0,0,.5)'
      } as React.CSSProperties}
    >
      <div className={styles.item_left}>
        <p
          className={styles.car_brand_text}
          style={{
            color: isSelected ? isHovered ? 'black' : 'black' : isHovered ? 'white' : 'white'
          } as React.CSSProperties}
        >{brand}</p>
        <p
          className={styles.car_model_text}
          style={{
            color: isSelected ? isHovered ? 'black' : 'black' : isHovered ? '#9b9b9b' : '#9b9b9b'
          } as React.CSSProperties}
        >{model}</p>
      </div>
      <div className={styles.item_right}>
        <p
          className={styles.car_price_number}
          style={{
            color: isSelected ? isHovered ? 'black' : 'black' : isHovered ? 'white' : 'white'
          } as React.CSSProperties}  
        >{price.toLocaleString('en-US')}</p>
        <p
          className={styles.car_price_currency}
          style={{
            color: isSelected ? isHovered ? 'black' : 'black' : isHovered ? '#33fc76' : '#33fc76'
          } as React.CSSProperties}  
        >{currency}</p>
      </div>
    </div>
  )

  // return (
  //   <div className={styles.list_item} style={
  //     {
  //       backgroundColor: isSelected ? isHover ? 'rgba(255,255,255,.8)' : 'rgba(255,255,255,.5)' : isHover ? 'rgba(0,0,0,.8)' : 'rgba(0,0,0,.5)'
  //     } as React.CSSProperties} onMouseEnter={()=>setIsHover(true)} onMouseLeave={()=>setIsHover(false)} onClick={onClick}>

  //     <div className={styles.item_left}>
  //       <p className={styles.car_brand_text} style={{color: isSelected ? 'black' : 'white'} as React.CSSProperties}>{brand}</p>
  //       <p className={styles.car_model_text} style={{color: isSelected ? '#2a2a2a' : '#9b9b9b'} as React.CSSProperties}>{model}</p>
  //     </div>
  //     <div className={styles.item_right}>
  //       <p className={styles.car_price_number} style={{color: isSelected ? 'black' : 'white'} as React.CSSProperties}>{price.toLocaleString('en-US')}</p>
  //       <p className={styles.car_price_currency} style={{color: isSelected ? 'black' : '#33fc76'} as React.CSSProperties}>{currency}</p>
  //     </div>
  //   </div>
  // )
}

export default Item
