import React from 'react'
import styles from './StylingNavItem.module.css'
import SFXMouseOver from '/audio/ui/sfx_mouse_over.wav'
import PNGOverlayingLines from '/assets/images/overlaying_lines.png'

interface StylingNavItemProps {
  text: string
  count?: number
  onClick: ()=>void
}

const sfx_mouse_over = new Audio(SFXMouseOver)

const StylingNavItem = ({ text, count=-1, onClick }: StylingNavItemProps) => {
  
  sfx_mouse_over.playbackRate = 3
  sfx_mouse_over.volume = .2

  return (

    <>
      {
        count === 0
        ?
        <div className={styles.item_no_details}>
          <p className={styles.item_text}>{ text }</p>
          <p className={styles.item_text}>Нет запчастей</p>
          <div className={styles.overlaying}>
            <img className={styles.img_overlaying} src={PNGOverlayingLines}/>
          </div>
        </div>
        :
        <div className={styles.item} onClick={onClick} onMouseEnter={()=>sfx_mouse_over.play()}>
          <p className={styles.item_text} >{ text }</p>
          { count !== -1 &&  <p className={styles.item_text} >{ count.toLocaleString('en-US') } шт.</p> }
        </div>
      }
    </>
  )
}

export default StylingNavItem