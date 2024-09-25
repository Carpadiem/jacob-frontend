import React from 'react'
import styles from './StylingNavItem.module.css'


interface StylingNavItemProps {
  text: string
  onClick: ()=>void
}

const StylingNavItem = ({ text, onClick }: StylingNavItemProps) => {
  return (
    <div className={styles.item} onClick={onClick}>
      <p className={styles.item_text} >{ text }</p>
    </div>
  )
}

export default StylingNavItem