"use client"
import React, {useEffect, useRef, useState} from 'react';
import styles from './findFillters.module.css'
import AccountInfo from "@components/UI/AccountInfo/AccountInfo";
import Link from "next/link";
import fetchFilters from "@api/fetchFilters";
import {TailSpin} from "react-loader-spinner";
import fetchName from "@api/fetchName";
const Page = () => {
    let [sumResponse, setSumResponse] = useState(null);
    let [response, setResponse] = useState(null);
    let [responseName, setResponseName] = useState(null);
    let [loader, setLoader] = useState(undefined);

    let typeRef = useRef(null);
    let genreRef = useRef(null);
    let yearRef = useRef(null);
    let yearStartRef = useRef(null);
    let yearEndRef = useRef(null);
    let ageRef = useRef(null);
    let countryRef = useRef(null);
    let refName = useRef(null);
    useEffect(() => {
        let idx = 0;
        // setSumResponse(response?.filter((item) => {
        for (let i = 0; i < response?.docs?.length; i++){
            if (idx < responseName?.docs?.length) {
                if (responseName?.docs[idx]?.id === response[i]?.id) {
                    idx++
                    setSumResponse(responseName[idx]);
                }
            }
            else if (idx === responseName?.docs?.length) {
                    idx = 0;
                }
            }
        // }));
        console.log(sumResponse);
        setLoader(true);
    }, [response, responseName]);
    const getResponse = async () => {
        setLoader(false);
        setResponse(await fetchFilters(typeRef, genreRef, yearRef, yearStartRef, yearEndRef, ageRef, countryRef));
        (refName.current?.value === '') ? setResponseName(null) : setResponseName(await fetchName(refName));
        // TODO сделать запрос по названию а потом вывести пользователю фильмы совпадающие по поиску по названию и по фильтрам

    }
    return (
        <div className={styles.Center}>
                <>
                    <div className={styles.Main}>
                        <div className={styles.wrapperBlock1}>
                            <h1>Расширенный поиск</h1>
                            <div className={styles.halfBlock}>
                                <div className={styles.wrapperFindImg}>
                                    <input ref={refName} className={styles.input} type="text" placeholder="Введите запрос "></input>
                                    <button className={styles.wrapperImg} onClick={getResponse}>
                                        <img alt="buttonfind"
                                             src="/find-magnifier-search-zoom-look-svgrepo-com.svg"></img>
                                    </button>
                                    <div className={styles.wrapperImg}>
                                        <img alt="filterforfind" src="/filter-svgrepo-com.svg"></img>
                                    </div>
                                </div>
                                <div className={styles.filter}>
                                    <h2>Тип:</h2>
                                    <select ref={typeRef} className={styles.input}>
                                        <option>movie</option>
                                        <option>tv-series</option>
                                        <option>cartoon</option>
                                        <option>anime</option>
                                    </select>
                                </div>
                                <div className={styles.filter}>
                                    <h2>Жанр:</h2>
                                    <select ref={genreRef} className={styles.input}>
                                        <option>мелодрама</option>
                                        <option>комедия</option>
                                        <option>ужасы</option>
                                        <option>драма</option>
                                    </select>
                                </div>
                                <div className={styles.filter}>
                                    <h2>Год фильма:</h2>
                                    <input ref={yearRef} type="text" className={styles.input}></input>
                                </div>
                                <div className={styles.filter}>
                                    <h2>Год начала релиза:</h2>
                                    <input ref={yearStartRef} type="text" className={styles.input}></input>
                                </div>
                                <div className={styles.filter}>
                                    <h2>Год окончания релиза:</h2>
                                    <input ref={yearEndRef} type="text" className={styles.input} ></input>
                                </div>
                                <div className={styles.filter}>
                                    <h2>Возврастной рейтинг:</h2>
                                    <input ref={ageRef} type="text" className={styles.input}></input>
                                </div>
                                <div className={styles.filter}>
                                    <h2>Страна:</h2>
                                    <input ref={countryRef} type="text" className={styles.input}></input>
                                </div>
                            </div>
                        </div>
                        <div className={styles.block2}>
                            <h1>Результаты поиска:</h1>
                            {(loader === false) ?
                                <TailSpin color="black" height={80} width={200}/>
                                :
                            <div className={styles.block2_gridFind}>
                                {sumResponse?.map((item, index) =>
                                    <Link href={'/film/' + item.id} className={styles.block2_gridFind_wrapper}>
                                        {item?.poster?.url
                                        ? <img alt={'поиск' + index} key={index} src={item?.poster?.url}></img>
                                        : <div className={styles.swapEmptyImg}>
                                                <div className={styles.nameFilm}><h3>
                                                    {item?.name ? item?.name : item?.alternativeName}
                                                </h3>
                                                </div>
                                            </div>}
                                        {(item.rate === null) ? <></>
                                            : <div className={styles.rateFilm}>
                                                <h4>{item.rating.imdb}</h4>
                                            </div>
                                        }
                                    </Link>
                                )}
                            </div>
                            }
                        </div>
                    </div>
                </>
        </div>
    );
};

export default Page;