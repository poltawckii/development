import React from 'react'
import styles from './AsideLeft.module.css'
function AsideLeft() {
  return (
    <div className={styles.aside_left}>
      <div className={styles.aside_left_categories}>
        <a href=''>Фильмы</a>
        <a href=''>Сериалы</a>
        <a href=''>Аниме</a>
        <a href=''>Статьи</a>
      </div>
    </div>
  )
}

export default AsideLeft