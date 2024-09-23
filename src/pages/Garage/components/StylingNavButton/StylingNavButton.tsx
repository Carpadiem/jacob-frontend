import React from 'react'
import styles from './StylingNavButton.module.css'

interface StylingNavButtonProps {
    text: string
    subtext?: string
    onClick: ()=>void
}

const StylingNavButton = ({ text, subtext, onClick, }: StylingNavButtonProps) => {
  return (
    <div className={styles.styling_nav_button} onClick={onClick}>
        <p className={styles.text}>{ text }</p>
        {subtext && <p className={styles.subtext}>{ subtext }</p>}
    </div>
  )
}

export default StylingNavButton