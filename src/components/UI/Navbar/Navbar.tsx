"use client"
import React, {useState, useRef, useEffect} from 'react';
import styles from './Navbar.module.css'
import Link from 'next/link'
import useNavbar_req from "@/hooks/useNavbar_req";
import DropDownMenu from './DropDownMenu/DropDownMenu';
import {useDispatch, useSelector} from "react-redux";
import getLogin from "@api/getLogin";

const Navbar = () =>{
    let [value, setValue] = useState('');
    let dispatch = useDispatch();
    let ref = useRef<HTMLInputElement>(null);
    let posters  = useNavbar_req(value);
    let isAuth  = useSelector(state => state.token?.isAuth);
    let path = useSelector(state => state.token?.currentUser?.avatar);
    if (path === undefined){
        path = '/avatar2.png';
    }
    useEffect(() => {
        dispatch(getLogin())
    }, []);
    return (
        <div className={styles.navbar}>
            <Link className={styles.navbarLink} href={'/'} >
                <div className={styles.logoname}>
                    <img className="" src='/black_on_white.png'></img>
                </div>
            </Link>
            <div className={styles.centralblock}>
                <div className={styles.wrapperInput}>
                    <input value={value} ref={ref} className={styles.search_input}
                           onChange={(e) => setValue(prevValue => e.target.value)}></input>
                    <Link className={styles.wrapperImg} href={"/findFilters"}>
                        <img alt='filterFind' src='/filter-list-svgrepo-com.svg'></img>
                    </Link>
                </div>
                <DropDownMenu films={posters?.films}></DropDownMenu>
            </div>
            <div className={styles.joinRegister}>
                {isAuth ? <></> :
                    <>
                <div className={styles.join}>
                    <Link href={'/login'}>
                        Вход
                    </Link>
                </div>
                <div className={styles.join}>
                    <Link href={'/registration'}>
                        Регистрация
                    </Link>
                </div>
                    </>
            }
                {!isAuth ? <></> :
                    <Link href={'/account'}>
                <div className={styles.join}>
                    <img alt="logo" src={path}></img>
                </div>
                    </Link>
                }
            </div>
        </div>
    );
};
export default Navbar;