import React from 'react'
import styles from './SearchItem.module.css'


interface SearchItemProps {
  brand: string
  model: string
  onClick: ()=>void
}

const SearchItem = ({ brand, model, onClick }: SearchItemProps) => {
  return (
    <div className={styles.search_item} onClick={onClick}>
      <p className={styles.search_car_brand_text}>{brand}</p>
        <p className={styles.search_car_model_text}>{model}</p>
    </div>
  )
}

export default SearchItem