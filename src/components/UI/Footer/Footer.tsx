import React from 'react'
import styles from './Footer.module.css'
function Footer() {
  return (
    <div className={styles.Footer}>
        <div className={styles.footer__logo}>
      </div>
      <div className={styles.footer__nav}>
      <h1>Get started</h1>
      <h1>About us</h1>
      <h1>Support</h1>
      <a>Home</a>
      <a>Information</a>
      <a>FAQ</a>
      <a>Sign up</a>
      <a>Contact us</a>
      <a>Help desk</a>
      <a>Downloads</a>
      <a>Reviews</a>
      <a>Forums</a>
      </div>
      <div className={styles.footer__links_obertka}>
        <div className={styles.footer__links}>
          <a href='https://vk.com/whenbreakfree' rel='stylesheet'> <div className={styles.footer__links_vk}></div></a>
          <a href='https://t.me/whenbreakfree' rel='stylesheet'><div className={styles.footer__links_tg}></div></a>
          <a href='https://www.youtube.com/@yayahearttt' rel='stylesheet'><div className={styles.footer__links_yt}></div></a>
        </div>
        <button className={styles.footer__button}><p>Contact us</p></button>
      </div>
    </div>
  )
}

export default Footer