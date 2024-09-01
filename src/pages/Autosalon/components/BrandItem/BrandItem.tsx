import React from 'react'
import styles from './BrandItem.module.css'

interface BrandItemProps {
    brand: string
    onClick: ()=>void
}

const BrandItem = ({ brand, onClick }: BrandItemProps) => {
  return (
    <div className={styles.brand_item} onClick={onClick}>
        <p className={styles.brand_item_text}>{brand}</p>
    </div>
  )
}

export default BrandItem