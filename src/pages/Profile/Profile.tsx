// react, styles, router
import React from 'react'
import styles from './Profile.module.scss'
import { Link, Navigate, redirect, useNavigate } from 'react-router-dom'
// anims
import { motion } from 'framer-motion'
// components
import { Header } from '@components/Header'

interface MiniappFrameProps {
  id?: number
  url?: string
  image_url?: string
  title?: string
  subtitle?: string
  isAvailable?: boolean
}
const MiniappFrame = ({ id, url, image_url, title, subtitle, isAvailable = true }: MiniappFrameProps) => {
  const variant = {
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 20,
        delay: id! * 0.2,
      },
    },
  }

  const hover = {
    transition: {
      ease: 'easeOut',
      duration: 0.15,
    },
    backgroundColor: '#202020',
    y: -6,
  }

  return (
    <>
      {isAvailable ? (
        <Link to={url!} className={styles.miniapp_link}>
          <motion.div variants={variant} whileHover={hover} className={styles.miniapp}>
            <motion.img whileHover={{ y: -7 }} className={styles.miniapp_image} src={image_url} alt='' />
            <div className={styles.miniapp_text_container}>
              <h2 className={styles.miniapp_title}>{title}</h2>
              <p className={styles.miniapp_subtitle}>{subtitle}</p>
            </div>
          </motion.div>
        </Link>
      ) : (
        <div className={styles.miniapp}>
          <div className={styles.miniapp_unavailable}>
            <p className={styles.miniapp_unavailable_text}>Скоро откроется</p>
          </div>
          <img className={styles.miniapp_image} src={image_url} alt='' />
          <div className={styles.miniapp_text_container}>
            <h2 className={styles.miniapp_title}>{title}</h2>
            <p className={styles.miniapp_subtitle}>{subtitle}</p>
          </div>
        </div>
      )}
    </>
  )
}

function Profile() {
  const miniapps_frames_data: MiniappFrameProps[] = [
    {
      id: 1,
      url: '/autosalon',
      image_url: '/assets/images/profile_page/miniapps/autosalon.png',
      title: 'Автосалон',
      subtitle: 'Все, что питается топливом',
      isAvailable: true,
    },
    {
      id: 2,
      url: '/garage',
      image_url: '/assets/images/profile_page/miniapps/garage.png',
      title: 'Гараж',
      subtitle: 'Прокачай свою тачку по самые шины',
      isAvailable: true,
    },
    {
      id: 3,
      url: '/housing',
      image_url: '/assets/images/profile_page/miniapps/housing.png',
      title: 'Жилье',
      subtitle: 'Мой дом - моя крепость',
      isAvailable: false,
    },
    {
      id: 4,
      url: '/inventory',
      image_url: '/assets/images/profile_page/miniapps/inventory.png',
      title: 'Инвентарь',
      subtitle: 'Кейсы, крафт, оружие, компоненты',
      isAvailable: false,
    },
  ]

  const container_miniapps_variant = {
    hidden: {
      opacity: 1,
    },
    visible: {
      transition: {
        staggerChildren: 0.5,
      },
    },
  }

  const navigate = useNavigate()

  React.useEffect(() => {
    const vk_auth_data = window.localStorage.getItem('vk_auth_data')
    if (!vk_auth_data) {
      navigate('/auth')
    }
  }, [])

  return (
    <>
      <div className={styles.container}>
        <Header bg_color='#161616' />
        <div className={styles.frame_block}>
          <div className={styles.container1200}>
            <motion.div className={styles.container_miniapps} variants={container_miniapps_variant} initial='hidden' animate='visible'>
              {miniapps_frames_data.map((item) => {
                return (
                  <MiniappFrame
                    key={item.id}
                    id={item.id}
                    url={item.url}
                    image_url={item.image_url}
                    title={item.title}
                    subtitle={item.subtitle}
                    isAvailable={item.isAvailable}
                  />
                )
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile
