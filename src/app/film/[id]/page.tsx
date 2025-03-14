"use client"
import {
    cozyeveningAPI,
    useGetInfoAboutQuery,
    useGetInfoActorsQuery,
    useGetInfoSimilarQuery
} from "@/services/CozyEveningService";
import {cozyeveningAPI1, useGetInfoTrailerQuery} from "@/services/CozyEveningTrailer";
import {useEffect, useRef, useState} from "react";
import React from 'react';
import styles from "@/app/film/About.module.css";
import AboutDescription from "@components/UI/AboutDescription/AboutDescription";
import Global from "@components/UI/Global/Global";
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '@/store/store';
import {useParams, usePathname} from "next/navigation";
import {setId} from "@/store/reducers/idSlice";
import UpperBlock from "@components/UI/IdFilmBlocks/UpperBlock";
import DownBlock from "@components/UI/IdFilmBlocks/DownBlock";
import {toInteger} from "lodash";
import { TailSpin} from "react-loader-spinner";
import {setFavourites} from "@/store/reducers/listFavourites";
import getLogin from "@api/getLogin";

export default function Page() {
    const params = useParams();
    const id1 = toInteger(params.id);
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(setId(id1))
    }, [dispatch, id1]);
    const id = useSelector((state: RootState) => state.id.id);
    const prevIdRef = useRef(null);
    if (prevIdRef.current !== id) {
        dispatch(cozyeveningAPI.util.resetApiState());
        prevIdRef.current = id;
    }
    let { data: response} = useGetInfoAboutQuery(id, {skip: !id, refetchOnFocus: true});
    let { data: response1 } = useGetInfoActorsQuery(id, {skip: !id, refetchOnFocus: true});
    let { data: response2} = useGetInfoTrailerQuery(id, {skip: !id, refetchOnFocus: true});
    let {data: similarData} = useGetInfoSimilarQuery(id, {skip: !id, refetchOnFocus: true})
    console.log(response1);
    const extractNamesByProfession = (items: any[], profession: string) =>
        (items === undefined) ? undefined :
            items?.filter(item => item.professionText === profession)
            .map(item =>
                (item.nameRu === '') ? item.nameEn + ',' : item.nameRu + ',')
    const actorsNames = response1?.map(item => (item.nameRu === '') ? item.nameEn : item.nameRu);
    const arrayDescription = [
        { key: 'Год производства:', value: response?.year ?? 'Неизвестно' },
        { key: 'Страна:', value: response?.countries?.map(obj => obj.country) ?? 'Неизвестно' },
        { key: 'Жанр:', value: response?.genres?.map(obj => obj.genre) ?? 'Неизвестно' },
        { key: 'Слоган:', value: response?.slogan ?? 'Неизвестно' },
        { key: 'Режиссер:', value: extractNamesByProfession(response1, 'Режиссеры') ?? 'Неизвестно' },
        { key: 'Сценарий:', value: extractNamesByProfession(response1, 'Сценаристы') ?? 'Неизвестно' },
        { key: 'Продюсер:', value: extractNamesByProfession(response1, 'Продюсеры') ?? 'Неизвестно' },
        { key: 'Оператор:', value: extractNamesByProfession(response1, 'Операторы') ?? 'Неизвестно' },
        { key: 'Композитор:', value: extractNamesByProfession(response1, 'Композиторы') ?? 'Неизвестно' },
        { key: 'Художник:', value: extractNamesByProfession(response1, 'Художники') ?? 'Неизвестно' },
        { key: 'Монтаж:', value: extractNamesByProfession(response1, 'Монтажеры') ?? 'Неизвестно' },
        { key: 'Возраст:', value: response?.ratingAgeLimits?.slice(3) + '+' ?? 'Неизвестно' },
        { key: 'Время:', value: response?.filmLength ?? 'Неизвестно' }
    ];
    console.log(arrayDescription)
    const [isModalOpen, setIsModalOpen] = useState(false); // Состояние для открытия/закрытия модального окна
    const openModal = () => {
        setIsModalOpen(true); // Функция для открытия модального окна
    };
    const closeModal = () => {
        setIsModalOpen(false); // Функция для закрытия модального окна
    };
    return (
        <div className={styles.Main__About}>
            {(response === undefined) ?
            <TailSpin color="white" height={80} width={200}/> :
                <>
            <UpperBlock
                response={response}
                openModal={openModal}
                isModalOpen={isModalOpen}
                closeModal={closeModal}
                id={id}>
            </UpperBlock>
            <div className={styles.About}>
                <div className={styles.Trailer}>
                {(response2 === undefined) ?
                    <div className={styles.NotTrailer}>
                    <h2>Трейлер отсутствует</h2>
                    <img src="https://avatars.mds.yandex.net/i?id=b739c3eff150bb2a20fbef9aef3cc23e11283199-10558413-images-thumbs&n=13" alt="trailer not found"></img>
                    </div>
                    :
                <iframe title='Trailer'
                        src={response2?.videos?.trailers[0]?.url}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen></iframe>
            }
            </div>
                {(Array.isArray(arrayDescription) === true) ?
                    <DownBlock arrayDescription={arrayDescription}></DownBlock>
                    : undefined}
                <div className={styles.Actors_Film}>
                    <h1>Список актеров</h1>
                    {actorsNames?.map((item: string, index: number) => {
                        if (index < 10) {
                            return <AboutDescription
                                key={item}
                                value={item}>
                            </AboutDescription>
                        } else {
                            return null;
                        }
                    })}
                </div>
            </div>
            {(similarData?.items[0] === undefined) ? <div className={styles.textCarousel}>Нет похожих фильмов</div> :
            <Global
                name={'Список похожих фильмов: '}
                color="rgba(161, 161, 161, 0.984)"
                id ={id || ''}
                right={'5%'}
                left={'93%'}
                data={similarData}>
            </Global>
                }
                </>
}
        </div>
    )
}