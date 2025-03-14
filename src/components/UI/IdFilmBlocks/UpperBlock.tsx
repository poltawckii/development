"use client"
import React, {useEffect, useRef, useState} from 'react';
import styles from "@/app/film/About.module.css";
import ModalWindow from "@components/UI/ModalWindow/ModalWindow";
import {IAbout} from "@/types/IAbout";
import {useDispatch, useSelector} from "react-redux";
import {addFavourite, addId, deleteFavourites, deleteId} from "@/store/reducers/listFavourites";
import {current} from "@reduxjs/toolkit";
import {post} from "axios";
import {addHistory, setHistory} from "@/store/reducers/historyChecked";
function UpperBlock({response, openModal, isModalOpen, closeModal, id}) {
    let {
        slogan,
        description,
        genres,
        year,
        ratingAgeLimits,
        filmLength,
        countries,
        nameRu,
        posterUrl,
        ratingKinopoisk,
        ratingKinopoiskVoteCount
    }: IAbout = {
        ...response,
    };
    let path = '/add-favorites-plus-to-svgrepo-com.svg'
    let refImg = useRef();
    let dispatch = useDispatch();
    let listFavourites = useSelector(state => state.favourites?.list);
    let currentPoster = listFavourites?.find((item) => item.url === posterUrl);


    if (currentPoster){
        path = '/favorites-from-remove-svgrepo-com.svg';
    }
    if (nameRu === null){
        if(response.nameOriginal !== null){
            nameRu = response.nameOriginal;
        }
        else if(response.nameEn !== null){
            nameRu = response.nameEn;
        }
    }
    if (description === null){
        description = 'Описание отсутствует';
    }
    if (ratingKinopoisk === null){
        ratingKinopoisk = response.ratingImdb;
        ratingKinopoiskVoteCount = response.ratingImdbVoteCount;
    }


    const [isAuth, setIsAuth] = useState(false);
    useEffect(() => {
        if (localStorage.getItem('token')){
            setIsAuth(true);
        }
        else {
            setIsAuth(false);
        }
    }, []);
    const changeSVG = () => {
        if (refImg.current.src === "http://localhost:3000/add-favorites-plus-to-svgrepo-com.svg") {
            refImg.current.src = "http://localhost:3000/favorites-from-remove-svgrepo-com.svg";
            dispatch(addFavourite({url: posterUrl, id: id, rate: ratingKinopoisk}))
        } else {
            refImg.current.src = "http://localhost:3000/add-favorites-plus-to-svgrepo-com.svg";
            dispatch(deleteFavourites({url: posterUrl, id: id, rate: ratingKinopoisk}))
        }
    }
    return (
        <div className={styles.About}>
            <div className={styles.obertka_about_logo}>
                <img alt='[]' id="about_logo" src={posterUrl}></img>
            </div>
            <div className={styles.Info_Film}>
                <div className={styles.nameSVG}>
                    <h1>{nameRu}</h1>
                    {(isAuth) ?
                    <div className={styles.favourite}>
                        <button className={styles.buttonFavourite} onClick={changeSVG}>
                        <img alt="favourite" src={path} ref={refImg}></img>
                        </button>
                    </div>
                    : <></>}
                </div>
                <div>
                    <p>{description}</p>
                </div>
                <button className={styles.butWatchFilm} onClick={openModal}>
                    <p onClick={() => dispatch(addHistory({url: posterUrl, id: id, rate: ratingKinopoisk}))}>Начать просмотр</p>
                </button>
                <ModalWindow
                    isOpen={isModalOpen} isClose={closeModal} id={id}>
                </ModalWindow>
            </div>
            <div className={styles.Actors_Film}>
                <h1>Рейтинг: {ratingKinopoisk}</h1>
                <p>Количество оценок: {ratingKinopoiskVoteCount}</p>
            </div>
        </div>
    );
}

export default UpperBlock;