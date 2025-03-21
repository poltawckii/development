"use client"
import React, {useEffect, useRef, useState} from 'react';
import styles from './findFillters.module.css'
import fetchFilters from "@api/fetchFilters";
import {TailSpin} from "react-loader-spinner";
import fetchName from "@api/fetchName";
import {useLazyGetFiltersQuery, useLazyGetNameQuery} from "@/services/CozyEveningTrailer";
import {useGetInfoCarouselQuery} from "@/services/CozyEveningService";
const Page = () => {
    // let [sumResponse, setSumResponse] = useState([]);
    let [loader, setLoader] = useState<number>(1);
    let [getFilters, { data: filtersData, isLoading: isFiltersLoading }] = useLazyGetFiltersQuery();
    let [getName, { data: nameData, isLoading: isNameLoading }] = useLazyGetNameQuery();

    let typeRef : React.RefObject<HTMLSelectElement> = useRef(null);
    let genreRef : React.RefObject<HTMLSelectElement> =  useRef(null);
    let yearRef : React.RefObject<HTMLInputElement> = useRef(null);
    let yearStartRef : React.RefObject<HTMLInputElement> = useRef(null);
    let yearEndRef : React.RefObject<HTMLInputElement> = useRef(null);
    let ageRef : React.RefObject<HTMLInputElement> = useRef(null);
    let countryRef : React.RefObject<HTMLInputElement> = useRef(null);
    let refName : React.RefObject<HTMLInputElement> = useRef(null);
    useEffect(() => {
        //TODO: сделать нормальный алгоритм поиска без багов
        //
        // let idx = 0;
        // setSumResponse(response?.filter((item) => {
        // for (let i = 0; i < response?.docs?.length; i++){
        //     if (idx < responseName?.docs?.length) {
        //         if (responseName?.docs[idx]?.id === response[i]?.id) {
        //             idx++
        //             return responseName[idx];
        //         }
        //     }
        //     else if (idx === responseName?.docs?.length) {
        //             idx = 0;
        //         }
        //     }
        // }));
        // console.log(sumResponse);
        console.log(filtersData, nameData);
        setLoader(3);
    }, [filtersData, nameData]);
    const getResponse = async () => {
        setLoader(2);
        let [type, genre, year, yearStart, 
            yearEnd, age, country] = 
            [typeRef.current?.value, genreRef.current?.value, yearRef.current?.value, yearStartRef.current?.value, 
                yearEndRef.current?.value, ageRef.current?.value, countryRef.current?.value];
   
        let url = `https://api.kinopoisk.dev/v1.4/movie?page=1&limit=250&type=${type}&year=${year}&releaseYears.start=${yearStart}&releaseYears.end=${yearEnd}&ageRating=${age}&genres.name=${genre}&countries.name=${country}`;
        let arrFilters = [type, genre, year, yearStart, yearEnd, age, country];
        let arrDelete = arrFilters.reduce((indices : number[], element : string | undefined, index : number) => {
            if (element === '') indices.push(index);
            return indices;
        }, []); // Начальное значение - пустой массив
        arrDelete.forEach((item) => {
            switch (item){
                case (0):
                    url = url.split("&type=").join("");
                    break;
                case (1):
                    url = url.split("&genres.name=").join("");
                    break;
                case (2):
                    url = url.split("&year=").join("");
                    break;
                case (3):
                    url = url.split("&releaseYears.start=").join("");
                    break;
                case (4):
                    url = url.split("&releaseYears.end=").join("");
                    break;
                case (5):
                    url = url.split("&ageRating=").join("");
                    break;
                case (6):
                    url = url.split("&countries.name=").join("");
                    break;
            }
        })

        getFilters(url);
        (refName.current?.value === '') ? null : getName(refName.current?.value);
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
                            {(loader === 3) ?
                                <TailSpin color="black" height={80} width={200}/>
                                :
                            <div className={styles.block2_gridFind}>
                                {/*{sumResponse?.map((item, index) =>*/}
                                {/*    <Link href={'/film/' + item.id} className={styles.block2_gridFind_wrapper}>*/}
                                {/*        {item?.poster?.url*/}
                                {/*        ? <img alt={'поиск' + index} key={index} src={item?.poster?.url}></img>*/}
                                {/*        : <div className={styles.swapEmptyImg}>*/}
                                {/*                <div className={styles.nameFilm}><h3>*/}
                                {/*                    {item?.name ? item?.name : item?.alternativeName}*/}
                                {/*                </h3>*/}
                                {/*                </div>*/}
                                {/*            </div>}*/}
                                {/*        {(item.rate === null) ? <></>*/}
                                {/*            : <div className={styles.rateFilm}>*/}
                                {/*                <h4>{item.rating.imdb}</h4>*/}
                                {/*            </div>*/}
                                {/*        }*/}
                                {/*    </Link>*/}
                                {/*)}*/}
                            </div>
                            }
                        </div>
                    </div>
                </>
        </div>
    );
};

export default Page;