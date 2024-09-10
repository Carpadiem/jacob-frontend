import React from 'react'
import styles from './CarItem.module.css'

interface CarItemProps {
    title: string
    subtitle: string
}

const CarItem = ({ title, subtitle }: CarItemProps) => {
  return (
    <div className={styles.frame}>
        <h1 className={styles.title}>{ title }</h1>
        <p className={styles.subtitle}>{ subtitle }</p>
    </div>
  )
}

export default CarItem