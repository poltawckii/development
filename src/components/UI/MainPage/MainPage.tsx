"use client"
import React from 'react'
import BlockFilms from '../BlockFilms/BlockFilms';
import AsideLeft from '../AsideLeft/AsideLeft';
import {useGetInfoCarouselQuery} from "@/services/CozyEveningService";
import styles from './MainPage.module.css'

function MainPage() {
    let {data: carousel1} = useGetInfoCarouselQuery(1, {refetchOnMountOrArgChange: true});
    let {data: carousel2} = useGetInfoCarouselQuery(2, {refetchOnMountOrArgChange: true});
    return (
        <div className={styles.Center}>
            <AsideLeft/>
            <div className={styles.Main}>
                <BlockFilms data={carousel1} name="Популярное"/>
                <BlockFilms data={carousel2} name="Новинки"/>
            </div>
        </div>
  )
}

export default MainPage