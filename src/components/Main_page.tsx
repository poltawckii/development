"use client"
import React from 'react'
import Global from './UI/Global/Global';
import AsideLeft from './UI/Aside_left/AsideLeft';
import Center from './UI/Center/Center';
import {useGetInfoCarouselQuery} from "@/services/CozyEveningService";

function Main_page() {
    let {data: carouselDataQuery1} = useGetInfoCarouselQuery(1);
    let {data: carouselDataQuery2} = useGetInfoCarouselQuery(2);
  return (
        <Center>
            <AsideLeft/>
            <div className='Main'>
                <Global data={carouselDataQuery1} name="Популярное" color='rgba(29, 29, 29, 0.818)' id={undefined} right="26%" left="91%"/>
                <Global data={carouselDataQuery2} name="Новинки" color='rgba(29, 29, 29, 0.818)' id={undefined} right="26%" left="91%"/>
            </div>
        </Center>
  )
}

export default Main_page