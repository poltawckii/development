"use client"
import React, {useRef} from 'react';
import styles from "./AccountInfo.module.css";
import {swapList} from "@/store/reducers/listsSwap";
import {useDispatch, useSelector} from "react-redux";
import postAvatar from "@api/postAvatar";

const AccountInfo = () => {
    let dispatch = useDispatch();
    let avatarRef = useRef<HTMLInputElement>(null);
    let eMail = useSelector(state => state.token?.currentUser?.eMail);
    let path = useSelector(state => state.token?.currentUser?.avatar);
    if (path === undefined){
        path = '/avatar2.png';
    }
    const createLink = () => {
        let avatar = avatarRef.current?.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(avatar);
        reader.onload = () => {
            dispatch(postAvatar(eMail, reader.result)) // reader.result содержит base64 строку
        };
        reader.onerror = () => {
            console.error("There was an error reading the file!");
        };
    }
    return (
        <div className={styles.block1}>
            <div className={styles.persAcc}>
                <div className={styles.fullAva}>
                    <img alt="logo" src={path}></img>
                    <div className={styles.wrapperInput}>
                        <img className={styles.wrapperInput_Img} alt="download"
                             src="/cloud-upload_icon-icons.com_54314%20(1).svg"></img>
                        <input ref={avatarRef} alt="yourLogo" type="file"
                               className={styles.inputAva}
                               id="changeAva"
                               onChange={createLink}></input>
                    </div>
                </div>
            </div>
            <div className={styles.listLinks}>
                <div className={styles.aside_left_categories}>
                    <button onClick={() => dispatch(swapList('favourites'))}>Избранное</button>
                    <button onClick={() => dispatch(swapList('history'))}>История просмотра</button>
                </div>
            </div>
        </div>
    );
};

export default AccountInfo