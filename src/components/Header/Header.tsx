// react
import React from 'react'
import styles from './Header.module.scss'
// router
import { Link } from 'react-router-dom'
// anim
import { motion, AnimatePresence } from 'framer-motion'
// svg
import SvgVkontakte from '@svg/socials/vkontakte.svg?react'
import SvgTelegram from '@svg/socials/telegram.svg?react'

function Header({ bg_color = '#060606' }: { bg_color?: string }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  const menu_click_handler = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsMenuOpen((prev) => !prev)
  }

  const motion_menu_initial = {
    x: '-320px',
    transition: {
      ease: [0.335, 0.63, 0.37, 1.005],
      duration: 0.5,
    },
  }
  const motion_menu_animate = {
    x: 0,
    transition: {
      ease: [0.335, 0.63, 0.37, 1.005],
      duration: 0.5,
    },
  }

  const motion_variant_menu_item = (childrenIndex: number) => ({
    hidden: {
      x: -150,
    },
    visible: {
      x: 0,
      transition: {
        type: 'spring',
        ease: [0.335, 0.63, 0.37, 1.005],
        delay: childrenIndex * 0.05,
        stiffness: 260,
        damping: 20,
      },
    },
  })

  return (
    <>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className={styles.menuContainer}
            style={{ backgroundColor: bg_color } as React.CSSProperties}
            initial={motion_menu_initial}
            animate={motion_menu_animate}
            exit={motion_menu_initial}
          >
            <div className={styles.menuTopPanel}>
              <motion.div variants={motion_variant_menu_item(1)} initial='hidden' animate='visible'>
                <Link to='/home' className={styles.menuItem}>
                  <p className={styles.menuItemText}>Главная</p>
                </Link>
              </motion.div>
              <motion.div variants={motion_variant_menu_item(2)} initial='hidden' animate='visible'>
                <Link to='/profile' className={styles.menuItem}>
                  <p className={styles.menuItemText}>Профиль</p>
                </Link>
              </motion.div>
              <motion.div variants={motion_variant_menu_item(3)} initial='hidden' animate='visible'>
                <div className={styles.menuSeparator}>
                  <div className={styles.separator}></div>
                </div>
              </motion.div>
              <motion.div variants={motion_variant_menu_item(4)} initial='hidden' animate='visible'>
                <Link to='/autosalon' className={styles.menuItem}>
                  <p className={styles.menuItemText}>Автосалон</p>
                </Link>
              </motion.div>
              <motion.div variants={motion_variant_menu_item(5)} initial='hidden' animate='visible'>
                <Link to='/garage' className={styles.menuItem}>
                  <p className={styles.menuItemText}>Гараж</p>
                </Link>
              </motion.div>
              <motion.div variants={motion_variant_menu_item(6)} initial='hidden' animate='visible'>
                <Link to='/housing' className={styles.menuItem}>
                  <p className={styles.menuItemText}>Жилье</p>
                </Link>
              </motion.div>
              <motion.div variants={motion_variant_menu_item(7)} initial='hidden' animate='visible'>
                <Link to='/inventory' className={styles.menuItem}>
                  <p className={styles.menuItemText}>Инвентарь</p>
                </Link>
              </motion.div>
            </div>
            <div className={styles.menuBottomPanel}>
              <h2 className={styles.menuBottomTitle}>Jacob</h2>
              <p className={styles.menuBottomSubtitle}>Игровой чат-бот VK</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ transform: 'translateY(-80px)' }}
        animate={{ transform: 'translateY(0)' }}
        transition={{
          ease: [0.0, 0.76, 0.27, 1.005],
          duration: 0.5,
        }}
      >
        <div
          className={styles.frame}
          style={
            {
              backgroundColor: bg_color,
            } as React.CSSProperties
          }
        >
          <div className={styles.container1200}>
            {/* burger */}
            <div className={styles.container_menu} onClick={menu_click_handler}>
              <div className={styles.menu_burger_lines}>
                <div className={styles.burger_line} />
                <div className={styles.burger_line} />
                <div className={styles.burger_line} />
              </div>
              <p>Меню</p>
            </div>

            {/* socials */}
            <div className={styles.container_socials}>
              <SvgVkontakte style={{ fill: '#ffffff' } as React.CSSProperties} className={styles.social_btn} />
              <SvgTelegram style={{ fill: '#ffffff' } as React.CSSProperties} className={styles.social_btn} />
            </div>
          </div>
        </div>
      </motion.div>
    </>
  )
}

export default Header
