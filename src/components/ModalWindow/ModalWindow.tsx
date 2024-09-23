import React from 'react'
import styles from './ModalWindow.module.css'
// components
import { ModalButton } from '@components/ModalButton'
// models
import { ModalButtonProps as ModalButtonModel } from '@components/ModalButton/ModalButton'

interface ModalWindowProps {
    title?: string
    subtitle?: string
    text?: string
    buttons: ModalButtonModel[]
}

const ModalWindow = ({title='', subtitle='', text='', buttons=[]}) => {
  return(
    <div className={styles.wrapper}>
        <div className={styles.frame}>
            <div className={styles.head}>
                <h1 className={styles.title}>{title}</h1>
                <h2 className={styles.subtitle}>{subtitle}</h2>
                <p className={styles.text}>{text}</p>
            </div>
            <div className={styles.foot}>
                {
                    buttons.map((btn: ModalButtonModel, index)=>{
                        return <ModalButton
                                key={index}
                                text={btn.text}
                                tcolor={btn.tcolor}
                                bcolor={btn.bcolor}
                                onClick={btn.onClick}
                            />
                    })
                }
            </div>
        </div>
    </div>
  )
}

export default ModalWindow