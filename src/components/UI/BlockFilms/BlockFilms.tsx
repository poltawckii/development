
"use client"
import React, {FC, RefObject, useRef} from 'react';
import Film from '../Film/Film';
import styles from './BlockFilms.module.css'
import useSlider from "@/hooks/useSlider";
import {TailSpin} from "react-loader-spinner";
import {ICarouse} from "@/types/IState";
import {ISimilars} from "@/types/ISimilars";
interface GlobalProps {
  name: string;
  data: ICarouse | undefined | ISimilars;
}
export const BlockFilms: FC<GlobalProps> = ({name, data}) => {
  const sliderRef : RefObject<HTMLDivElement> = useRef(null);
  const handleWheel = (event: React.WheelEvent) => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft += event.deltaY;
    }
  };
  let [prevSlide, nextSlide] = useSlider(sliderRef);

  if (!data){
    return <TailSpin color='black' height={100} width={100}/>
  }
  return (
      <div className={styles.Global} id='Global'>
        <div style={{color: 'rgba(29, 29, 29, 0.818)'}} className={styles.Name}><h4>{name}</h4></div>
          <div className={styles.slider_container}> {/* Новый контейнер для слайдера и кнопок */}
          <button className={styles.button_prev} onClick={prevSlide} style={{left: "26%"}}></button>
          <div className={styles.BlockFilms} ref={sliderRef} id="BlockFilms"
            onWheel={handleWheel}>
          <Film data={data}></Film>
          </div>
      <button className={styles.button_next} onClick={nextSlide} style={{left: "91%"}}></button>
    </div>
      </div>
  )
}
export default BlockFilms;