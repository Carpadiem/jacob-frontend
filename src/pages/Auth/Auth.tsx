// react, styles, router
import React from 'react'
import styles from './Auth.module.scss'

const Auth = () => {
  return (
    <div className={styles.block}>
      <div className={styles.container1200}>
        <div className={styles.frame}>
          <div className={styles.head}>
            <h1 className={styles.title}>Авторизуйтесь</h1>
            <p className={styles.subtitle}>Прежде чем начать игру</p>
          </div>
          <button className={styles.btn_auth}>VK авторизация</button>
        </div>
      </div>
    </div>
  )
}

export default Auth
