"use client"
import React, {useEffect, useState} from 'react'
import Link from 'next/link';
import {useGetInfoCarouselQuery, useGetInfoSimilarQuery} from "@/services/CozyEveningService";
import {usePathname} from "next/navigation";
import {setCarousel} from "@/store/reducers/carouselSlice";
import styles from '../BlockFilms/BlockFilms.module.css'
function Film({data, id}:{data: object, id: undefined | string}) {
    interface ServerDataItem {
        posterUrlPreview: string;
        kinopoiskId: string;
    }
    interface SimilarDataItem {
        posterUrlPreview: string;
        filmId: string;
    }
    const [carouselData, setCarouselData] = useState(undefined);
    const pathname = usePathname();
    useEffect(() => {
        if (data) {
            setCarouselData(data);
        }
    }, [data]);
    console.log(carouselData);
        let funcApi = () =>{
            if (pathname === '/') {
                let response = carouselData?.items;
                let res_small: { poster: string, id: string }[] = response?.map(item => {
                    return {poster: item?.posterUrlPreview, id: item?.kinopoiskId, rate: item?.ratingKinopoisk}
                });
                return res_small;
            }
            else if (pathname === `/film/${id}`) {
                let similarData = data?.items;
                let res_small: { poster: string, id: string }[] = similarData?.map(item => {
                    return ({poster: item?.posterUrlPreview, id: item?.filmId, rate: item?.ratingKinopoisk})
                });
                return res_small;
            }
        }
        let res_small = funcApi();
        return (
    <div className="onWheel" >
        {res_small?.map((link, index) => (
            <Link
                key={index}
                href={`/film/${link.id}`}
                className='Film'>
                <img alt="" src={link.poster} key={index} id={'Film'}/>
                    <div className={styles.rateFilm}>
                {(link.rate === null) ?
                    <h4>0</h4>
                    : <h4>{link.rate}</h4>
                }
                    </div>
    </Link>
        )
)}
</div>
)
}

export default Film