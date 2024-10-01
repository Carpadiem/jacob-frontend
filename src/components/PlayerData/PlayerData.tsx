import React from 'react'
import styles from './PlayerData.module.css'
// models
import { IPlayerData } from '@models/IPlayerData'
import axios from 'axios'

// stores
import { observer } from 'mobx-react-lite'
import playerStore from '@stores/player.store'


const PlayerData = () => {
  
  // effects
  React.useEffect(()=>{
    // get player data from database
    const user_id = 230990098
    const url = `http://localhost:3001/api/player/playerData/${user_id}`
    axios.get<IPlayerData>(url).then(res=>{
        playerStore.setUserId(res.data.user_id)
        playerStore.setPlayerId(res.data.player_id)
        playerStore.setNickname(res.data.nickname)
        playerStore.setMoney(res.data.money)
        playerStore.setExperience(res.data.experience)
    })
  }, [])
  
  return (
    <div className={styles.frame}>
        <div className={styles.top_container}>
          <div className={styles.top_left_container}>
            <div className={styles.level_circle}>
              <p className={styles.level_text}>{ Math.round(playerStore.experience / 5000) } </p>
            </div>
            <div className={styles.flex_column}>
              <p className={styles.nickname_text}>{ playerStore.nickname }</p>
              <div className={styles.money_container}>
                <p className={styles.money_amount_text}>{ playerStore.money.toLocaleString('en-US') }</p>
                <p className={styles.money_amount_currency}>$</p>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default observer(PlayerData)