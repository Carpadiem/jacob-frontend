import React from 'react'
import styles from './ModalWindow.module.css'

interface ModalWindowProps {
    title?: string
    text?: string
    children: React.ReactNode
}

const ModalWindow = ({ title='', text='', children }: ModalWindowProps) => {
  return(
    <div className={styles.wrapper}>
        <div className={styles.frame}>
            <div className={styles.head}>
                <h1 className={styles.title}>{title}</h1>
                <p className={styles.text}>{text}</p>
            </div>
            <div className={styles.foot}>
                { children }
            </div>
        </div>
    </div>
  )
}

export default ModalWindow