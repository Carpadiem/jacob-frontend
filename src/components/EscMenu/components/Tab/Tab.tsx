import React from 'react'
import styles from './Tab.module.css'

interface TabProps {
    text: string
    selected?: boolean
    onClick: ()=>void
}

const Tab = ({ text, selected=false, onClick }: TabProps) => {

    const inline_style_tab = {
        backgroundColor: selected ? 'white' : 'rgba(0,0,0,.5)'
    } as React.CSSProperties
    
    const inline_style_tab_text = {
        color: selected ? 'black' : 'white'
    } as React.CSSProperties 
  
    return (
        <div
            style={inline_style_tab}
            className={styles.tab}
            onClick={onClick}
        >
            <p style={inline_style_tab_text} className={styles.tab_text}>{text}</p>
        </div>
    )
}

export default Tab