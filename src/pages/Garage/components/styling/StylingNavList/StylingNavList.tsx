import React from 'react'
import styles from './StylingNavList.module.css'


interface StylingNavListProps {
  title?: string
  subtitle?: string
  children: React.ReactNode
  buttonText?: string
  onButtonClick?: ()=>void
}

const StylingNavList = ({ title, subtitle, children, buttonText, onButtonClick }: StylingNavListProps) => {
  return (
    <div className={styles.container}>
      {
        title &&
        <div className={styles.head}>
            { title && <h2 className={styles.head_title}>{ title }</h2> }
            { subtitle && <h3 className={styles.head_subtitle}>{ subtitle }</h3> }
        </div>
      }
      <div className={styles.list}>
        { children }
      </div>

      {
        buttonText &&
        <div className={styles.btn} onClick={onButtonClick}>
          <p className={styles.btn_text}>{ buttonText }</p>
        </div>
      }
      
    </div>
  )
}

export default StylingNavList