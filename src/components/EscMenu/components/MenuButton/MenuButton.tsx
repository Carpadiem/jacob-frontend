import React from 'react'
import styles from './MenuButton.module.css'


interface MenuButtonProps {
  text: string
  onClick: ()=>void
}

const MenuButton = ({ text, onClick }: MenuButtonProps) => {
  return (
    <button className={styles.btn} onClick={onClick}>
      <p className={styles.btn_text}>{ text }</p>
    </button>
  )
}

export default MenuButton