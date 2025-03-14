"use client"
import React,{FC} from 'react';
import BlockFilms from '../BlockFilms/BlockFilms';
import styles from './Global.module.css'
import {useGetInfoCarouselQuery} from "@/services/CozyEveningService";
import { TailSpin} from "react-loader-spinner";

interface GlobalProps {
    name: string;
    color: string;
    id: undefined | string;
    children?: never[];
    right: string | undefined;
    left: string| undefined;
    data: object| undefined;
}
export const Global: FC<GlobalProps> = ({data, name, color, id, right, left}) => {
  return (
    <div className={styles.Global} id='Global'>
        {(data=== undefined) ? <TailSpin color='black' height={100} width={100}/> :
            <>
        <div style={{color: color}} className={styles.Name}><h4>{name}</h4></div>
        <BlockFilms data={data} id={id} right={right} left={left}></BlockFilms>
            </>
}
    </div>
  )
}
export default Global;
