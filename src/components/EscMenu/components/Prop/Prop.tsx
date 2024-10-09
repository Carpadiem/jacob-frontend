import React from 'react'
import styles from './Prop.module.css'
// models
import { IPropValue } from '@components/EscMenu/models/IPropValue'
// image
import SvgArrowLeft from '@svg/ui/arrow_toleft.svg?react'
import SvgArrowDown from '@svg/ui/arrow_todown.svg?react'

interface PropProps {
    text: string
    values: IPropValue[]
    disabled?: boolean
    onChangeValue: (value: IPropValue)=>void
}
const Prop = ({ text, values, disabled=false, onChangeValue }: PropProps) => {

    // handlers
    const changeHandler = (vector: 'prev' | 'next') => {

        const selected = values.filter(v=>v.is_selected)[0]
        
        if (vector === 'prev') {
            if (selected.id > 1) {
                const prev = values.filter(v=>v.id === selected.id - 1)[0]
                onChangeValue(prev)
            }
        } else if (vector === 'next') {
            if (selected.id < values.length) {
                const next = values.filter(v=>v.id === selected.id + 1)[0]
                onChangeValue(next)
            }
        }
    }

    return (
        <div
            className={styles.prop_line_container}
            style={{
                pointerEvents: disabled ? 'none' : 'auto',
                opacity: disabled ? '.3' : '1',
            } as React.CSSProperties}
        >
        <p className={styles.prop_line_text}>{ text }</p>
        <div className={styles.prop_line_values_container}>

            <SvgArrowDown
                style={{transform: 'rotateZ(90deg) scale(1.25)'}}
                className={styles.arrow}
                onClick={()=>changeHandler('prev')}
                />

            <p className={styles.prop_line_current_value_text}>{
                values.filter(v=>v.is_selected)[0].text
            }</p>
            
            <SvgArrowDown
                style={{transform: 'rotateZ(-90deg) scale(1.25)'}}
                className={styles.arrow}
                onClick={()=>changeHandler('next')}
            />

        </div>
    </div>
    )
}

export default Prop