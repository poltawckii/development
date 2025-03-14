"use client"
import {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import postLogin from "@api/postLogin";
import styles from './Login.module.css';

const LoginForm = () => {
    let eMailRef = useRef<HTMLInputElement>(null);
    let passwordRef = useRef<HTMLInputElement>(null);
    let isAuth = useSelector(state => state.token?.isAuth);
    let dispatch = useDispatch();
    useEffect(() => {
    }, [isAuth])
    return (
        <div className={styles.main}>
        {isAuth ? <h1>Вы уже авторизованы!</h1> :
            <div className={styles.login}>
                <h1>Вход</h1>
                <div className={styles.login_input_eMail} >
                    <input className={styles.login_input_eMail_text} ref={eMailRef} type="text" placeholder="Введите почту"></input>
                </div>
                <div className={styles.login_rememberMe}>
                    <input type="checkbox" className={styles.login_rememberMe_checkbox}></input>
                    <label className={styles.login_rememberMe_label}>Запомнить меня?</label>
                </div>
                <div className={styles.login_input_pass}>
                    <input className={styles.login_input_pass_text} ref={passwordRef} type="text" placeholder="Введите пароль"></input>
                </div>
                <div className={styles.login_forgotAndSocial}>
                    <a href="http://localhost:3000/login" className={styles.login_forgotPass}>Забыли пароль?</a>
                    <div className={styles.login_socialMedia}>
                        <img src="/icons8-vk.svg" className={styles.login_socialMedia_element}></img>
                        <img src="/icons8-facebook-новый.svg" className={styles.login_socialMedia_element}></img>
                        <img src="/icons8-google.svg" className={styles.login_socialMedia_element}></img>
                    </div>
                </div>
                <button className={styles.login_button}
                        onClick={() => {
                            dispatch(postLogin(eMailRef, passwordRef));
                        }}>Вход
                </button>
            </div>
        }
        </div>
    );
};

export default LoginForm;
