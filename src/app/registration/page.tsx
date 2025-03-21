"use client"
import React, {useEffect, useState} from 'react';
import {useRef} from 'react';

import styles from '../login/Login.module.css'
import {usePostRegistrMutation} from "@/services/CozyEveningLocal";
const Registration = () => {
    let eMailRef = useRef<HTMLInputElement>(null);
    let passwordRef = useRef<HTMLInputElement>(null);
    let [postRegistr] = usePostRegistrMutation();
    let handleRegister = () => {
        postRegistr({eMail: eMailRef.current?.value, password: passwordRef.current?.value})
    }
    const [isAuth, setIsAuth] = useState(false);
    useEffect(() => {
        if (localStorage.getItem('token')){
            setIsAuth(true);
        }

    }, []);
    return (
    <div className={styles.main}>
        {isAuth ? <h1>Вы уже зарегистрированы!</h1> :
            <div className={styles.login}>
                <h1>Регистрация</h1>
                <div className={styles.login_input_eMail}>
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
                    <a href="http://localhost:3000/registration" className={styles.login_forgotPass}>Забыли пароль?</a>
                    <div className={styles.login_socialMedia}>
                        <img src="/icons8-vk.svg" className={styles.login_socialMedia_element}></img>
                        <img src="/icons8-facebook-новый.svg" className={styles.login_socialMedia_element}></img>
                        <img src="/icons8-google.svg" className={styles.login_socialMedia_element}></img>
                    </div>
                </div>
                <button className={styles.login_button}
                        onClick={handleRegister}>Регистрация
                </button>
            </div>
        }
    </div>
);
};

export default Registration;