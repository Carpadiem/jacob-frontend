// react, styles, router
import React from 'react'
import styles from './Auth.module.scss'
import { useParams } from 'react-router-dom'

// components
import { LinkButton } from '@components/LinkButton'
import { ActionButton } from '@components/ActionButton'

const uuid = 'random_string_abcdef123'
const appId = 51911859
const redirectUri = 'https://jacobgame.ru'
const redirect_state = 'random_redirect_state_string_abcdef123'
const query = `uuid=${uuid}&app_id=${appId}&response_type=silent_token&redirect_uri=${redirectUri}&redirect_state=${redirect_state}`

const Auth = () => {
  const auth_click_handler = () => {
    location.assign(`https://id.vk.com/auth?${query}`)
  }

  React.useEffect(() => {
    const { payload } = useParams()
    console.log(`payload: ${payload}`)
    const payload_json = JSON.parse(payload)
    console.log(`payload_json: ${payload_json}`)
  }, [])

  return (
    <div className={styles.block}>
      <div className={styles.container1200}>
        <div className={styles.frame}>
          <div className={styles.head}>
            <h1 className={styles.title}>Войдите, прежде чем начать игру</h1>
          </div>
          <ActionButton onClick={auth_click_handler} text='Войти через VK' textColor='white' bgColor='s:#2e9af8' />
        </div>
      </div>
    </div>
  )
}

export default Auth
