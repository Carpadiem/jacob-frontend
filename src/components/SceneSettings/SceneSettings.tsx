import React from 'react'
import styles from './SceneSettings.module.css'
// store
import { observer } from 'mobx-react-lite'
import sceneSettingsGarageStore from '@stores/sceneSettingsGarage.store'

const SceneSettings = () => {

    const [isOpen, setIsOpen] = React.useState(false)


    return (
        <div className={styles.frame}>

            <div className={styles.head} onClick={()=>setIsOpen(!isOpen)}>
                <p className={styles.text}>Настройки сцены</p>
            </div>

            {
                isOpen &&
                <div className={styles.buttons_container}>
                    <button className={styles.btn}>
                        <p className={styles.text}>Позиция камеры</p>
                    </button>
                    <button className={styles.btn} onClick={()=>sceneSettingsGarageStore.setIsAudioPlay(!sceneSettingsGarageStore.isAudioPlay)}>
                        <p className={styles.text}>Музыка</p>
                    </button>
                </div>
            }
        </div>
    )
}

export default observer(SceneSettings)