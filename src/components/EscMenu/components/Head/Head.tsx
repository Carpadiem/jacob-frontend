import React from 'react'
import styles from './Head.module.css'

const Head = ({ text }) => {
  return (
    <div className={styles.head_line_container}>
      <h1 className={styles.head_line_text}>{ text }</h1>
    </div>
  )
}

export default Head