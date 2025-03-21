"use client"
import React, {MutableRefObject, useEffect, useRef, useState} from 'react';
import styles from "@/app/film/About.module.css";
import ModalWindow from "@components/UI/ModalWindow/ModalWindow";
import {IAbout} from "@/types/IAbout";
import {useDispatch, useSelector} from "react-redux";
import {addFavourite, deleteFavourites} from "@/store/reducers/listFavourites";
import {addHistory} from "@/store/reducers/historyChecked";
import {useGetInfoCarouselQuery} from "@/services/CozyEveningService";
function UpperBlock({response, openModal, isModalOpen, closeModal, id} :
                        {response : IAbout, openModal :  () => void, isModalOpen : boolean, closeModal  : () => void, id : number}) {
    let {
        description,
        nameRu,
        posterUrl,
        ratingKinopoisk,
        ratingKinopoiskVoteCount,
        nameOriginal,
        nameEn,
        ratingImdb,
        ratingImdbVoteCount
    } = {
        ...response,
    };
    let {data: carousel1} = useGetInfoCarouselQuery(1, {refetchOnMountOrArgChange: true});
    let {data: carousel2} = useGetInfoCarouselQuery(2, {refetchOnMountOrArgChange: true});
    console.log(carousel1, carousel2);
    let path = '/add-favorites-plus-to-svgrepo-com.svg'
    let refImg: MutableRefObject<HTMLImageElement | null> = useRef(null);
    let dispatch = useDispatch();
    let listFavourites = useSelector((state: {favourites: {list: []}}) => state.favourites?.list);
    let currentPoster = listFavourites?.find((item: {url: string}) => item.url === posterUrl);

    if (currentPoster){
        path = '/favorites-from-remove-svgrepo-com.svg';
    }
    if (nameRu === null){
        if(nameOriginal !== null){
            nameRu = nameOriginal;
        }
        else if(nameEn !== null){
            nameRu = nameEn;
        }
    }
    if (description === null){
        description = 'Описание отсутствует';
    }
    if (ratingKinopoisk === null){
        ratingKinopoisk = ratingImdb;
        ratingKinopoiskVoteCount = ratingImdbVoteCount;
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
        let objFavourite: {url: string | undefined, id: number | undefined, rate: number | undefined} =
            {url: posterUrl, id: id, rate: ratingKinopoisk};
        if (refImg.current?.src === "http://localhost:3000/add-favorites-plus-to-svgrepo-com.svg") {
            refImg.current.src = "http://localhost:3000/favorites-from-remove-svgrepo-com.svg";
            dispatch(addFavourite(objFavourite))
        } else if (refImg.current?.src === "http://localhost:3000/favorites-from-remove-svgrepo-com.svg") {
            refImg.current.src = "http://localhost:3000/add-favorites-plus-to-svgrepo-com.svg";
            dispatch(deleteFavourites(objFavourite))
        }
    }
    let objHistory = {url: posterUrl, id: id, rate: ratingKinopoisk};
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
                    <p onClick={() => dispatch(addHistory(objHistory))}>Начать просмотр</p>
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