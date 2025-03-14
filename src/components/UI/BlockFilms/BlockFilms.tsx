
"use client"
import React, { useRef } from 'react';
import Film from '../Film/Film';
import styles from './BlockFilms.module.css'
import useSlider from "@/hooks/useSlider";

function BlockFilms({data, id, right, left}: {data: object, id: undefined | string, right: string | undefined, left: string | undefined}) {
  const sliderRef = useRef(null);
  const handleWheel = (event: React.WheelEvent) => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft += event.deltaY;
    }
  };
  let [prevSlide, nextSlide] = useSlider(sliderRef);
  return (
    <div className={styles.slider_container}> {/* Новый контейнер для слайдера и кнопок */}
    <button className={styles.button_prev} onClick={prevSlide} style={{left: right}}></button>
    <div className={styles.BlockFilms} ref={sliderRef} id="BlockFilms"
          onWheel={handleWheel}>
      <Film data={data} id={id}></Film>
      </div>
    <button className={styles.button_next} onClick={nextSlide} style={{left: left}}></button>
  </div>
  )
}
export default BlockFilms;