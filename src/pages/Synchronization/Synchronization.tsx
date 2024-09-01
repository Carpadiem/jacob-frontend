import React from 'react'
import styles from './Synchronization.module.css'

import background_image from '/assets/images/page_synchronization/background.jpg'

const Synchronization = () => {
  const [step, setStep] = React.useState('gameid')

  const btn_next_step_handler = () => {
    // check if gameid exist in game (request to backend-database)
    setStep('code')
  }

  return (
    <div className={styles.page}>
      <div className={styles.main_block}>
        <div className={styles.container_1200}>
          <div className={styles.steps_container}>
            {step === 'gameid' ? (
              <div className={styles.step_box}>
                <div className={styles.header_container}>
                  <h1 className={styles.title}>Синхронизация данных</h1>
                  <p className={styles.subtitle}>Перед началом игры, необходимо установить связь с браузерной версией игры. Пожалуйста, введите свой игровой ID.</p>
                </div>
                <div className={styles.data_container}>
                  <input type='text' className={styles.textfield_gameid} placeholder='123456' />
                </div>
              </div>
            ) : (
              <div className={styles.step_box}>
                <div className={styles.header_container}>
                  <h1 className={styles.title}>Введите код</h1>
                  <p className={styles.subtitle}>Проверьте личные сообщения с ботом и введите полученный код</p>
                </div>
                <div className={styles.data_container}>
                  <input type='text' className={styles.textfield_gameid} placeholder='123456' />
                </div>
              </div>
            )}
            <button className={styles.btn_next_step} onClick={btn_next_step_handler}>
              {step === 'gameid' ? 'Далее' : 'Начать игру'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Synchronization
