import React from 'react'
import styles from './FreeSlot.module.css'


interface FreeSlotProps {
    onClick: ()=>void
}

const FreeSlot = ({ onClick }: FreeSlotProps) => {
  return (
    <div className={styles.frame} onClick={onClick}>
        <p className={styles.text}>Свободный слот</p>
    </div>
  )
}

export default FreeSlot