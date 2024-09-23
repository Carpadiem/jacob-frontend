import React from 'react'
import styles from './ModalButton.module.css'

export interface ModalButtonProps {
    text: string
    tcolor: string
    bcolor: string
    onClick: ()=>void
}
const ModalButton = ({ text, tcolor, bcolor, onClick }) => {
  return (
    <button
        className={styles.btn}
        style={{
            backgroundColor: bcolor,
            color: tcolor,
        } as React.CSSProperties}
        onClick={onClick}
    >{text}</button>
  )
}

export default ModalButton