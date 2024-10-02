import React from 'react'
import styles from './StylingNavItem.module.css'
import SFXMouseOver from '/audio/ui/sfx_mouse_over.wav'

interface StylingNavItemProps {
  text: string
  count?: number
  onClick: ()=>void
}

const StylingNavItem = ({ text, count=-1, onClick }: StylingNavItemProps) => {
  
  const sfx_mouse_over = new Audio(SFXMouseOver)
  sfx_mouse_over.playbackRate = 2
  sfx_mouse_over.volume = .2
  
  return (
    <div className={styles.item} onClick={onClick} onMouseEnter={()=>sfx_mouse_over.play()}>
      <p className={styles.item_text} >{ text }</p>
      { count !== -1 &&  <p className={styles.item_subtext} >{ count.toLocaleString('en-US') } шт.</p> }
    </div>
  )
}

export default StylingNavItem