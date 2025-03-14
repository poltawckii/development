import React from 'react';
import styles from './DropDownMenuFilm.module.css'
import Link from "next/link";
import {IAbout} from "@/types/IAbout";


function DropDownMenuFilm({arrInfo} : {arrInfo : Array<any>}) {
    let arrInfoSmall = arrInfo?.slice(0, 10);
    return (
        <div className={styles.menu}>
            {arrInfoSmall?.map((item: IAbout , index) => (
                <Link href={`/film/${item.filmId}`} className={styles.menuFilm} key={index}>
                    <img src={item.posterUrlPreview}/>
                    <div>{item.nameRu}</div>
                </Link>
            ))}
        </div>
    );
}

export default DropDownMenuFilm;