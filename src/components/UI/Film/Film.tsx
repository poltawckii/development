"use client"
import React from 'react'
import Link from 'next/link';
import {usePathname} from "next/navigation";
import styles from '../BlockFilms/BlockFilms.module.css'
import {ICarouse, IState} from "@/types/IState";
import {useSelector} from "react-redux";
import {ISimilars} from "@/types/ISimilars";
function Film({data}:{data: ICarouse | undefined | ISimilars}) {
    const pathname = usePathname();
    let id = useSelector((state : IState) => state.id.id)
        let funcApi = () =>{
            if (pathname === '/') {
                return data?.items?.map(item => {
                    return {poster: item?.posterUrlPreview, id: item?.kinopoiskId, rate: item?.ratingKinopoisk}
                });
            }
            else if (pathname === `/film/${id}`) {
                return data?.items?.map((item) => {
                    return ({poster: item?.posterUrlPreview, id: item?.filmId, rate: item?.ratingKinopoisk})
                });

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