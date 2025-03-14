"use client"
import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {deleteToken} from "@/store/reducers/tokenSlice";
import styles from './account.module.css'
import Link from "next/link";
import ListHistory from "@components/UI/ListHistory/ListHistory";
import ListFavourites from "@components/UI/ListFavourites/ListFavourites";
import AccountInfo from "@components/UI/AccountInfo/AccountInfo";
const Page = () => {
    let dispatch = useDispatch();
    let eMail = useSelector(state => state.token?.currentUser?.eMail);
    let swap = useSelector(state => state.swap.swap);
    const LogOut = () => {
        localStorage.removeItem('token')
        console.log(localStorage.getItem('token'));
        dispatch(deleteToken())
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
    let content;
    let text;
    switch (swap){
        case 'favourites':
            text = 'Ваши избранные фильмы';
            content = <ListFavourites/>
            break;
        case 'history':
            text = 'История просмотра';
            content = <ListHistory/>
            break;
    }
    return (
        <div className={styles.Center}>
            {(isAuth) ?
                <>
                    <div className={styles.Main}>
                        <div className={styles.wrapperBlock1}>
                            <h1>Личный кабинет</h1>
                            <AccountInfo/>
                            <div className={styles.wrapperEmail}>
                                <h1>Ваша почта: {eMail}</h1>
                            </div>
                            <Link href='/login' className={styles.linkLogout}>
                                <button className={styles.LogOut} onClick={LogOut}>Выход</button>
                            </Link>
                        </div>
                        <div className={styles.block2}>
                            <h1>{text}</h1>
                            {content}
                            </div>
                    </div>
                </>
                : <h1>Error 404</h1>}
        </div>
    );
};

export default Page;