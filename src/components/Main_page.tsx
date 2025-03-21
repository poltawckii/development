"use client"
import React from 'react'
import BlockFilms from './UI/BlockFilms/BlockFilms';
import AsideLeft from './UI/AsideLeft/AsideLeft';
import {useGetInfoCarouselQuery} from "@/services/CozyEveningService";

function Main_page() {
    let {data: carousel1} = useGetInfoCarouselQuery(1, {refetchOnMountOrArgChange: true});
    let {data: carousel2} = useGetInfoCarouselQuery(2, {refetchOnMountOrArgChange: true});
    return (
        <div className='Center'>
            <AsideLeft/>
            <div className='Main'>
                <BlockFilms data={carousel1} name="Популярное"/>
                <BlockFilms data={carousel2} name="Новинки"/>
            </div>
        </div>
  )
}

export default Main_page